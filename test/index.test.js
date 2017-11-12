import React from 'react';
import renderer from 'react-test-renderer';

import ReactProjectionGrid from '../src/index';

test('ReactProjectGrid does not throw errors', () => {
  expect(() => {
    renderer.create(<ReactProjectionGrid />);
  }).not.toThrow();
});
