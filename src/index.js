import React, { Component } from 'react';
import pgrid from 'projection-grid';
import PropTypes from 'prop-types';
import _ from 'underscore';

import BackboneViewWrapper from './components/backbone-view-wrapper';

class ReactProjectionGrid extends Component {
  constructor(props) {
    super(props);
    this.gridView = pgrid.factory({ vnext: true })
      .create({
        tableClasses: props.config.tableClasses,
        dataSource: props.config.dataSource,
      }).gridView.render();
  }

  componentWillUnmount() {
    this.gridView.remove();
  }

  render() {
    this.plugins = _.flatten([this.props.children]);

    _.each(this.plugins, (plugin) => {
      plugin.type(plugin.props, this.gridView);
    });

    return (
      <BackboneViewWrapper view={this.gridView} />
    );
  }
}

ReactProjectionGrid.propTypes = {
  config: PropTypes.shape({
    tableClasses: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    dataSource: PropTypes.object,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
};

ReactProjectionGrid.defaultProps = {
  children: [],
};

export default ReactProjectionGrid;

export * from './plugins/column-chooser';
