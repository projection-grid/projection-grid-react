import _ from 'underscore';

export function bootstrapProjection(options) {
  return {
    reducer(model, bsConfig = { modifier: '' }) {
      return _.defaults({}, {
        composeTable({ config }) {
          const table = model.composeTable({ config });
          const tableAttributes = table.attributes;

          return _.defaults({
            attributes: _.defaults({}, {
              className: `table ${bsConfig.modifier} ${tableAttributes.className || ''}`,
            }, tableAttributes),
          }, table);
        },
      }, model);
    },
    options,
  };
}
