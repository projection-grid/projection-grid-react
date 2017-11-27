import React from 'react';
import _ from 'underscore';

import ReactProjectionGrid from 'ReactProjectionGrid'; // eslint-disable-line

import people from './people.json';

export default function () {
  return (
    <ReactProjectionGrid
      config={{
        data: _.map(people.value, record => _.defaults({ Count: 0 }, record)),
        primaryKey: 'UserName',
        columns: [
          'LastName',
          'Emails',
        ],
      }}
    />
  );
}
