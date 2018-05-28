import React, { Component } from 'react';
import { Section, Container, Row } from 'react-materialize';
import PollList from './polls/PollList';

class Dashboard extends Component {
  componentDidMount() {
    window.$('ul.tabs').tabs();
  }

  render() {
    return (
      <Section>
        <Container>
          <Row>
            <div className="col s12">
              <h3>Dashboard</h3>
              <ul className="tabs">
                <li className="tab col s3">
                  <a href="#my">My Polls</a>
                </li>
                <li className="tab col s3">
                  <a href="#other">Other Polls</a>
                </li>
              </ul>
            </div>
          </Row>

          <Row>
            <div id="my" className="col s12">
              <PollList title="This list contains all the polls created by you." />
            </div>
            <div id="other" className="col s12">
              <PollList title="This list contains all the polls created by other users." />
            </div>
          </Row>
        </Container>
      </Section>
    );
  }
}

export default Dashboard;
