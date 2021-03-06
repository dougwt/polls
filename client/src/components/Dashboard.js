import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Section, Container, Row } from 'react-materialize';
import PollList from './polls/PollList';
import requireAuth from './requireAuth';
import { fetchPolls } from '../actions';
import './Dashboard.css';

const ITEMS_PER_PAGE = 15;
const MAX_PAGINATION_BUTTONS = 7;

export class Dashboard extends Component {
  componentDidMount() {
    // Ensure Materialize Tabs are initialized every time the component
    // is mounted. Without this, they only appear when the component is
    // present during the initial page load. This ensures that it works
    // properly when the user loads another page and navigates here.
    window.$('ul.tabs').tabs();

    this.props.fetchPolls();
  }

  render() {
    return (
      <Section>
        <Container>
          <Row>
            <h3>Dashboard</h3>
            <ul className="tabs">
              <li className="tab col s3">
                <a href="#my">My Polls</a>
              </li>
              <li className="tab col s3">
                <a href="#other">Other Polls</a>
              </li>
            </ul>
          </Row>

          <Row>
            <div id="my" className="col s12">
              <PollList
                title="Polls created by you:"
                polls={Object.values(this.props.polls).filter(
                  poll =>
                    poll.owner &&
                    this.props.auth &&
                    poll.owner === this.props.auth._id
                )}
                itemsPerPage={ITEMS_PER_PAGE}
                maxButtons={MAX_PAGINATION_BUTTONS}
              />
            </div>
            <div id="other" className="col s12">
              <PollList
                title="Polls created by other users:"
                polls={Object.values(this.props.polls).filter(
                  poll =>
                    poll.owner &&
                    this.props.auth &&
                    poll.owner !== this.props.auth._id
                )}
                itemsPerPage={ITEMS_PER_PAGE}
                maxButtons={MAX_PAGINATION_BUTTONS}
              />
            </div>
          </Row>
        </Container>
      </Section>
    );
  }
}
Dashboard.propTypes = {
  auth: PropTypes.object,
  polls: PropTypes.object,
  fetchPolls: PropTypes.func
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    polls: state.poll.polls
  };
}

export default compose(connect(mapStateToProps, { fetchPolls }), requireAuth)(
  Dashboard
);
