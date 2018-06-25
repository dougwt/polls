import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Input, Button, Row } from 'react-materialize';
import { votePoll } from '../../actions';
import { Pie } from 'react-chartjs-2';

import './PollDetail.css';

const defaultPoll = {
  choices: [0, 1, 2, 3, 4, 5],
  question: 'Who is your favorite Starfleet captain?',
  choice_1: 'Kirk (TOS)',
  choice_2: 'Picard (TNG)',
  choice_3: 'Sisko (DS9)',
  choice_4: 'Janeway (Voyager)',
  choice_5: 'Archer (Enterprise)',
  choice_6: 'Lorca (Discovery)'
};

const onVoteSubmit = (pollId, votePoll, disabled) => {
  const checked = document.querySelector('Input[name="choices"]:checked');
  const choiceId = checked ? checked.value : undefined;

  if (!disabled && pollId && choiceId) {
    votePoll(pollId, choiceId);
  }
};

export const PollDetail = ({
  auth,
  poll,
  formValues = defaultPoll,
  disabled = false,
  votePoll,
  waiting
}) => {
  return (
    <div className="container">
      <Card className="darken-1" title={formValues.question}>
        {poll && poll.respondents.includes(auth._id)
          ? renderResults(poll)
          : renderForm(poll, formValues, disabled, votePoll, waiting)}
      </Card>
    </div>
  );
};
PollDetail.propTypes = {
  auth: PropTypes.object,
  poll: PropTypes.object,
  formValues: PropTypes.object,
  disabled: PropTypes.bool,
  votePoll: PropTypes.func,
  waiting: PropTypes.bool
};

function renderForm(poll, formValues, disabled, votePoll, waiting) {
  return (
    <form
      className="poll"
      onSubmit={event => {
        event.preventDefault();
        onVoteSubmit(poll._id, votePoll, disabled);
      }}
    >
      {/* TODO: add spacing here via CSS */}

      <div className="choices">{renderChoices(poll, formValues)}</div>

      <Row className="center-align">
        {renderAsyncButton(waiting, disabled, event => {
          event.preventDefault();
          onVoteSubmit(poll._id, votePoll, disabled);
        })}
      </Row>
    </form>
  );
}

function renderResults(poll) {
  const data = { datasets: [{ data: [], backgroundColor: [] }], labels: [] };

  const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];

  poll.choices.forEach((choice, i) => {
    data.datasets[0].data.push(choice.votes);
    data.datasets[0].backgroundColor.push(colors[i]);
    data.labels.push(choice.text);
  });

  const options = {
    legend: { position: 'bottom' }
  };

  return <Pie data={data} options={options} />;
}

function renderChoices(poll, values) {
  function renderChoice(key, value, label) {
    return (
      <Row key={key}>
        <Input name="choices" type="radio" value={value} label={label} />
      </Row>
    );
  }

  let choices = [];

  if (!poll) {
    // If poll is undefined it has not been saved, so use fake ids
    for (
      let choice = 1;
      choice <= (values.choices ? values.choices.length : 0);
      choice++
    ) {
      let field = `choice_${choice}`;
      if (values[field]) {
        choices.push(renderChoice(choice, choice.toString(), values[field]));
      }
    }
  } else {
    // If defined, we can use real ids from the existing poll
    poll.choices.forEach(choice => {
      choices.push(renderChoice(choice._id, choice._id, choice.text));
    });
  }

  return choices;
}

function renderAsyncButton({ waiting, disabled, onClick }) {
  if (waiting) {
    return (
      <Button className="teal" disabled={true}>
        Saving...
      </Button>
    );
  }

  return (
    <Button className="teal" disabled={disabled} onClick={onClick}>
      Vote
    </Button>
  );
}
renderAsyncButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  waiting: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    error: state.poll.error,
    waiting: state.poll.waiting
  };
}

export default connect(mapStateToProps, { votePoll })(PollDetail);
