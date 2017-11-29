import _ from 'underscore';

export function bootstrapProjection(options) {
  return {
    reducer(model, bsConfig = { modifier: '' }) {
      return _.defaults({}, {
        composeTable({ config }) {
          const table = model.composeTable({ config });

          return _.defaults({}, {
            classes: ['table', bsConfig.modifier, ...table.classes],
          }, table);
        },
      }, model);
    },
    options,
  };
}
