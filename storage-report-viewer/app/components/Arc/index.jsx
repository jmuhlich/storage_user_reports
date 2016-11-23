import React from 'react';
import * as d3 from 'd3';

const arc = d3.svg.arc()
              .startAngle(function(d) { return d.x; })
              .endAngle(function(d) { return d.x + d.dx; })
              .innerRadius(function(d) { return Math.sqrt(d.y) })
              .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

const color = d3.scale.category20();
color.range(color.range().map(function(oc) {
  var c = d3.hsl(oc);
  c.l = Math.max(c.l, 0.5);
  return c.darker(1);
}));

/* The original D3 implementation used "d" as the callback datum parameter
name. Even though the equivalent prop here is now called "node", we alias it to
"d" in various places to reduce the amount of code we need to modify during the
port to React. */

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
    const d = this.props.node;
    const c = d3.hsl(color((d.children ? d : d.parent).name));
    if (this.props.highlighted) {
      c.s = 0.8;
      c.l = 0.8;
    }
    return c;
  }

  handleMouseOver = (e) => {
    this.props.updateFocusNode(this.props.node);
  };

  handleClick = (e) => {
    this.props.updateCenterNode(this.props.node);
  }

  render() {

    const { node, baseDepth, highlighted } = this.props;
    const d = node;

    return (
      <path
          d={ arc(d) }
          style={{
            fill: this.arcColor(),
            stroke: highlighted ? "#333" : "#eee",
            strokeWidth: 3 / (d.depth - baseDepth)
          }}
          onMouseOver={ this.handleMouseOver }
          onClick={ this.handleClick }
      />
    );

  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.highlighted != nextProps.highlighted;
  }

}

export default Arc;
