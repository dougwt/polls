import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Button, Row, Icon } from 'react-materialize';
import PollField from './PollField';

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

        <Row>
          <Button
            className="btn btn-cancel red white-text"
            onClick={props.onCancel}
          >
            Cancel
            <Icon left>close</Icon>
          </Button>

          <Button className="btn-preview teal right white-text" waves="light">
            Next
            <Icon right>keyboard_arrow_right</Icon>
          </Button>
        </Row>
      </form>
    </div>
  );
};
PollForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  initialValues: PropTypes.object
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

export default reduxForm({
  validate,
  form: 'pollForm',
  destroyOnUnmount: false,
  enableReinitialize: true
})(PollForm);
