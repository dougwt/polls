import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import requireAuth from '../requireAuth';
import PollForm from './PollForm';
import PollFormReview from './PollFormReview';
import * as actions from '../../actions';

const initialValues = { choices: [0, 1] };

export class PollNew extends Component {
  constructor(props) {
    super(props);
    this.state = { showReview: false };
  }

  renderContent() {
    if (this.state.showReview) {
      return (
        <PollFormReview
          onCancel={() => this.setState({ showReview: false })}
          onSave={() => {
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
          }}
        />
      );
    }

    return (
      <PollForm
        onCancel={() => this.props.history.push('/polls')}
        onSubmit={() => this.setState({ showReview: true })}
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
PollNew.propTypes = {
  createPoll: PropTypes.func.isRequired,
  auth: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  history: PropTypes.object.isRequired,
  formValues: PropTypes.object.isRequired
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
