import React from 'react';
import PropTypes from 'prop-types';
import { Card, Input, Button, Row } from 'react-materialize';

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

const onVoteSubmit = () => {
  // TODO: tell api server to save vote
  console.log('ya voted! good on ya');
};

const PollDetail = ({ formValues = defaultPoll, disabled = false }) => {
  return (
    <div className="container">
      <Card className="darken-1" title={formValues.question}>
        {/* TODO: add spacing here via CSS */}

        <div className="choices">{renderChoices(formValues)}</div>

        <Row className="center-align">
          <Button className="teal" disabled={disabled} onClick={onVoteSubmit}>
            Vote
          </Button>
        </Row>
      </Card>
    </div>
  );
};
PollDetail.propTypes = {
  formValues: PropTypes.object,
  disabled: PropTypes.bool
};

function renderChoices(values) {
  let choices = [];

  for (let choice = 1; choice <= values.choices.length; choice++) {
    let field = `choice_${choice}`;
    if (values[field]) {
      choices.push(
        <Row key={choice}>
          <Input
            name="choices"
            type="radio"
            value={choice.toString()}
            label={values[field]}
          />
        </Row>
      );
    }
  }

  return choices;
}

export default PollDetail;
