import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import PollForm from './PollForm';
// import SurveyFormReview from './SurveyFormReview';

class PollNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    // if (this.state.showFormReview) {
    //   return <SurveyFormReview onCancel={() => this.setState({ showFormReview: false})}/>;
    // }

    return <PollForm onPollSubmit={() => this.setState({ showFormReview: true })}/>;
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
