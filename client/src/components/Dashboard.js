import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Section, Container, Row } from 'react-materialize';
import PollList from './polls/PollList';
import { fetchPolls } from '../actions';

export class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchPolls();
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
              <PollList
                title="Polls created by you:"
                polls={this.props.polls}
              />
            </div>
            <div id="other" className="col s12">
              <PollList
                title="Polls created by other users:"
                polls={this.props.polls}
              />
            </div>
          </Row>
        </Container>
      </Section>
    );
  }
}
Dashboard.propTypes = {
  polls: PropTypes.array,
  fetchPolls: PropTypes.func
};

function mapStateToProps(state) {
  return {
    polls: state.poll.polls
  };
}

export default connect(mapStateToProps, { fetchPolls })(Dashboard);
