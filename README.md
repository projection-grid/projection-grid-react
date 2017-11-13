# react-projection-grid

## Development

### Workflow

1. Fork the repository. Please refer to: https://help.github.com/articles/syncing-a-fork/
2. Work on your own repository.
3. Send out pull request.
4. Reviewer review the change and approve/request change.
5. Merge the pull request once travis ci check passes.

### npm scripts

To build the library:

```bash
npm run build
```

To build the default demo:

```bash
npm run demo
```

To start the dev page with hot reloading

```bash
npm run dev
```

To run all tests

```bash
npm test
```

To excute the eslint check

```bash
npm run eslint
```

To generate doc file based on jsdoc

```bash
npm run jsdoc
```

### Coverage

coverage threashold is defined in the root package.json. Default test task will check the coverage.

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