import 'bootstrap/dist/css/bootstrap.css'; // eslint-disable-line
import React, { Component } from 'react';
import _ from 'underscore';

import ReactProjectionGrid, { sortable, bootstrapProjection } from 'ReactProjectionGrid'; // eslint-disable-line

import people from './people.json';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleResort = this.handleResort.bind(this);

    this.state = {
      records: _.sortBy(people.value, 'LastName'),
      columns: [
        { name: 'UserName', sorting: true },
        { name: 'FirstName', title: 'first name', head: <h1>first name</h1> },
        { name: 'LastName', title: 'last name', sorting: 'asc' },
        {
          name: 'AddressInfo',
          title: 'Address',
          Component: ({ record }) => {
            const { AddressInfo: addressInfo } = record;

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

  handleResort(columnName) {
    this.setState({
      columns: _.map(this.state.columns, (column) => {
        if (column.name === columnName) {
          const sorting = column.sorting === 'asc' ? 'desc' : 'asc';

          this.setState({
            records: sorting === 'asc' ?
              _.sortBy(people.value, columnName) :
              _.sortBy(people.value, columnName).reverse(),
          });

          return _.defaults({}, {
            sorting,
          }, column);
        }

        if (column.sorting) {
          return _.defaults({}, {
            sorting: true,
          }, column);
        }

        return column;
      }),
    });
  }

  render() {
    return (
      <div className="demo">
        <ReactProjectionGrid
          config={{
            records: this.state.records,
            columns: this.state.columns,
            primaryKey: 'UserName',
            handleResort: this.handleResort,
          }}
          projections={[
            bootstrapProjection({ modifier: 'table-striped table-dark' }),
          ]}
        />
        <div className="btn-group" role="group">
          <button
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();

              this.setState((preState) => {
                if (preState.pageNumber > 0) {
                  return {
                    pageNumber: preState.pageNumber - 1,
                  };
                }
                return {
                  pageNumber: preState.pageNumber,
                };
              });
            }
            }
          > Previous page </button>
          <button
            className="btn btn-secondary"
            onClick={(e) => {
              e.preventDefault();

              this.setState((preState) => {
                if (preState.pageNumber < preState.pageCount - 1) {
                  return {
                    pageNumber: preState.pageNumber + 1,
                  };
                }
                return {
                  pageNumber: preState.pageNumber,
                };
              });
            }
            }
          > Next page </button>
        </div>
      </div>
    );
  }
}
