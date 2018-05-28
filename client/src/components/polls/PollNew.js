import React, { Component } from 'react';
import PollForm from './PollForm';
import PollFormReview from './PollFormReview';

const initialValues = { choices: [0, 1] };

export class PollNew extends Component {
  constructor() {
    super();
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
        initialValues={initialValues}
      />
    );
  }

  render() {
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <h3 className="header section-title">Create a Poll</h3>
            {this.renderContent()}
          </div>
        </div>
      </div>
    );
  }
}

export default PollNew;
