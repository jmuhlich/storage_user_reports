import React from 'react';

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

class Arcs extends React.Component {

  static propTypes = {
    nodes: React.PropTypes.array
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  arcColor(d) {
    return color((d.children ? d : d.parent).name);
  }


  render() {

    const { nodes } = this.props;
    const data = nodes[0]; // holdover from d3 code

    return (
      <g>
        { nodes.map((d, i) =>
          <path key={i} d={arc(d)}
          style={{
            fill: this.arcColor(d),
            stroke: d.highlighted ? "#333" : "#eee",
            'stroke-width': 3 / (d.depth - data.depth)
          }} />) }
      </g>
    );

  }

}

export default Arcs;
