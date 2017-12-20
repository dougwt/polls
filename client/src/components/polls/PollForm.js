import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { Button, Row, Icon } from 'react-materialize';
import PollField from './PollField';

class PollForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numChoices: 2
    };
  }

  mapChoiceToField(index) {
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

  renderChoiceFields(length) {
    let fields = []
    for (let i = 1; i <= length; i++) {
      fields.push(this.mapChoiceToField(i));
    }
    return fields;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onPollSubmit)}>

          <Field
            label="What question would you like to ask?"
            icon="question_answer"
            name="question"
            component={PollField} />

          {this.renderChoiceFields(this.state.numChoices)}

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
