import React, { Component } from 'react';
import ProjectionGridCore from 'projection-grid-core';
import { TableRender } from './components/table-renderer';
import reactDefault from './projections/react-default';

/* eslint-disable  react/prop-types */

class ReactProjectionGrid extends Component {
  componentWillMount() {
    this.core = new ProjectionGridCore();
  }

  render() {
    const model = this.core.compose({
      config: this.props.config,
      projections: [reactDefault, ...this.props.projections || []],
    });
    return (
      <TableRender model={model} />
    );
  }
}

export default ReactProjectionGrid;

export * from './projections/pagination';
export * from './projections/selection';
