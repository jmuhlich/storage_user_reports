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

    this.state = {
      nodes: partition.nodes(data),
      focusNode: undefined
    };
  }

  updateFocusNode(node) {
    const oldNode = this.state.focusNode;

    if (node === undefined) {
      for (const n of lineage(oldNode)) {
        n.highlighted = false;
      }
    } else {
      for (const n of lineage(node)) {
        n.highlighted = true;
      }
    }

    this.setState({focusNode: node, nodes: this.state.nodes});
  }

  render() {

    const { width, height } = this.props;
    const { nodes } = this.state;
    const updateFocusNode = this.updateFocusNode.bind(this);

    return (
      <svg width={width} height={height}>
        <g transform={this.centeringTransform}>
          <Arcs nodes={nodes} updateFocusNode={updateFocusNode} />
          {/* <Tooltips nodes={nodes} /> */}
        </g>
      </svg>
    );

  }

}

export default Sunburst;
