import React from 'react';
import { utils } from 'projection-grid-core';
import DefaultContent from '../components/default-content';

export const defaultContentFactory = content =>
  (utils.isString(content) ? content : <DefaultContent text={content} />);
