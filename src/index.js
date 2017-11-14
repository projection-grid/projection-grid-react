import React from 'react';
import pgrid from 'projection-grid';
import PropTypes from 'prop-types';

import BackboneViewWrapper from './components/backbone-view-wrapper';

function ReactProjectionGrid(props) {
  const gridView = pgrid.factory({ vnext: true })
    .create({
      tableClasses: props.config.tableClasses,
      dataSource: props.config.dataSource,
    }).gridView;

  return (
    <BackboneViewWrapper view={gridView.render()} />
  );
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
