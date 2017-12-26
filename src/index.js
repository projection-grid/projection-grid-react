import React from 'react';
import PropTypes from 'prop-types';
import ProjectionGridCore from 'projection-grid-core';
import _ from 'underscore';
import Defaults from './projections/default-content';
import { TableRender } from './components/table-renderer';

/* eslint-disable react/no-unused-prop-types */

class ProjectionGridReact extends React.Component {
  componentWillMount() {
    this.core = ProjectionGridCore.createDefault(Defaults);
  }

  render() {
    const model = this.core.compose({
      config: _.omit(this.props, 'projections'),
      projections: this.props.projections || [],
    });

    return (
      <TableRender model={model} />
    );
  }
}

ProjectionGridReact.propTypes = {
  records: PropTypes.arrayOf(PropTypes.any).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  primaryKey: PropTypes.string.isRequired,
  sort: PropTypes.shape({
    handleResort: PropTypes.func,
    ascClasses: PropTypes.arrayOf(PropTypes.string),
    descClasses: PropTypes.arrayOf(PropTypes.string),
  }),
  projections: PropTypes.arrayOf(PropTypes.any),
};

ProjectionGridReact.defaultProps = {
  columns: [],
  projections: [],
  sort: {},
};

export default ProjectionGridReact;
