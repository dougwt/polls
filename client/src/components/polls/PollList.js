import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Collection, Badge, Pagination } from 'react-materialize';
import { connect } from 'react-redux';

export class PollList extends Component {
  constructor(props) {
    super(props);

    this.state = { activePage: 1 };
  }

  renderPolls(polls) {
    if (polls.length < 1) {
      return (
        <li className="center-align collection-item">
          There are no polls to show. Why don&#x27;t you create one?
        </li>
      );
    }

    return polls.map(poll => {
      return (
        <li className="collection-item" key={poll._id}>
          <Link to={`/polls/${poll._id}`}>
            {poll.question}
            <Badge>1</Badge>
          </Link>
        </li>
      );
    });
  }

  calcSlice(list, page) {
    if (!list) {
      return [];
    }
    const startIndex = (page - 1) * this.props.itemsPerPage;
    const endIndex = page * this.props.itemsPerPage;

    return list.slice(startIndex, endIndex);
  }

  calcItems(list) {
    if (!this.props.fetched) {
      // Page hasn't finished fetching the list of polls, so let's
      // return a reasonable maximum so pagination doesn't limit
      // itself to an activePage of 1.
      return 1000;
    }

    return Math.ceil(list.length / this.props.itemsPerPage) || 1;
  }

  render() {
    return (
      <div>
        <Row>
          <h6 className="header section-title">{this.props.title}</h6>
        </Row>

        <Row>
          <Collection>
            {this.renderPolls(
              this.calcSlice(this.props.polls, this.state.activePage)
            )}
          </Collection>
        </Row>

        <Row className="center-align">
          <Pagination
            items={this.calcItems(this.props.polls)}
            activePage={this.state.activePage}
            maxButtons={this.props.maxButtons}
            onSelect={activePage => {
              this.setState({ activePage });
            }}
          />
        </Row>
      </div>
    );
  }
}
PollList.propTypes = {
  title: PropTypes.string.isRequired,
  polls: PropTypes.array,
  itemsPerPage: PropTypes.number,
  maxButtons: PropTypes.number,
  fetched: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    fetched: state.poll.fetched
  };
}

export default connect(mapStateToProps)(PollList);
