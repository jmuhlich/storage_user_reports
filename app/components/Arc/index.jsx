import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import { stringHash } from '../../util';

const arc = d3.arc()
              .startAngle(node => node.x0)
              .endAngle(node => node.x1)
              .innerRadius(node => Math.sqrt(node.y0))
              .outerRadius(node => Math.sqrt(node.y1));

const color = d3.scaleOrdinal(d3.schemeCategory10);
color.range(color.range().map(
  oc => {
    const c = d3.hsl(oc);
    c.s = Math.min(c.s, 0.5);
    c.l = Math.min(c.l, 0.5);
    return c;
  }
));


class Arc extends React.Component {

  static propTypes = {
    node: PropTypes.object,
    baseDepth: PropTypes.number,
    highlighted: PropTypes.bool,
    updateFocusNode: PropTypes.func,
    updateCenterNode: PropTypes.func
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  arcColor() {
    const node = this.props.node;
    const c = d3.hsl(color(stringHash(node.data.path)));
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
            strokeWidth: 3 / (node.depth - baseDepth + 1)
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
