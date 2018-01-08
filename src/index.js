import React from 'react';
import PropTypes from 'prop-types';
import createCore, { utils } from 'projection-grid-core';
import defaultContentFactory from './components/default-content-factory';
import { TableRender } from './components/table-renderer';

class ProjectionGridReact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this.core = createCore()
      .useBuiltin({
        defaultContentFactory,
      })
      .use(this.props.projections);
  }

  render() {
    const { config } = this.props;

    const defaultDispatch = (reducer, ...args) => {
      const state = reducer(this.state, ...args);

      this.setState(state);

      return state;
    };

    const model = this.core.compose({
      config,
      state: this.props.state || this.state,
      dispatch: utils.isFunction(this.props.dispatch) ? this.props.dispatch : defaultDispatch,
    });

    return (
      <TableRender model={model} />
    );
  }
}

ProjectionGridReact.propTypes = {
  config: PropTypes.shape({
    classes: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(PropTypes.any),
    caption: PropTypes.shape({ content: PropTypes.any }),
    tfoot: PropTypes.shape({ content: PropTypes.any }),
    cols: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
    primaryKey: PropTypes.string.isRequired,
    sorting: PropTypes.shape({
      cols: PropTypes.arrayOf(PropTypes.string),
      $asc: PropTypes.any,
      $desc: PropTypes.any,
      $default: PropTypes.any,
      onSort: PropTypes.func,
    }),
  }).isRequired,
  projections: PropTypes.arrayOf(PropTypes.any),
  state: PropTypes.shape({}),
  dispatch: PropTypes.func,
};

ProjectionGridReact.defaultProps = {
  projections: [],
  state: null,
  dispatch: null,
};

export default ProjectionGridReact;
