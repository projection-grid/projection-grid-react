import React, { Component } from 'react';
import pgrid from 'projection-grid';
import PropTypes from 'prop-types';

import BackboneViewWrapper from './components/backbone-view-wrapper';

class ReactProjectionGrid extends Component {
  constructor(props) {
    super(props);
    this.gridView = pgrid.factory({ vnext: true })
      .create({
        tableClasses: props.config.tableClasses,
        dataSource: props.config.dataSource,
      }).gridView;
  }

  componentWillUnmount() {
    this.gridView.remove();
  }

  render() {
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
};

export default ReactProjectionGrid;
