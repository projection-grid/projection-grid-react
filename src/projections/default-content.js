import React from 'react';
import _ from 'underscore';
import DefaultContent from '../components/default-content';

function wrap(model) {
  const { content } = model;

  return _.isString(content) ? {
    ...model,
    content: <DefaultContent text={content} />,
  } : model;
}

export default function ({
  composeCaption,
  composeTds,
}) {
  return {
    composeCaption(caption) {
      return wrap(composeCaption(caption));
    },
    composeTds(td) {
      return composeTds(td).map(wrap);
    },
  };
}
