import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import { Col, Button, Row, Icon } from 'react-materialize';
import PollField from './PollField';

class PollForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numChoices: 2
    };
  }

  renderChoiceField(index) {
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

  renderChoices({ fields, meta: { error } }) {
    return (
      <ul>
        {fields.map((choice, index) => (
          <li key={index}>
            <Col s={11}>
              { this.renderChoiceField(index + 1) }
            </Col>
            <Col s={1}>
              <Button
                title="Remove Choice"
                icon="delete"
                flat
                node="a"
                onClick={() => fields.remove(index)}
              />
            </Col>
          </li>
        ))}
        <li className="center-align">
          <Button
            flat
            className={ fields.length > 5 ? 'disabled' : '' }
            onClick={() => {if (fields.length < 6) { fields.push() }}}
          >
            Add Choice
          </Button>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onPollSubmit)}>

          <Field
            label="What question would you like to ask?"
            icon="question_answer"
            name="question"
            component={PollField}
          />

          <FieldArray name="choices" component={this.renderChoices.bind(this)} />

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
