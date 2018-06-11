import React from 'react';
import PropTypes from 'prop-types';
import { Row, Input } from 'react-materialize';

const PollField = ({
  input,
  label,
  icon,
  s = 12,
  meta: { error, touched }
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
PollField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  s: PropTypes.number,
  meta: PropTypes.object.isRequired
};

export default PollField;
