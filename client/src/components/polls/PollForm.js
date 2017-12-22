import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import { Button, Row, Icon } from 'react-materialize';
import PollField from './PollField';

class PollForm extends Component {
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
            <Link to="/surveys" className="red btn-flat white-text">
              Cancel
            </Link>

            <Button className="teal btn-flat right white-text" waves="light">
                Next
                <Icon right>keyboard_arrow_right</Icon>
            </Button>
          </Row>
        </form>
      </div>
    );
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

function renderChoices({ fields, meta: { error } }) {
  return (
    <ul>
      {fields.map((choice, index) => (
        <li key={index}>
          { renderChoiceField(index + 1) }
        </li>
      ))}
      <li className="center-align">
        <Button
          flat
          className={ fields.length > 5 ? 'disabled' : '' }
          onClick={() => fields.push() }
        >
          <Icon left>add</Icon>
          Add Choice
        </Button>
        <Button
          flat
          className={ fields.length < 3 ? 'disabled' : '' }
          onClick={() => fields.pop() }
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

  // errors.recipients = validateEmails(values.recipients || '');
  //
  // formFields.forEach(({name}) => {
  //   if (!values[name]) {
  //     errors[name] = 'You must provide a value';
  //   }
  // })

  return errors;
}

export default reduxForm({
  validate,
  form: 'pollForm',
  destroyOnUnmount: false
})(PollForm);
