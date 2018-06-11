import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import { Button, Row, Icon } from 'react-materialize';
import PollField from './PollField';

class Poll extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onPollSubmit)}>
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
            <Link to="/polls" className="red white-text">
              Cancel
              <Icon left>close</Icon>
            </Link>

            <Button className="teal right white-text" waves="light">
              Preview
              <Icon right>keyboard_arrow_right</Icon>
            </Button>
          </Row>
        </form>
      </div>
    );
  }
}

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
          className={fields.length > 5 ? 'disabled' : ''}
          onClick={() => fields.push()}
          node="a"
        >
          <Icon left>add</Icon>
          Add Choice
        </Button>
        <Button
          flat
          className={fields.length < 3 ? 'disabled' : ''}
          onClick={() => fields.pop()}
          node="a"
        >
          <Icon left>delete</Icon>
          Remove Choice
        </Button>
      </li>
    </ul>
  );
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

  for (let choice = 1; choice <= values.choices.length; choice++) {
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
  form: 'pollDetailForm'
})(Poll);
