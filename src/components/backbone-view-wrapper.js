import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Backbone from 'backbone';

class BackboneViewWrapper extends Component {
  constructor(props) {
    super(props);
    this.view = props.view;
    this.containerClass = props.containerClass;
  }

  componentDidMount() {
    this.view.render().$el.appendTo(this.container);
  }

  componentWillUnmount() {
    this.view.$el.detach();
  }

  render() {
    return (
      <div ref={(container) => { this.container = container; }} className={this.containerClass}></div> // eslint-disable-line
    );
  }
}

BackboneViewWrapper.propTypes = {
  view: PropTypes.instanceOf(Backbone.View).isRequired,
  containerClass: PropTypes.string,
};

BackboneViewWrapper.defaultProps = {
  containerClass: '',
};

export default BackboneViewWrapper;

