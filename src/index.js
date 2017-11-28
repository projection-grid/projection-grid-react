import React, { Component } from 'react';
import ProjectionGridCore from 'projection-grid-core';
import { TableRender } from './components/table-renderer';
import reactDefault from './projections/react-default';
import { sortable } from './projections/sortable';

/* eslint-disable  react/prop-types */

class ReactProjectionGrid extends Component {
  componentWillMount() {
    this.core = new ProjectionGridCore();
  }

  render() {
    const model = this.core.compose({
      config: this.props.config,
      projections: [
        reactDefault,
        sortable({
          ascClass: this.props.config.sortingAscIcon || 'glyphicon glyphicon-arrow-up',
          descClass: this.props.config.sortingDescIcon || 'glyphicon glyphicon-arrow-down',
          handleResort: this.props.config.handleResort,
        }),
        ...this.props.projections || [],
      ],
    });
    return (
      <TableRender model={model} />
    );
  }
}

export default ReactProjectionGrid;

export * from './projections/bootstrap';
