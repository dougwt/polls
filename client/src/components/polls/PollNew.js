import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import PollForm from './PollForm';
import PollFormReview from './PollFormReview';

const initialValues = {
  choices: [
    0: null,
    1: null,
  ]
};

class PollNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return <PollFormReview onCancel={() => this.setState({ showFormReview: false})}/>;
    }

    return (
      <PollForm
        onPollSubmit={() => this.setState({ showFormReview: true })}
        initialValues={initialValues}
      />);
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

export default reduxForm({
  form: 'pollForm'
})(PollNew);
