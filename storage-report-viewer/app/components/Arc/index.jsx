import React from 'react';
import * as d3 from 'd3';

import { stringHash } from '../../util';

const arc = d3.svg.arc()
              .startAngle(node => node.x)
              .endAngle(node => node.x + node.dx)
              .innerRadius(node => Math.sqrt(node.y))
              .outerRadius(node => Math.sqrt(node.y + node.dy));

const color = d3.scale.category20();
color.range(color.range().map(
  oc => {
    const c = d3.hsl(oc);
    c.l = Math.max(c.l, 0.5);
    return c.darker();
  }
));


class Arc extends React.Component {

  static propTypes = {
    node: React.PropTypes.object,
    baseDepth: React.PropTypes.number,
    highlighted: React.PropTypes.bool,
    updateFocusNode: React.PropTypes.func,
    updateCenterNode: React.PropTypes.func
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  arcColor() {
    const node = this.props.node;
    const c = d3.hsl(color(stringHash(node.name)));
    if (this.props.highlighted) {
      c.s = 0.8;
      c.l = 0.8;
    }
    return c;
  }

  handleMouseOver = (e) => {
    this.props.updateFocusNode(this.props.node);
    e.stopPropagation();
  };

  handleClick = (e) => {
    this.props.updateCenterNode(this.props.node);
    e.stopPropagation();
  }

  render() {

    const { node, baseDepth, highlighted } = this.props;

    return (
      <path
          d={ arc(node) }
          style={{
            fill: this.arcColor(),
            stroke: highlighted ? "#333" : "#eee",
            strokeWidth: 3 / (node.depth - baseDepth)
          }}
          onMouseOver={ this.handleMouseOver }
          onClick={ this.handleClick }
      />
    );

  }

  /* shouldComponentUpdate(nextProps, nextState) {
   *   return this.props.highlighted != nextProps.highlighted;
   * }*/

}

export default Arc;
