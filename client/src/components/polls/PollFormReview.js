import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Row, Icon } from 'react-materialize';
import * as actions from '../../actions';

const PollFormReview = ({ onCancel, formValues, submitPoll, history }) => {

  return (
    <div>
      <h5>Please confirm your entries</h5>

      <Row>
        <div style={{ marginBottom: '1em' }}>
          <label>What question would you like to ask?</label>
          <div>
            {formValues.question}
          </div>
        </div>
      </Row>

      <Row>
        <div style={{ marginBottom: '1em' }}>
          <label>Choice 1</label>
          <div>
            {formValues.choice_1}
          </div>
        </div>

        <div style={{ marginBottom: '1em' }}>
          <label>Choice 2</label>
          <div>
            {formValues.choice_2}
          </div>
        </div>

        <div style={{ marginBottom: '1em' }}>
          <label>Choice 3</label>
          <div>
            {formValues.choice_3}
          </div>
        </div>

        <div style={{ marginBottom: '1em' }}>
          <label>Choice 4</label>
          <div>
            {formValues.choice_4}
          </div>
        </div>

        <div style={{ marginBottom: '1em' }}>
          <label>Choice 5</label>
          <div>
            {formValues.choice_5}
          </div>
        </div>

        <div style={{ marginBottom: '1em' }}>
          <label>Choice 6</label>
          <div>
            {formValues.choice_6}
          </div>
        </div>
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

function mapStateToProps(state) {
  return {
    formValues: state.form.pollForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(PollFormReview));
