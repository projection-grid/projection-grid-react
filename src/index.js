import React from 'react';
import PropTypes from 'prop-types';
import createCore, { utils } from 'projection-grid-core';
import defaultContentFactory from './components/default-content-factory';
import { TableRender } from './components/table-renderer';

class ProjectionGridReact extends React.Component {
  constructor(props) {
    super(props);

    this.gridState = {};
  }

  componentWillMount() {
    this.core = createCore()
      .useBuiltin({
        defaultContentFactory,
      })
      .use(this.props.projections);
  }

  render() {
    const { classes, data, caption, cols, primaryKey, sorting, tfoot } = this.props;

    const model = this.core.compose({
      config: {
        classes: utils.compact([...classes, this.props.className]),
        data,
        caption,
        cols,
        primaryKey,
        sorting,
        tfoot,
      },
      state: this.gridState,
      dispatch: (reducer, ...args) => {
        this.gridState = reducer(this.gridState, ...args);

        return this.gridState;
      },
    });

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
  tfoot: PropTypes.shape({ content: PropTypes.any }),
  cols: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  primaryKey: PropTypes.string.isRequired,
  sorting: PropTypes.shape({
    $td: PropTypes.any,
    onSort: PropTypes.func,
  }),
  projections: PropTypes.arrayOf(PropTypes.any),
};

ProjectionGridReact.defaultProps = {
  data: [],
  cols: [],
  projections: [],
  sorting: {},
  caption: {},
  tfoot: {},
  classes: [],
  className: '',
};

export default ProjectionGridReact;
