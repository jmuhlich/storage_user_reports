import React from 'react';
import PropTypes from 'prop-types';

import { rad2deg, formatBytes, white } from '../../util';
import BoundingBoxAware from '../BoundingBoxAware';
import './tooltip.scss';


class Tooltip extends BoundingBoxAware {

  static propTypes = {
    node: PropTypes.object,
    height: PropTypes.number
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  transform() {
    const node = this.props.node;

    var a1 = rad2deg((node.x0 + node.x1) / 2) - 90;
    var x = Math.sqrt((node.y0 + node.y1) / 2);
    if (node.depth === 0) {
      x = 0;
    }
    /* The starting angle of a 360-degree arc is at 90 degrees,
       putting the midpoint (and thus our tooltip) at 180. Override
       the angle to 0 for these arcs for better readability. */
    if (Math.abs((node.x1 - node.x0) - 2 * Math.PI) < 1e-5) {
      a1 = 0;
    }
    var y = -10, a2 = 0;
    /* For tooltips to the left of the origin, we rotate them by 180
       after the initial rotation and translation to keep them right
       side up. We also need to reverse the vertical translation as
       now the tooltip is facing the other direction. */
    if (a1 > 90 && a1 < 270) {
      y = -y;
      a2 = 180;
    }
    return `rotate(${a1}) translate(${x} ${y}) rotate(${a2})`;
  }

  formatNodeSize() {
    return formatBytes(this.props.node.value);
  }

  shapeFill() {
    const height = this.props.height;
    return white.darker(height * 0.25);
  }

  render() {

    const { node } = this.props;
    const { bbox } = this.state;

    const shapeRectDims = {
      x: bbox.x - 3,
      y: bbox.y,
      width: bbox.width + 6,
      height: bbox.height
    };
    const shadowRectDims = {
      x: bbox.x - 5,
      y: bbox.y + 2,
      width: bbox.width + 10,
      height: bbox.height
    };

    return (
      <g transform={this.transform()}>
        <rect className="tooltip-shadow" {...shadowRectDims} rx="2" ry="2" />
        <g style={{fill: this.shapeFill()}}>
          <path d="M -5 0 H 5 L 0 10 Z" />
          <rect {...shapeRectDims} rx="2" ry="2" />
        </g>
        <text className="tooltip-label"
              ref={ text => { this.boundingBoxTarget=text } }>
          { node.name + ' - ' + this.formatNodeSize() }
        </text>
      </g>
    );

  }

}

export default Tooltip;
