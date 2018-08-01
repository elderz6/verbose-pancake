import React from 'react';
import PropTypes from 'prop-types';

const LineError = ({ text }) =>
  (
    <span style={{ color:'#ae5856' }}>
      { text }
    </span>
  );

LineError.propTypes =
{
  text:PropTypes.string.isRequired
};

export default LineError;
