import React from 'react';
import _ from 'underscore';

import ReactProjectionGrid from 'ReactProjectionGrid'; // eslint-disable-line

import people from './people.json';

export default function () {
  return (
    <ReactProjectionGrid
      config={{
        data: _.map(people.value, record => _.defaults(
          { Count: 0 },
          { AddressInfo: record.AddressInfo ? JSON.stringify(record.AddressInfo) : '' },
          record)
        ),
        primaryKey: 'UserName',
      }}
    />
  );
}
