import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Row, Icon, ProgressBar } from 'react-materialize';
import PollDetail from './PollDetail';

export class PollFormReview extends Component {
  componentDidMount() {
    this.props.onReset();
  }

  render() {
    return (
      <div>
        <h5>Please confirm your poll</h5>

        <PollDetail formValues={this.props.formValues} disabled={true} />

        {this.renderError() ? this.renderError() : this.renderSpinner()}

        <Row>
          <Button
            node="a"
            className="red btn-back white-text"
            waves="light"
            onClick={this.props.onCancel}
          >
            Back
            <Icon left>keyboard_arrow_left</Icon>
          </Button>

          {this.renderAsyncButton()}
        </Row>
      </div>
    );
  }

  renderAsyncButton() {
    if (this.props.waiting) {
      return (
        <Button
          className="teal btn-next disabled right white-text"
          waves="light"
        >
          Saving...
          <Icon right>create</Icon>
        </Button>
      );
    }

    return (
      <Button
        className="teal btn-next right white-text"
        waves="light"
        onClick={() => this.props.onSave(this.props.formValues)}
      >
        Create
        <Icon right>create</Icon>
      </Button>
    );
  }

  renderError() {
    if (this.props.error) {
      return (
        <Row className="red-text center-align error">
          <strong>Error:</strong> {this.props.error.message}
          {/* <strong>Error:</strong> {this.props.error.response.data.error} */}
        </Row>
      );
    }
  }

  renderSpinner() {
    if (this.props.waiting) {
      return (
        <Row>
          <ProgressBar />
        </Row>
      );
    }

    return <Row>&nbsp;</Row>;
  }
}
PollFormReview.propTypes = {
  error: PropTypes.object,
  formValues: PropTypes.object.isRequired,
  onReset: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  waiting: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    error: state.poll.error,
    formValues: state.form.pollForm.values,
    waiting: state.poll.waiting
  };
}

export default connect(mapStateToProps)(PollFormReview);
