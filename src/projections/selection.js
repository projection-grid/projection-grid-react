import React from 'react';
import _ from 'underscore';
import PropTypes from 'prop-types';

const selectionCol = { name: 'projection-selection' };

function CheckboxCol(props) {
  const key = props.record[props.config.primaryKey];

  return (<input
    data-id={key}
    type="Checkbox"
    checked={props.isChecked}
    onChange={props.onChange}
  />);
}

CheckboxCol.defaultProps = {
  record: {},
  model: {},
  isChecked: false,
  onChange: _.noop,
};

CheckboxCol.propTypes = {
  record: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
  config: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

class SelectionProjection {
  constructor(option) {
    this.option = _.defaults(option, { selected: [], onCheckChanged: _.noop });
    this.keys = option.selected;
  }

  onCheckedChange(event) {
    const target = event.target;
    const key = target.getAttribute('data-id');
    if (target.checked) {
      this.keys.push(key);
    } else {
      this.keys = _.without(this.keys, key);
    }
    if (_.isFunction(this.option.onSelectChanged)) {
      this.option.onSelectChanged(this.keys);
    }
  }

  decorateComposeTD(composeTds) {
    const onCheckedChange = this.onCheckedChange.bind(this);
    const isChecked = key => _.contains(this.keys, key);
    return ({ column, record, config }) => {
      if (column.name === selectionCol.name) {
        return [{
          attributes: {},
          key: column.name,
          content: {
            Component: CheckboxCol,
            props: { column, record, config, isChecked: isChecked(record[config.primaryKey]) },
            events: {
              onChange: onCheckedChange,
            },
          },
        }];
      }
      return composeTds({ column, record, config });
    };
  }

  reducer(model) {
    return _.extend(model, {
      composeTds: this.decorateComposeTD(model.composeTds),
      columns: [selectionCol].concat(model.columns),
    });
  }
}

export function getSelection(option) {
  return new SelectionProjection(option);
}
