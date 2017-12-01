import React, { Component } from 'react';
import ProjectionGridCore from 'projection-grid-core';
import DefaultCell from './components/default-cell';
import DefaultHeader from './components/default-header';
import { TableRender } from './components/table-renderer';

/* eslint-disable  react/prop-types */

class ReactProjectionGrid extends Component {
  componentWillMount() {
    this.core = new ProjectionGridCore({ DefaultCell, DefaultHeader });
  }

  render() {
    const model = this.core.compose({
      config: (({ records, columns, primaryKey, sort }) => (
        { records, columns, primaryKey, sort }
      ))(this.props),
      projections: this.props.projections || [],
    });

    return (
      <TableRender model={model} />
    );
  }
}

export default ReactProjectionGrid;
