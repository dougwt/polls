import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import requireAuth from '../requireAuth';
import PollForm from './PollForm';
import PollFormReview from './PollFormReview';
import * as actions from '../../actions';

export class PollNew extends Component {
  constructor(props) {
    super(props);
    this.state = { showReview: false };
  }

  onCancel() {
    this.props.history.push('/polls');
  }

  onCancelReview() {
    this.setState({ showReview: false });
  }

  onSave() {
    const poll = {
      question: this.props.formValues.question,
      choices: this.props.formValues.choices.map((choice, i) => {
        return {
          text: this.props.formValues[`choice_${i + 1}`],
          votes: 0
        };
      })
    };

    if (this.props.auth) {
      poll.owner = this.props.auth._id;
    }
    this.props.createPoll(poll, () => {
      this.props.history.push('/polls');
    });
  }

  onSubmit() {
    this.setState({ showReview: true });
  }

  renderContent() {
    if (this.state.showReview) {
      return (
        <PollFormReview
          onReset={this.props.resetCreatePoll}
          onCancel={this.onCancelReview.bind(this)}
          onSave={this.onSave.bind(this)}
        />
      );
    }

    return (
      <PollForm
        onReset={this.props.resetCreatePoll}
        onCancel={this.onCancel.bind(this)}
        onSubmit={this.onSubmit.bind(this)}
        initialValues={{ choices: [0, 1] }}
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
PollNew.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  resetCreatePoll: PropTypes.func.isRequired,
  createPoll: PropTypes.func.isRequired,
  formValues: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    formValues: (state.form.pollForm && state.form.pollForm.values) || {}
  };
}

export default compose(
  connect(mapStateToProps, actions),
  requireAuth,
  withRouter
)(PollNew);
