import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Row, Icon, ProgressBar } from 'react-materialize';
import PollDetail from './PollDetail';

export const PollFormReview = props => {
  return (
    <div>
      <h5>Please confirm your poll</h5>

      <PollDetail formValues={props.formValues} disabled={true} />

      {renderError(props.error)
        ? renderError(props.error)
        : renderSpinner(props.waiting)}

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

        {renderAsyncButton(props)}
      </Row>
    </div>
  );
};
PollFormReview.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  formValues: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  waiting: PropTypes.bool.isRequired,
  error: PropTypes.object
};

function renderAsyncButton({ onSave, waiting }) {
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
      onClick={onSave}
    >
      Create
      <Icon right>create</Icon>
    </Button>
  );
}
renderAsyncButton.propTypes = {
  onSave: PropTypes.func.isRequired,
  waiting: PropTypes.bool.isRequired
};

function renderError(error) {
  if (error) {
    return (
      <Row className="red-text center-align">
        {/* <strong>Error:</strong> {error.message} */}
        <strong>Error:</strong> {error.response.data.error}
      </Row>
    );
  }
}
renderError.propTypes = {
  error: PropTypes.object
};

function renderSpinner(waiting) {
  if (waiting) {
    return (
      <Row>
        <ProgressBar />
      </Row>
    );
  }

  return <Row>&nbsp;</Row>;
}
renderSpinner.propTypes = {
  waiting: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    waiting: state.poll.waiting,
    error: state.poll.error,
    formValues: state.form.pollForm.values
  };
}

export default connect(mapStateToProps)(PollFormReview);
