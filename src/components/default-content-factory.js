import React from 'react';
import _ from 'underscore';
import DefaultContent from '../components/default-content';

export const defaultContentFactory = (model) => {
  const { content } = model;

  return _.isString(content) ? {
    ...model,
    content: <DefaultContent text={content} />,
  } : model;
};
