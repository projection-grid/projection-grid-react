import _ from 'underscore';
import { render } from 'react-dom';

export const ColumnChooser = (props, gridView) => {
  gridView.set({
    columns: _.map(props.columns, (column) => {
      console.log(column); // eslint-disable-line

      return {
        name: column.name,
        title: column.title,
        property: column.property,
        template: (property) => {
          if (_.isFunction(column.cell)) {
            const detached = document.createElement('div');

            render(column.cell(property.value), detached);

            return detached.innerHTML;
          }

          return null;
        },
      };
    }),
  });
};
