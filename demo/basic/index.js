import React from 'react';
import { render } from 'react-dom';

import ReactProjectionGrid from '../../dist/index';

render((
  <div className="demo">
    <h3>This is the basic demo</h3>
    <ReactProjectionGrid />
  </div>
), document.getElementById('app'));
