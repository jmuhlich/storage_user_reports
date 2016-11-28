/* Derived from http://stackoverflow.com/a/26266330/2674930 */

import React from 'react';

/* Keep bounding box (width and height) of an element as state. You must add a
"boundingBoxTarget" ref to the element you would like to track. */
class BoundingBoxAware extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      /* Nulls or NaNs might be more proper here, but zeros are fine for our
      current use cases. Initializing to zeroes here reduce the code required
      for bbox consumers. */
      bbox: {x: 0, y: 0, width: 0, height: 0}
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.updateDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  componentWillReceiveProps() {
    this.updateDimensions();
  }

  hasDifferentBoundingBox(other) {
    const self = this.state.bbox;
    for (const p in self) {
      if (self[p] !== other[p]) {
        return true;
      }
    }
    return false;
  }

  updateDimensions() {
    if (this.boundingBoxTarget) {
      var bbox = this.boundingBoxTarget.getBBox();
      if (this.hasDifferentBoundingBox(bbox)) {
        this.setState({bbox: bbox});
      }
    }
  }

}


/*

This mixin can be used like so:

FIXME This example needs to be updated.

var FooComponent = React.createClass({
  mixins: [BoundingBoxAware],
  render: function() {
    return <div className="foo-class" ref="boundingBoxTarget"/>;
  }
});

*/

export default BoundingBoxAware;
