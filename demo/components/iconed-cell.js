/* eslint-disable */


import React from 'react';

export default ({ content, icon }) => (
  <div>
    <span>
      {content}
    </span>
    {icon ? (
      <span className={`glyphicon glyphicon-${icon}`} />
    ) : (
      ''
    )}
  </div>
);
