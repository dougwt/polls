import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon, Row, Section, Container } from 'react-materialize';
import PollDetail from './PollDetail';
import PollEdit from './PollEdit';
import { fetchPolls } from '../../actions';

export class Poll extends Component {
  constructor(props) {
    super(props);

    this.state = { showEdit: false };
  }

  componentDidMount() {
    if (!this.props.fetched) {
      this.props.fetchPolls();
    }
  }

  renderContent() {
    const { pollId } = this.props.match.params;
    // TODO: this is inefficient! Switch to a map for faster lookups.
    const poll = this.props.polls.filter(poll => poll._id === pollId);

    if (this.state.showEdit) {
      return <PollEdit poll={poll} />;
    }

    return (
      <div>
        <PollDetail poll={poll} />

        <Row className="right-align">
          <Button
            id="edit"
            className="btn"
            waves="light"
            node="a"
            flat={true}
            onClick={() => this.setState({ showEdit: true })}
          >
            Edit
            <Icon right>edit</Icon>
          </Button>
        </Row>
      </div>
    );
  }

  render() {
    return (
      <Section>
        <Container>
          <Row>
            <h3 className="header section-title">Poll</h3>
          </Row>
          {this.renderContent()}
        </Container>
      </Section>
    );
  }
}
Poll.propTypes = {
  polls: PropTypes.array,
  fetched: PropTypes.bool,
  match: PropTypes.object,
  fetchPolls: PropTypes.func
};

function mapStateToProps(state) {
  return {
    polls: state.poll.polls,
    fetched: state.poll.fetched
  };
}

export default connect(mapStateToProps, { fetchPolls })(Poll);
