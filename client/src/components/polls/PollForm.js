import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Button, Row, Icon, ProgressBar } from 'react-materialize';
import PollField from './PollField';
import './PollForm.css';

export const PollForm = props => {
  return (
    <div>
      <form onSubmit={props.handleSubmit(props.onSubmit)}>
        <Row>
          <Field
            label="What question would you like to ask?"
            icon="question_answer"
            name="question"
            component={PollField}
          />
        </Row>

        <Row>
          <FieldArray name="choices" component={renderChoices} />
        </Row>

        {renderError(props.error)
          ? renderError(props.error)
          : renderSpinner(props.waiting)}

        <Row>
          <Button
            className="btn btn-back red white-text"
            onClick={props.onCancel}
            type="button"
          >
            Cancel
            <Icon left>close</Icon>
          </Button>

          {renderAsyncButton(props)}

          <Button className="btn-next teal right white-text" waves="light">
            Next
            <Icon right>keyboard_arrow_right</Icon>
          </Button>
        </Row>
      </form>
    </div>
  );
};
PollForm.propTypes = {
  error: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  waiting: PropTypes.bool.isRequired
};

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

function renderAsyncButton({ onDelete, waiting }) {
  if (!onDelete) {
    return;
  }

  if (waiting) {
    return (
      <Button
        className="btn disabled btn-small btn-delete btn-flat btn-red red-text"
        onClick={onDelete}
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
      onClick={onDelete}
      type="button"
    >
      Delete Poll
      <Icon left>delete</Icon>
    </Button>
  );
}
renderAsyncButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
  waiting: PropTypes.bool.isRequired
};

function renderError(error) {
  if (error) {
    return (
      <Row className="red-text center-align error">
        <strong>Error:</strong> {error.message}
      </Row>
    );
  }
}
renderError.propTypes = {
  error: PropTypes.object
};

function renderSpinner(waiting) {
  if (waiting) {
    return (
      <Row>
        <ProgressBar />
      </Row>
    );
  }

  return <Row>&nbsp;</Row>;
}
renderSpinner.propTypes = {
  waiting: PropTypes.bool
};

function renderChoiceField(index) {
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

function renderChoices({ fields, meta: { error } }) {
  return (
    <ul>
      {fields.map((choice, index) => (
        <li key={index}>{renderChoiceField(index + 1)}</li>
      ))}
      {renderChoiceError(error)}

      <li className="center-align">
        <Button
          flat
          className={'btn-add-choice' + (fields.length > 5 ? ' disabled' : '')}
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
renderChoices.propTypes = {
  fields: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

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
      // errors[field] = `You must provide text for all available choices`;
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
    enableReinitialize: true
  }),
  connect(mapStateToProps)
)(PollForm);
