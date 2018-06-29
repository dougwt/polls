import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Input, Button, Row } from 'react-materialize';
import { votePoll, resetVotePoll } from '../../actions';
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

export class PollDetail extends Component {
  componentDidMount() {
    this.props.resetVotePoll();
  }

  onVoteSubmit(pollId) {
    const checked = document.querySelector('Input[name="choices"]:checked');
    const choiceId = checked ? checked.value : undefined;

    if (!this.props.disabled && pollId && choiceId) {
      this.props.votePoll(pollId, choiceId);
    }
  }

  render() {
    const { auth, poll, votePoll, waiting } = this.props;
    const formValues = this.props.formValues || defaultPoll;

    return (
      <div className="container">
        <Card className="darken-1" title={formValues.question}>
          {poll && poll.respondents.includes(auth._id)
            ? this.renderResults(poll)
            : this.renderForm(poll, formValues, votePoll, waiting)}
        </Card>
      </div>
    );
  }

  renderForm(poll, formValues, votePoll, waiting) {
    return (
      <form
        className="poll"
        onSubmit={event => {
          event.preventDefault();
          this.onVoteSubmit(poll._id, votePoll, this.props.disabled);
        }}
      >
        {/* TODO: add spacing here via CSS */}

        <div className="choices">{this.renderChoices(poll, formValues)}</div>

        <Row className="center-align">
          {this.renderAsyncButton(waiting, event => {
            event.preventDefault();
            this.onVoteSubmit(poll._id, votePoll);
          })}
        </Row>
      </form>
    );
  }

  renderResults(poll) {
    const data = { datasets: [{ data: [], backgroundColor: [] }], labels: [] };

    const colors = [
      '#26547C',
      '#EF476F',
      '#FFD166',
      '#06D6A0',
      '#7C265D',
      '#06BAD6'
    ];

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

  renderChoices(poll, values) {
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

  renderAsyncButton({ waiting, onClick }) {
    if (waiting) {
      return (
        <Button className="teal" disabled={true}>
          Saving...
        </Button>
      );
    }

    return (
      <Button className="teal" disabled={this.props.disabled} onClick={onClick}>
        Vote
      </Button>
    );
  }
}
PollDetail.propTypes = {
  auth: PropTypes.object,
  poll: PropTypes.object,
  formValues: PropTypes.object,
  disabled: PropTypes.bool,
  votePoll: PropTypes.func,
  resetVotePoll: PropTypes.func,
  waiting: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    error: state.poll.error,
    waiting: state.poll.waiting
  };
}

export default connect(mapStateToProps, { votePoll, resetVotePoll })(
  PollDetail
);
