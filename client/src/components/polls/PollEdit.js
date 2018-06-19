import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import requireAuth from '../requireAuth';
import PollForm from './PollForm';
import PollFormReview from './PollFormReview';
import * as actions from '../../actions';

export class PollEdit extends Component {
  constructor(props) {
    super(props);

    this.state = { showReview: false };
  }

  renderContent() {
    if (this.state.showReview) {
      return (
        <PollFormReview
          onCancel={() => this.setState({ showReview: false })}
          onSave={formValues => {
            const poll = {
              question: formValues.question,
              choices: formValues.choices.map((choice, i) => {
                return { text: formValues[`choice_${i + 1}`], votes: 0 };
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
        onCancel={this.props.onCancel}
        onSubmit={() => this.setState({ showReview: true })}
        initialValues={this.props.formValues}
      />
    );
  }

  render() {
    return this.renderContent();
  }
}
PollEdit.propTypes = {
  onCancel: PropTypes.func.isRequired,
  createPoll: PropTypes.func.isRequired,
  auth: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  formValues: PropTypes.object,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default compose(
  connect(mapStateToProps, actions),
  requireAuth,
  withRouter
)(PollEdit);
