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
                <li className="tab col s3"><a href="#test1">My Polls</a></li>
                <li className="tab col s3"><a href="#test2">Other Polls</a></li>
              </ul>
            </div>
          </Row>

          <Row>
            <div id="test1" className="col s12">
              <PollList title="This list contains all the polls created by you." />
            </div>
            <div id="test2" className="col s12">
              <PollList title="This list contains all the polls created by other users." />
            </div>
          </Row>

        </Container>
      </Section>
    );
  }
}

export default Dashboard;
