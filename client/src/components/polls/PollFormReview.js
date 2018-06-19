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
  error: PropTypes.object,
  formValues: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  waiting: PropTypes.bool.isRequired
};

function renderAsyncButton({ onSave, waiting }) {
  if (waiting) {
    return (
      <Button className="teal btn-next disabled right white-text" waves="light">
        Saving...
        <Icon right>create</Icon>
      </Button>
    );
  }

  return (
    <Button
      className="teal btn-next right white-text"
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
    error: state.poll.error,
    formValues: state.form.pollForm.values,
    waiting: state.poll.waiting
  };
}

export default connect(mapStateToProps)(PollFormReview);
