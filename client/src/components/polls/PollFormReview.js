import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Input, Button, Row, Icon } from 'react-materialize';
import * as actions from '../../actions';

export const PollFormReview = props => {
  return (
    <div>
      <h5>Please confirm your poll</h5>

      {/* {console.log(formValues)} */}

      <Row>
        <Card className="darken-1" title={props.formValues.question}>
          {/* TODO: add spacing here via CSS */}

          <div className="choices">{renderChoices(props.formValues)}</div>

          <Row className="center-align">
            <Button className="teal" disabled>
              Vote
            </Button>
          </Row>
        </Card>
      </Row>

      {renderError(props.error)}

      <Row>
        <Button
          node="a"
          className="red btn-back white-text"
          waves="light"
          onClick={props.onCancel}
        >
          Back
          <Icon left>keyboard_arrow_left</Icon>
        </Button>

        {renderButton(props)}
      </Row>
    </div>
  );
};
PollFormReview.propTypes = {
  onCancel: PropTypes.func.isRequired,
  formValues: PropTypes.object.isRequired,
  createPoll: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  waiting: PropTypes.bool.isRequired,
  error: PropTypes.object
};

function renderButton({ formValues, createPoll, history, waiting }) {
  if (waiting) {
    return (
      <Button
        className="teal btn-create disabled right white-text"
        waves="light"
      >
        Saving...
        <Icon right>create</Icon>
      </Button>
    );
  }

  return (
    <Button
      className="teal btn-create right white-text"
      waves="light"
      onClick={() => createPoll(formValues, history)}
    >
      Create
      <Icon right>create</Icon>
    </Button>
  );
}
renderButton.propTypes = {
  formValues: PropTypes.object.isRequired,
  createPoll: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  waiting: PropTypes.bool.isRequired
};

function renderError(error) {
  if (error) {
    return (
      <Row className="red-text center-align">
        <strong>Error:</strong> {error.message}
      </Row>
    );
  }
}
renderError.propTypes = {
  error: PropTypes.object
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

function mapStateToProps(state) {
  return {
    waiting: state.poll.waiting,
    error: state.poll.error,
    formValues: state.form.pollForm.values
  };
}

export default connect(mapStateToProps, actions)(withRouter(PollFormReview));
