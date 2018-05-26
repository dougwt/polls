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

export class PollNewEdit extends Component {
  render() {
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <h3 className="header section-title">Create a Poll</h3>
            <PollForm
              onPollSubmit={() => this.setState({ showReview: true })}
              initialValues={initialValues}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'pollNewForm'
})(PollNewEdit);
