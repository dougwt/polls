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

  onCancel() {
    this.setState({ showReview: false });
  }

  onDelete() {
    this.props.deletePoll(this.props.pollId, () => {
      this.props.history.push('/polls');
    });
  }

  onSave(formValues) {
    const poll = {
      question: formValues.question,
      choices: formValues.choices.map((choice, i) => {
        return { text: formValues[`choice_${i + 1}`], votes: 0 };
      })
    };

    if (this.props.auth) {
      poll.owner = this.props.auth._id;
    }
    this.props.editPoll(this.props.pollId, poll, () => {
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
          onCancel={this.onCancel.bind(this)}
          onSave={this.onSave.bind(this)}
        />
      );
    }

    return (
      <PollForm
        onCancel={this.props.onCancel.bind(this)}
        onDelete={this.onDelete.bind(this)}
        onSubmit={this.onSubmit.bind(this)}
        initialValues={this.props.formValues}
      />
    );
  }

  render() {
    return this.renderContent();
  }
}
PollEdit.propTypes = {
  auth: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  deletePoll: PropTypes.func.isRequired,
  editPoll: PropTypes.func.isRequired,
  formValues: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  polls: PropTypes.object,
  pollId: PropTypes.string
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
