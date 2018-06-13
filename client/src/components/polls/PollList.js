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
        There are no polls to show. Why don&#x27;t you create one?
      </CollectionItem>
    );
  }

  return polls.map(poll => {
    return (
      <CollectionItem href={`/polls/${poll._id}`} key={poll._id}>
        {poll.question}
        <Badge>1</Badge>
      </CollectionItem>
    );
  });
};

const PollList = ({
  title,
  polls = [],
  items = 10,
  activePage = 3,
  maxButtons = 7,
  onSelect = () => {}
}) => {
  return (
    <div>
      <Row>
        <h6 className="header section-title">{title}</h6>
      </Row>

      <Row>
        <Collection>{renderPolls(polls)}</Collection>
      </Row>

      <Row className="center-align">
        <Pagination
          items={items}
          activePage={activePage}
          maxButtons={maxButtons}
          onSelect={onSelect}
        />
      </Row>
    </div>
  );
};
PollList.propTypes = {
  title: PropTypes.string.isRequired,
  polls: PropTypes.array,
  items: PropTypes.number,
  activePage: PropTypes.number,
  maxButtons: PropTypes.number,
  onSelect: PropTypes.func
};

export default PollList;
