import React from 'react';
import { render } from 'react-dom';
import ReactProjectionGrid from '../src/index.js';

render((
  <div className="demo">
    <h3>This is demo!!</h3>
    <ReactProjectionGrid />
  </div>
), document.getElementById('app'))
