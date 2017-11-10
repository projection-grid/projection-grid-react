# react-projection-grid

## API design draft

```javascript
import React { Component } from 'react';
import ReactProjectionGrid, {
  ScrollingPlugin,
  FilterPlugin,
} from 'react-projection-grid';

export default class ExampleGrid extends Component {
  constructor(props) {
    super(props);

    this.gridRef = grid => {
      this.grid = grid;
    }
  }

  get columnsConfig() {
    return [
      // columns
    ];
  }

  get gridConfig() {
    return {
      tableClasses: ['bingadsgrid'],
      columns: this.columnsConfig,
    }
  }

  render() {
    return (
      <ACustomFilter onFilterChange={(filters) => {
        this.setState({filteres});
      }}/>
      <div className="grid-container">
        <ReactProjectionGrid
          ref={this.gridRef}
          config={this.gridConfig}
          dataSource={{
            adapter: (query, gridProps) => {
              // fetching data and return plain object/promise.
            },
          }}>
          {/* Plugins as children */}
          <ScrollingPlugin
            viewport={window}
            virtualized
            header={{type: 'sticky', offset: () => { /* calculating sticky header offset */ }}}
          />
          <FilterPlugin conditions={this.state.filters} />
        </ReactProjectionGrid>
      </div>
      <ACustomePaginationControl onChange={(pageSize, pageNum) => {
        this.grid.setQuery({ pageSize, pageNum});
      }} />
    );
  }
}

```