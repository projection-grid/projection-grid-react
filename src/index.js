import React, { Component } from 'react';
import _ from 'underscore';
import {
  ProjectionCore,
  CoreDefault,
} from './mock/projection-core/index';
import { TableRender } from './components/table-renderer';
import { composeContent } from './components/compose-content';

export default class extends Component {
  componentWillMount() {
    this.prepareProjectionCore(this.props);
  }

  componentWillUpdate(props) {
    this.prepareProjectionCore(props);
  }

  prepareProjectionCore(props) {
    this.projectionModel = CoreDefault(props.config);
    _.extend(this.projectionModel, { composeContent });
    this.projectionCore = new ProjectionCore(props.projections);
  }

  render() {
    const model = this.projectionCore.compose(this.projectionModel);
    return (
      <TableRender model={model} />
    );
  }
}
