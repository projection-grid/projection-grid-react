/* eslint-disable */

import 'bootstrap/dist/css/bootstrap.min.css';
import './demo.css';
import React, { Component } from 'react';
import Octicon from 'react-octicon';
import _ from 'lodash';

import ProjectionGridReact from 'projection-grid-react';
import people from './people.json';
import IconedCell from './iconed-cell';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: people.value,
      isBordered: false,
      isStriped: false,
      isHover: false,
      icon: '',
    };

    this.toggleBorderd = this.toggleBorderd.bind(this);
    this.toggleStriped = this.toggleStriped.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
    this.selectTdIcon = this.selectTdIcon.bind(this);
  }

  toggleBorderd() {
    this.setState({
      isBordered: !this.state.isBordered,
    });
  }

  toggleStriped() {
    this.setState({
      isStriped: !this.state.isStriped,
    });
  }

  toggleHover() {
    this.setState({
      isHover: !this.state.isHover,
    });
  }

  selectTdIcon(e) {
    this.setState({
      icon: e.target.value,
    });
  }

  render() {
    return (
      <div className="demo">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3>Projection Grid for ReactJs</h3>
          </div>
          <div className="panel-body">
            <form className="form-inline">
              <div className="checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={this.state.isBordered}
                    onChange={this.toggleBorderd}
                  />
                  <span>Is bordered?</span>
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={this.state.isStriped}
                    onChange={this.toggleStriped}
                  />
                  <span>Is striped?</span>
                </label>
              </div>
              <div className="checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={this.state.isHover}
                    onChange={this.toggleHover}
                  />
                  <span>Is hover?</span>
                </label>
              </div>
              <div className="form-group">
                <label>Cell Icon:</label>
                <select className="form-control" value={this.state.icon} onChange={this.selectTdIcon} >
                  <option value="">None</option>
                  <option value="ok">OK</option>
                  <option value="pencil">Pencil</option>
                  <option value="heart">Heart</option>
                  <option value="heart-empty">Empty Heart</option>
                </select>
              </div>
            </form>
          </div>
          <ProjectionGridReact
            data={this.state.data}
            caption={{ content: 'Projection Grid React' }}
            cols={[
              {
                key: 'UserName',
                $td: this.state.icon ? {
                  content: (td, content) => (
                    <IconedCell content={content} icon={this.state.icon} />
                  ),
                } : {},
              },
              { key: 'FirstName' },
              { key: 'LastName' },
            ]}
            primaryKey="UserName"
            projections={[]}
            className="table"
            classes={[
              this.state.isBordered && 'table-bordered',
              this.state.isStriped && 'table-striped',
              this.state.isHover && 'table-hover',
            ].filter(c => typeof(c) === 'string')}
            tfoot={{
              trs: [{
                content: 'foot placehold',
              }],
            }}
            sorting={{
              cols: ['LastName', 'FirstName'],
              $default: {
                classes: ['sortable-header'],
              },
              $asc: {
                classes: ['sortable-header'],
                content: (td, content) => {
                  return <IconedCell content={content} icon="arrow-up" />
                }
              },
              $desc: {
                classes: ['sortable-header'],
                content: (td, content) => {
                  return <IconedCell content={content} icon="arrow-down" />
                }
              },
              onSort: ({ sortBy, direction }) => {
                const dataAsc = _.sortBy(this.state.data, sortBy);

                this.setState({
                  sortBy,
                  direction,
                  data: direction === 'asc' ? dataAsc : _.reverse(dataAsc),
                });
              },
            }}
          />
        </div>
      </div>
    );
  }
}
