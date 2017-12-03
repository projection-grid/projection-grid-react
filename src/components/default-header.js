import React from 'react';
import PropTypes from 'prop-types';

const DefaultHeader = ({ column }) => (
  <span>{column.name}</span>
);

DefaultHeader.propTypes = {
  column: PropTypes.shape({ name: PropTypes.string }).isRequired,
};

export default DefaultHeader;
