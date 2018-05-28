import React from 'react';
import { Row, Input } from 'react-materialize';

export default ({
  input,
  label,
  icon,
  s = 12,
  meta: { active, error, touched }
}) => {
  return (
    <Row>
      <Input
        label={touched && error ? error : label}
        labelClassName={touched && error ? 'red-text' : ''}
        icon={icon}
        {...input}
        validate
        s={s}
      />
    </Row>
  );
};
