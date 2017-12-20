import React from 'react';
import { Row, Input, Icon } from 'react-materialize';

export default ({ input, label, icon, s=12 }) => {
  return (
    <Row>
      <Input label={label} {...input} s={s}>
        <Icon>{icon}</Icon>
      </Input>
    </Row>
  );
}
