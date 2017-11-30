import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

const forbiddenProps = ['class', 'classes', 'className', 'style', 'styles', 'key'];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatProps({ key, classes = [], props = {}, events = {}, styles = {} }) {
  if (!_.isEmpty(_.pick(props, forbiddenProps))) {
    console.warn(`${forbiddenProps.join(' or ')} is not allowed in props`); //eslint-disable-line
  }

  return _.defaults(
    key ? { key } : {},
    {
      className: classes.join(' '),
      style: styles,
    },
    _.omit(props, forbiddenProps),
    _.reduce(events, (memo, handler, eventName) => {
      if (/^on[A-Z]/.test(eventName)) {
        console.warn('Please dont prepend your event name with "on". It may cause bugs if you use frameworks like vue.js'); //eslint-disable-line

        return _.defaults({}, { [eventName]: handler }, memo);
      }

      return _.defaults({}, { [`on${capitalizeFirstLetter(eventName)}`]: handler }, memo);
    }, {})
  );
}

function renderTrs(trs) {
  return (
    trs.map(tr => (
      <tr {...formatProps(tr)}>
        {tr.tds.map(td => (
          <td {...formatProps(td)}>
            <td.content.Component {...formatProps(td.content)} />
          </td>
        ))}
      </tr>
    ))
  );
}

export const TableRender = (props) => {
  const { table } = props.model;

  const caption = table.caption ?
    (
      <caption {...formatProps(table.caption)}>
        <table.caption.content.Component
          {...formatProps(table.caption.content)}
        />
      </caption>
    ) : null;

  return (
    <div>
      <table {...formatProps(table)}>
        {caption}
        {table.colgroups.map(colgroup => (
          <colgroup {...formatProps(colgroup)}>
            {colgroup.cols.map(col => (
              <col {...formatProps(col)} />
            ))}
          </colgroup>
        ))}

        <thead {...formatProps(table.thead)}>
          {table.thead.trs.map(tr => (
            <tr {...formatProps(tr)}>
              {tr.ths.map(th => (
                <th {...formatProps(th)}>
                  <th.content.Component {...formatProps(th.content)} />
                </th>
              ))}
            </tr>))}
        </thead>
        {table.tbodies.map(tbody => (
          <tbody {...formatProps(tbody)}>
            {renderTrs(tbody.trs)}
          </tbody>
        ))}
      </table>
    </div>
  );
};

TableRender.defaultProps = {
  model: {},
};

TableRender.propTypes = {
  model: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};
