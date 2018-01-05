import React from 'react';
import renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ProjectionGridReact from '../src/index';

const mockConfig = {
  data: [{ UserName: 'abc' }],
  primaryKey: 'UserName',
};

configure({ adapter: new Adapter() });

describe('ProjectionGridReact', () => {
  test('should not throw any errors', () => {
    expect(() => {
      renderer.create(<ProjectionGridReact config={mockConfig} />);
    }).not.toThrow();
  });

  test('should render correctly', () => {
    const grid = renderer.create(<ProjectionGridReact config={mockConfig} />);

    const tree = grid.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
