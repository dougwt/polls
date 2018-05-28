import React, { Component } from 'react';
// import { reduxForm } from 'redux-form';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { Card, Input, Button, Row } from 'react-materialize';
import PollForm from './PollForm';
// import PollDetailFormReview from './PollDetailFormReview';
// import * as actions from '../../actions';
import './PollDetail.css';

const defaultPoll = {
  choices: [0, 1, 2, 3, 4, 5],
  question: 'Who is your favorite Starfleet captain?',
  choice_1: 'Kirk (TOS)',
  choice_2: 'Picard (TNG)',
  choice_3: 'Sisko (DS9)',
  choice_4: 'Janeway (Voyager)',
  choice_5: 'Archer (Enterprise)',
  choice_6: 'Lorca (Discovery)'
};

class PollDetail extends Component {
  renderContent() {
    // if (this.state.showFormReview) {
    //   return <PollDetailFormReview onCancel={() => this.setState({ showFormReview: false})}/>;
    // }

    return (
      <PollForm onPollSubmit={() => this.setState({ showFormReview: true })} />
    );
  }

  render() {
    return (
      <div className="container">
        <Card className="darken-1" title={defaultPoll.question}>
          <div className="choices">{this.renderChoices(defaultPoll)}</div>

          <Row className="center-align">
            <Button className="teal" disabled>
              Vote
            </Button>
          </Row>
        </Card>
      </div>
    );
  }

  renderChoices(values) {
    let choices = [];

    for (let choice = 1; choice <= values.choices.length; choice++) {
      let field = `choice_${choice}`;
      choices.push(
        <Row key={choice}>
          <Input
            name="group1"
            type="radio"
            value="{choice}"
            label={values[field]}
          />
        </Row>
      );
    }
    return choices;
  }
}

export default PollDetail;
