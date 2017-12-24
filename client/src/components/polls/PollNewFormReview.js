import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Input, Button, Row, Icon } from 'react-materialize';
import * as actions from '../../actions';

const PollFormReview = ({ onCancel, formValues, submitPoll, history }) => {
  return (
    <div>
      <h5>Please confirm your poll</h5>

      {console.log(formValues)}

      <Row>
    		<Card className='darken-1' title={formValues.question}>

          {/* TODO: add spacing here via CSS */}

          <div className="choices">
            {renderChoices(formValues)}
          </div>

          <Row className="center-align">
            <Button
              className="teal"
              disabled
            >
              Vote
            </Button>
          </Row>

        </Card>
      </Row>

      <Row>
        <Button
          node="a"
          className="red btn-flat white-text"
          waves="light"
          onClick={onCancel}
        >
          Back
          <Icon left>keyboard_arrow_left</Icon>
        </Button>

        <Button
          className="teal btn-flat right white-text"
          waves="light"
          onClick={() => submitPoll(formValues, history)}
        >
          Create
          <Icon right>create</Icon>
        </Button>
      </Row>
    </div>
  )
};

function renderChoices(values) {
  let choices = [];

  for (let choice = 1; choice <= values.choices.length; choice++) {
    let field = `choice_${choice}`;
    choices.push(
      <Row key={choice}>
        <Input name="group1" type="radio" value='{choice}' label={values[field]} />
      </Row>
    )
  }

  return choices;
};

function mapStateToProps(state) {
  return {
    formValues: state.form.pollForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(PollFormReview));
