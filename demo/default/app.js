import React, { Component } from 'react';
import _ from 'underscore';

import ReactProjectionGrid, { ColumnChooser } from 'ReactProjectionGrid'; // eslint-disable-line

import people from './people.json';

const config = {
  tableClasses: ['table', 'table-bordered'],
  dataSource: {
    type: 'memory',
    data: people.value,
    primaryKey: 'UserName',
  },
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'UserName', sortable: true },
        { name: 'FirstName', title: 'first name', head: <h1>first name</h1> },
        { name: 'LastName', title: 'last name' },
        {
          name: 'AddressInfo',
          title: 'Address',
          cell: (addressInfo) => {
            if (_.isEmpty(addressInfo)) {
              return <span>No address information</span>;
            }

            return _.map(addressInfo, addressInfoItem => (
              <ul key={_.uniqueId()} >
                <li key={_.uniqueId()}>{addressInfoItem.Address}</li>
                <li key={_.uniqueId()}>{JSON.stringify(addressInfoItem.City)}</li>
              </ul>
            ));
          },
        },
      ],
    };
  }

  render() {
    return (
      <div className="demo">
        <h3>This is the basic demo</h3>
        <button
          onClick={(e) => {
            e.preventDefault();

            this.setState({
              columns: [...this.state.columns, { name: 'Emails' }],
            });
          }}
        > Add emails column </button>
        <ReactProjectionGrid config={config}>
          <ColumnChooser columns={this.state.columns} />
        </ReactProjectionGrid>
      </div>
    );
  }
}
