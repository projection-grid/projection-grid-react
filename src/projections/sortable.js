import _ from 'underscore';

function sortableReducer(model, sortConfig = {
  ascClass: 'glyphicon glyphicon-arrow-up',
  descClass: 'glyphicon glyphicon-arrow-up',
  handleResort: () => {},
}) {
  return _.defaults({}, {
    composeThs({ column, config }) {
      if (column.sorting) {
        const sortingClass = `${column.sorting === 'asc' ? sortConfig.ascClass : ''} ${column.sorting === 'desc' ? sortConfig.descClass : ''}`;

        return _.map(model.composeThs({ column, config }), th => _.defaults({}, {
          attributes: _.defaults({}, {
            className: `${th.attributes.className || ''} ${sortingClass}`,
            onClick: () => {
              sortConfig.handleResort(column.name);
            },
          }, th.attributes),
        }, th));
      }

      return model.composeThs({ column, config });
    },
  }, model);
}

export const sortable = options => ({
  reducer: sortableReducer,
  options,
});
