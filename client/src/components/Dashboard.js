import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Section, Container, Row } from 'react-materialize';
import PollList from './polls/PollList';
import { fetchPolls } from '../actions';

const ITEMS_PER_PAGE = 15;
const MAX_PAGINATION_BUTTONS = 7;

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { mine_page: 1, others_page: 1 };
  }
  componentDidMount() {
    this.props.fetchPolls();

    // Ensure Materialize Tabs are initialized every time the component
    // is mounted. Without this, they only appear when the component is
    // present during the initial page load. This ensures that it works
    // properly when the user loads another page and navigates here.
    window.$('ul.tabs').tabs();
  }

  calcSlice(list, page) {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = page * ITEMS_PER_PAGE;

    return list.slice(startIndex, endIndex);
  }

  calcItems(list) {
    if (this.props.fetched) {
      if (list.length > 0) {
        return Math.ceil(list.length / ITEMS_PER_PAGE);
      }

      return 1;
    }

    // Page hasn't finished fetching the list of polls, so let's return
    // a reasonable maximum so pagination doesn't initialize itself
    // with a list size of  1.
    return 1000;
  }

  render() {
    const myPolls = (this.props.polls || []).filter(
      poll =>
        poll.owner && this.props.auth && poll.owner === this.props.auth._id
    );
    const othersPolls = (this.props.polls || []).filter(
      poll =>
        poll.owner && this.props.auth && poll.owner !== this.props.auth._id
    );

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
                polls={this.calcSlice(myPolls, this.state.mine_page)}
                items={this.calcItems(myPolls)}
                activePage={this.state.mine_page}
                maxButtons={MAX_PAGINATION_BUTTONS}
                onSelect={page => {
                  this.setState({ mine_page: page });
                }}
              />
            </div>
            <div id="other" className="col s12">
              <PollList
                title="Polls created by other users:"
                polls={this.calcSlice(othersPolls, this.state.others_page)}
                items={this.calcItems(othersPolls)}
                activePage={this.state.others_page}
                maxButtons={MAX_PAGINATION_BUTTONS}
                onSelect={page => {
                  this.setState({ others_page: page });
                }}
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
  polls: PropTypes.array,
  fetched: PropTypes.bool,
  fetchPolls: PropTypes.func
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    polls: state.poll.polls,
    fetched: state.poll.fetched
  };
}

export default connect(mapStateToProps, { fetchPolls })(Dashboard);
