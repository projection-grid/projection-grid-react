import React from 'react';
import _ from 'underscore';
import PropTypes from 'prop-types';

const defaultComponent = ({ text }) => <span>{text}</span>;

defaultComponent.propTypes = {
  text: PropTypes.string,
};

defaultComponent.defaultProps = {
  text: '',
};

export default function reactDefault(config) {
  return _.defaults({
    composeContent({ props, events }) {
      return {
        Component: defaultComponent,
        props,
        events,
      };
    },
  }, config);
}
