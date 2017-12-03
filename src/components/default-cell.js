import React from 'react';
import PropTypes from 'prop-types';

const DefaultCell = ({ record, column }) => (
  <span>{record[column.name]}</span>
);

DefaultCell.propTypes = {
  record: PropTypes.shape({}).isRequired,
  column: PropTypes.shape({ name: PropTypes.string }).isRequired,
};

export default DefaultCell;
