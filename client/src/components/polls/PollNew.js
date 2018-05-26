import React, { Component } from 'react';
import PollNewEdit from './PollNewEdit';
import PollNewReview from './PollNewReview';

export class PollNew extends Component {
  state = { showReview: false };

  renderContent() {
    if (this.state.showReview) {
      return <PollNewReview />;
    }

    return (
      <PollNewEdit  />);
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
};

export default PollNew;
