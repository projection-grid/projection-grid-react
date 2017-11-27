import _ from 'underscore';

function defaultColumns({ records, columns }) {
  return _.map(columns || _.keys(_.first(records)), (col) => {
    if (_.isString(col)) {
      return { name: col };
    }
    return col;
  });
}

function reducer(configIn) {
  const configOut = _.defaults({
    primaryKey: obj => obj[configIn.primaryKey],
    records: configIn.records || [],
    columns: defaultColumns(configIn),
    composeTable({ config }) {
      return {
        attributes: {},
        caption: null,
        colgroups: null,
        thead: config.composeThead({ config }),
        tbodies: config.composeTbodies({ config }),
        tfoot: null,
      };
    },

    composeThead({ config }) {
      return {
        attributes: {},
        trs: [{
          attributes: {},
          ths: _.chain(config.columns)
            .map(column => config.composeThs({ column, config }))
            .flatten()
            .compact()
            .value(),
        }],
      };
    },

    composeThs({ column, config }) {
      return [{
        attributes: {},
        content: config.composeContent({
          props: { text: column.name },
          events: {},
        }),
      }];
    },

    composeTbodies({ config }) {
      return [{
        key: 'default',
        attributes: {},
        trs: _.chain(config.records)
          .map(record => config.composeTrs({ record, config }))
          .flatten()
          .compact()
          .value(),
      }];
    },

    composeTrs({ record, config }) {
      return {
        key: config.primaryKey(record),
        attributes: {},
        tds: _.chain(config.columns)
          .map(column => config.composeTds({ column, record, config }))
          .flatten()
          .compact()
          .value(),
      };
    },

    composeTds({ column, record, config }) {
      return {
        key: column.name,
        attributes: {},
        content: config.composeContent({
          props: { text: record[column.name] },
          events: {},
        }),
      };
    },

    composeContent(/* { props, events, config } */) {
      return null;
    },
  }, configIn);

  return configOut;
}

export function coreDefault(options) {
  return { reducer, options };
}

coreDefault.reducer = reducer;
