import React from 'react';
import * as d3 from 'd3';

import Arcs from '../Arcs';
import Tooltips from '../Tooltips';

function lineage(d) {
  var nodes = [d];
  while (d.parent !== undefined) {
    nodes.push(d.parent);
    d = d.parent;
  }
  return nodes;
}

class Sunburst extends React.Component {

  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    data: React.PropTypes.object,
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);

    const { width, height, data } = props;

    const radius = Math.min(width, height) / 2.2;
    const partition = d3.layout.partition()
                        .sort(null)
                        .size([2 * Math.PI, radius * radius])
                        .value(d => d.size);

    this.centeringTransform = `translate(${width / 2} ${height / 2})`;

    const nodes = partition.nodes(data);
    this.state = {
      nodes: nodes,
      highlightedNodes: []
    };
  }

  updateFocusNode(node) {
    this.setState({highlightedNodes: node === undefined ? [] : lineage(node)});
  }

  render() {

    const { width, height } = this.props;
    const { nodes, highlightedNodes } = this.state;
    const updateFocusNode = this.updateFocusNode.bind(this);

    return (
      <svg width={width} height={height}>
        <g transform={this.centeringTransform}>
          <Arcs nodes={nodes} highlightedNodes={highlightedNodes}
                updateFocusNode={updateFocusNode} />
          {/* <Tooltips nodes={nodes} /> */}
        </g>
      </svg>
    );

  }

}

export default Sunburst;
