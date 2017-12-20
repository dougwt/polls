import React from 'react';
import { Row, Input, Icon } from 'react-materialize';

export default ({ input, label, icon }) => {
  return (
    <Row>
      <Input label={label} {...input} s={12}>
        <Icon>{icon}</Icon>
      </Input>
    </Row>
  );
}
