import { coreDefault } from './core-default';

export class ProjectionGridCore {
  compose({ config: userConfig, projections = [] }) {
    function resolve(config, projection) {
      if (projection instanceof Array) {
        return projection.reduce(resolve, config);
      }
      if (typeof projection.reducer === 'function') {
        return projection.reducer(config, projection.options);
      }
      if (typeof projection === 'function') {
        return projection(config);
      }
      return config;
    }

    const config = resolve(userConfig, [coreDefault, ...projections]);

    return { table: config.composeTable({ config }) };
  }
}
