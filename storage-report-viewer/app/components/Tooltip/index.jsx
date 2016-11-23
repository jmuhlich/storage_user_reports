import React from 'react';

import BoundingBoxAware from '../BoundingBoxAware';
import './tooltip.scss';


function rad2deg(a) {
  return a * 180 / Math.PI;
}

const formatSI = d3.format('.3s');

const white = d3.hsl('white');


/* The original D3 implementation used "d" as the callback datum parameter name.
Even though the equivalent prop here is now called "node", we alias it to "d" in
various places to reduce the amount of code we need to modify during the port to
React. */

class Tooltip extends BoundingBoxAware {

  static propTypes = {
    node: React.PropTypes.object,
    height: React.PropTypes.number
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  transform() {
    const d = this.props.node;

    var a1 = rad2deg(d.x + d.dx / 2) - 90;
    var x = Math.sqrt(d.y + d.dy / 2);
    if (d.depth === 0) {
      x = 0;
    }
    /* The starting angle of a 360-degree arc is at 90 degrees,
       putting the midpoint (and thus our tooltip) at 180. Override
       the angle to 0 for these arcs for better readability. */
    if (Math.abs(d.dx - 2 * Math.PI) < 1e-5) {
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

  formatBytes() {
    return formatSI(this.props.node.value) + 'B';
  }

  shapeFill() {
    const d = this.props.node;
    const height = this.props.height;
    return white.darker(height * 0.25);
  }

  render() {

    const { node } = this.props;
    const { bbox } = this.state;
    const d = node;

    /*
    psel.selectAll("rect.tooltip-shape")
        .attr("x", bbox.x - 3)
        .attr("y", bbox.y)
        .attr("width", bbox.width + 6)
        .attr("height", bbox.height);
    psel.selectAll("rect.tooltip-shadow")
        .attr("x", bbox.x - 5)
        .attr("y", bbox.y + 2)
        .attr("width", bbox.width + 10)
        .attr("height", bbox.height);
    */
    const shapeRectStyle = bbox ? {
      x: bbox.x - 3,
      y: bbox.y,
      width: bbox.width + 6,
      height: bbox.height
    } : {};
    const shadowRectStyle = bbox ? {
      x: bbox.x - 5,
      y: bbox.y + 2,
      width: bbox.width + 10,
      height: bbox.height
    } : {};

    return (
      <g transform={this.transform()}>
        <rect className="tooltip-shadow" style={shadowRectStyle}
              rx="2" ry="2" />
        <g className="tooltip-shape" style={{fill: this.shapeFill()}}>
          <path d="M -5 0 H 5 L 0 10 Z" />
          <rect style={shapeRectStyle} rx="2" ry="2" />
        </g>
        <text className="tooltip-label"
              ref={ text => { this.boundingBoxTarget=text } }>
          { d.name + ' - ' + this.formatBytes() }
        </text>
      </g>
    );

  }

}

export default Tooltip;
