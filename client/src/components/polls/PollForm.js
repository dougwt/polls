import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Button, Row, Icon, ProgressBar } from 'react-materialize';
import PollField from './PollField';
import './PollForm.css';

export class PollForm extends Component {
  componentDidMount() {
    if (this.props.onReset) {
      this.props.onReset();
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
          <Row>
            <Field
              label="What question would you like to ask?"
              icon="question_answer"
              name="question"
              component={PollField}
            />
          </Row>

          <Row>
            <FieldArray
              name="choices"
              component={this.renderChoices.bind(this)}
            />
          </Row>

          {this.renderError() ? this.renderError() : this.renderSpinner()}

          <Row>
            <Button
              className="btn btn-back red white-text"
              onClick={this.props.onCancel}
              type="button"
            >
              Cancel
              <Icon left>close</Icon>
            </Button>

            {this.renderAsyncButton()}

            <Button className="btn-next teal right white-text" waves="light">
              Next
              <Icon right>keyboard_arrow_right</Icon>
            </Button>
          </Row>
        </form>
      </div>
    );
  }

  renderChoices({ fields, meta: { error } }) {
    function addField(fields) {
      if (fields.length <= 5) {
        return fields.push();
      }
    }

    function removeField(fields) {
      if (fields.length >= 3) {
        return fields.pop();
      }
    }

    function renderChoiceField(index) {
      const choiceIcons = {
        1: 'looks_one',
        2: 'looks_two',
        3: 'looks_3',
        4: 'looks_4',
        5: 'looks_5',
        6: 'looks_6',
        7: 'looks_7',
        8: 'looks_8',
        9: 'looks_9'
      };

      return (
        <Field
          label={`Choice ${index}`}
          icon={choiceIcons[index]}
          name={`choice_${index}`}
          key={index}
          component={PollField}
        />
      );
    }

    function renderChoiceError(error) {
      if (error) {
        return <li className="center-align red-text">{error}</li>;
      }
    }

    return (
      <ul>
        {fields.map((choice, index) => (
          <li key={index}>{renderChoiceField(index + 1)}</li>
        ))}
        {renderChoiceError(error)}

        <li className="center-align">
          <Button
            flat
            className={
              'btn-add-choice' + (fields.length > 5 ? ' disabled' : '')
            }
            onClick={() => addField(fields)}
            node="a"
          >
            <Icon left>add</Icon>
            Add Choice
          </Button>
          <Button
            flat
            className={
              'btn-remove-choice' + (fields.length < 3 ? ' disabled' : '')
            }
            onClick={() => removeField(fields)}
            node="a"
          >
            <Icon left>delete</Icon>
            Remove Choice
          </Button>
        </li>
      </ul>
    );
  }

  renderError() {
    if (this.props.error) {
      return (
        <Row className="red-text center-align error">
          <strong>Error:</strong> {this.props.error.message}
        </Row>
      );
    }
  }

  renderSpinner() {
    if (this.props.waiting) {
      return (
        <Row>
          <ProgressBar />
        </Row>
      );
    }

    return <Row>&nbsp;</Row>;
  }

  renderAsyncButton() {
    if (!this.props.onDelete) {
      return;
    }

    if (this.props.waiting) {
      return (
        <Button
          className="btn disabled btn-small btn-delete btn-flat btn-red red-text"
          onClick={this.props.onDelete}
          type="button"
        >
          Deleting...
          <Icon left>delete</Icon>
        </Button>
      );
    }

    return (
      <Button
        className="btn btn-small btn-delete btn-flat btn-red red-text"
        onClick={this.props.onDelete}
        type="button"
      >
        Delete Poll
        <Icon left>delete</Icon>
      </Button>
    );
  }
}
PollForm.propTypes = {
  error: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  onReset: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  waiting: PropTypes.bool.isRequired
};

function validate(values) {
  const errors = {};

  if (!values.question) {
    errors.question = 'You must provide a poll question';
  }

  if (!values.choices || values.choices.length < 2) {
    errors.choices = { _error: 'At least two choices must be entered' };
  } else if (values.choices.length > 6) {
    errors.choices = { _error: 'No more than six choices allowed' };
  }

  for (
    let choice = 1;
    choice <= (values.choices ? values.choices.length : 0);
    choice++
  ) {
    let field = `choice_${choice}`;
    if (!values[field]) {
      errors[field] = `You must provide text for Choice ${choice}`;
    }
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    error: state.poll.error,
    waiting: state.poll.waiting
  };
}

export default compose(
  reduxForm({
    validate,
    form: 'pollForm',
    destroyOnUnmount: false,
    enableReinitialize: true // allow form to re-init b/w Edit & New instances
  }),
  connect(mapStateToProps)
)(PollForm);
