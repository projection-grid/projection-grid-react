import React from 'react';
import { render } from 'react-dom';

import ReactProjectionGrid from 'ReactProjectionGrid'; // eslint-disable-line

import people from './people.json';

const config = {
  tableClasses: ['table', 'table-bordered'],
  dataSource: {
    type: 'memory',
    data: people.value,
    primaryKey: 'UserName',
  },
};

render((
  <div className="demo">
    <h3>This is the basic demo</h3>
    <ReactProjectionGrid config={config} />
  </div>
), document.getElementById('app'));
