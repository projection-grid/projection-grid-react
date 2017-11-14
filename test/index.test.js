import React from 'react';
import renderer from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createWaitForElement } from 'enzyme-wait';

import ReactProjectionGrid from '../src/index';

const mockConfig = {
  tableClasses: ['table', 'table-bordered'],
  dataSource: {
    type: 'memory',
    data: [{ UserName: 'abc' }],
    primaryKey: 'UserName',
  },
};

configure({ adapter: new Adapter() });

describe('ReactProjectionGrid', () => {
  test('should not throw any errors', () => {
    expect(() => {
      renderer.create(<ReactProjectionGrid config={mockConfig} />);
    }).not.toThrow();
  });

  test('should reflect the table classes config', () => {
    const grid = mount(
      <ReactProjectionGrid config={mockConfig} />
    );
    const waitForTable = createWaitForElement('.table');

    waitForTable(grid)
      .then((component) => {
        expect(component.find('.table').hasClass('table-bordered')).toBe(true);

        done();
      });
  });
});
