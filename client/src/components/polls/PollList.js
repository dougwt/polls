import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Collection,
  CollectionItem,
  Badge,
  Pagination
} from 'react-materialize';

const renderPolls = polls => {
  if (polls.length < 1) {
    return (
      <CollectionItem className="center-align">
        There are no polls to show. Why don&#39;t you create one?
      </CollectionItem>
    );
  }

  return polls.map(poll => {
    return (
      <CollectionItem href={`/polls/${poll.id}`} key={poll.id}>
        {poll.question}
        <Badge>1</Badge>
      </CollectionItem>
    );
  });
};

const PollList = ({ title, polls = [] }) => {
  return (
    <div>
      <Row>
        <h6 className="header section-title">{title}</h6>
      </Row>

      <Row>
        <Collection>{renderPolls(polls)}</Collection>
      </Row>

      <Row className="center-align">
        <Pagination items={10} activePage={2} maxButtons={8} />
      </Row>
    </div>
  );
};
PollList.propTypes = {
  title: PropTypes.string.isRequired,
  polls: PropTypes.array
};

export default PollList;
