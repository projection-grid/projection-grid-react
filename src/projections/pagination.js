import _ from 'underscore';

export function getPagination(options) {
  return {
    reducer: (model, config) => {
      const pageNumber = config.pageNumber;
      const pageSize = config.pageSize;
      const start = pageNumber * pageSize;
      return _.extend({}, // move this extend to core
        model,
        {
          records: model.records.slice(start, start + pageSize),
        }
      );
    },
    options,
  };
}
