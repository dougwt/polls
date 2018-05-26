import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import PollFormReview from './PollFormReview';


export class PollNewReview extends Component {
  render() {
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <h3 className="header section-title">Create a Poll</h3>
            <PollFormReview onCancel={() => this.setState({ showFormReview: false})}/>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'pollNewForm'
})(PollNewReview);
