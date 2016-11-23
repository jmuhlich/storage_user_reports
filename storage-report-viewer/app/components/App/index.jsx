import React from 'react';
import * as d3 from 'd3';

import PathDetails from '../PathDetails';
import Sunburst from '../Sunburst';


function lineage(node) {
  var nodes = [node];
  while (node.parent !== undefined) {
    nodes.push(node.parent);
    node = node.parent;
  }
  nodes.reverse();
  return nodes;
}

function descendants(node) {
  return [node].concat(...
    node.children ? node.children.map(descendants) : []
  );
}


class App extends React.Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired,
    sbWidth: React.PropTypes.number,
    sbHeight: React.PropTypes.number,
    pdWidth: React.PropTypes.number,
  };

  static defaultProps = {
    sbWidth: 700,
    sbHeight: 700,
    pdWidth: 500,
  };

  constructor(props) {
    super(props);

    const { sbWidth, sbHeight, data } = props;

    const sbRadius = Math.min(sbWidth, sbHeight) / 2.2;
    this.partition = d3.layout.partition()
                       .sort(null)
                       .size([2 * Math.PI, sbRadius * sbRadius])
                       .value(node => node.size);

    this.state = {
      nodes: this.partition.nodes(data),
      highlightedNodes: []
    };
  }

  updateFocusNode(node) {
    this.setState({highlightedNodes: node === undefined ? [] : lineage(node)});
  }

  updateCenterNode(node) {
    this.setState({nodes: this.partition.nodes(node), highlightedNodes: []});
  }

  render() {

    const { sbWidth, sbHeight, pdWidth } = this.props;
    const { nodes, highlightedNodes } = this.state;
    const updateFocusNode = this.updateFocusNode.bind(this);
    const updateCenterNode = this.updateCenterNode.bind(this);

    return (
      <div style={{position: 'relative'}}>
        <div style={{width: pdWidth}}>
          <PathDetails nodes={highlightedNodes} />
        </div>
        <div style={{position: 'absolute', left: pdWidth, top: 0}}>
          <Sunburst width={sbWidth} height={sbHeight}
            nodes={nodes} highlightedNodes={highlightedNodes}
            updateFocusNode={updateFocusNode}
            updateCenterNode={updateCenterNode} />
        </div>
      </div>
    );

  }

}

export default App;
