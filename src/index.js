import React from 'react';
import PropTypes from 'prop-types';
import createCore, { utils } from 'projection-grid-core';
import defaultContentFactory from './components/default-content-factory';
import { TableRender } from './components/table-renderer';

/* eslint-disable react/no-unused-prop-types */

class ProjectionGridReact extends React.Component {
  componentWillMount() {
    this.core = createCore()
      .useBuiltin({
        defaultContentFactory,
      })
      .use(this.props.projections);
  }

  render() {
    const { classes, data, caption, cols, primaryKey, sort, tfoot } = this.props;

    const model = this.core.compose({ config: {
      classes: utils.compact([...classes, this.props.className]),
      data,
      caption,
      cols,
      primaryKey,
      sort,
      tfoot,
    } });

    return (
      <TableRender model={model} />
    );
  }
}

ProjectionGridReact.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.any),
  caption: PropTypes.shape({ content: PropTypes.any }),
  cols: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  primaryKey: PropTypes.string.isRequired,
  sort: PropTypes.shape({
    handleResort: PropTypes.func,
    ascClasses: PropTypes.arrayOf(PropTypes.string),
    descClasses: PropTypes.arrayOf(PropTypes.string),
  }),
  projections: PropTypes.arrayOf(PropTypes.any),
};

ProjectionGridReact.defaultProps = {
  data: [],
  cols: [],
  projections: [],
  sort: {},
  caption: {},
  classes: [],
  className: '',
};

export default ProjectionGridReact;
