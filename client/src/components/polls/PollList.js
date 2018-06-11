import React, { Component } from 'react';
import {
  Row,
  Collection,
  CollectionItem,
  Badge,
  Pagination
} from 'react-materialize';

const PollList = props => {
  return (
    <div>
      <Row>
        <h6 className="header section-title">{props.title}</h6>
      </Row>

      <Row>
        <Collection>
          <CollectionItem href="#">
            Sample Poll 1<Badge>1</Badge>
          </CollectionItem>
          <CollectionItem href="#">
            Sample Poll 2<Badge>1</Badge>
          </CollectionItem>
          <CollectionItem href="#">
            Sample Poll 3<Badge>1</Badge>
          </CollectionItem>
          <CollectionItem href="#">
            Sample Poll 4<Badge>1</Badge>
          </CollectionItem>
          <CollectionItem href="#">
            Sample Poll 5<Badge>1</Badge>
          </CollectionItem>
          <CollectionItem href="#">
            Sample Poll 6<Badge>1</Badge>
          </CollectionItem>
          <CollectionItem href="#">
            Sample Poll 7<Badge>1</Badge>
          </CollectionItem>
          <CollectionItem href="#">
            Sample Poll 8<Badge>1</Badge>
          </CollectionItem>
          <CollectionItem href="#">
            Sample Poll 9<Badge>1</Badge>
          </CollectionItem>
          <CollectionItem href="#">
            Sample Poll 10<Badge>1</Badge>
          </CollectionItem>
        </Collection>
      </Row>

      <Row className="center-align">
        <Pagination items={10} activePage={2} maxButtons={8} />
      </Row>
    </div>
  );
};

export default PollList;
