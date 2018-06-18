import React, { Component } from 'react';
import PropTypes from 'prop-types';
import requireAuth from '../requireAuth';
import PollForm from './PollForm';
import PollFormReview from './PollFormReview';

export class PollEdit extends Component {
  constructor(props) {
    super(props);

    this.state = { showReview: false };
  }

  renderContent() {
    if (this.state.showReview) {
      return (
        <PollFormReview onCancel={() => this.setState({ showReview: false })} />
      );
    }

    return (
      <PollForm
        onPollSubmit={() => this.setState({ showReview: true })}
        initialValues={this.props.formValues}
      />
    );
  }

  render() {
    return this.renderContent();
  }
}
PollEdit.propTypes = {
  formValues: PropTypes.object
};

export default requireAuth(PollEdit);
