import React from 'react';
import * as d3 from 'd3';

import FileChooser from '../FileChooser';
import PathDetails from '../PathDetails';
import Sunburst from '../Sunburst';


/*
function descendants(node) {
  return [node].concat(...
    node.children ? node.children.map(descendants) : []
  );
}
*/


class App extends React.Component {

  static propTypes = {
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

    const { sbWidth, sbHeight } = props;

    const sbRadius = Math.min(sbWidth, sbHeight) / 2.2;
    this.partition = d3.layout.partition()
                       .sort(null)
                       .size([2 * Math.PI, sbRadius * sbRadius])
                       .value(node => node.size);

    this.state = { nodes: [], highlightedNodes: [] };
  }

  getLineage(node, full=false) {
    var nodes;
    if (node === undefined || this.state.nodes.length === 0) {
      nodes = [];
    } else {
      nodes = [node];
      while (node.parent !== undefined &&
             (node !== this.state.nodes[0] || full)) {
        nodes.push(node.parent);
        node = node.parent;
      }
      nodes.reverse();
    }
    return nodes;
  }

  updateData = (data) => {
    const nodes = this.partition.nodes(data);
    this.master_node = nodes[0];
    this.setState({ nodes: nodes });
  }

  updateFocusNode = (node) => {
    this.setState({
      highlightedNodes: node === undefined ?
                        this.state.nodes.slice(0,1) : this.getLineage(node)
    });
  };

  updateCenterNode = (node) => {
    if (node === undefined) {
      node = this.master_node;
    } else if (node === this.state.nodes[0] && node.parent !== undefined) {
      node = node.parent;
    }
    this.setState({
      nodes: this.partition.nodes(node),
      highlightedNodes: [node]
    });
  };

  render() {

    const { sbWidth, sbHeight, pdWidth } = this.props;
    const { nodes, highlightedNodes } = this.state;
    const pathNodes = this.getLineage(nodes[0], true).slice(0, -1)
                          .concat(highlightedNodes);

    const fileChooserStyle = {
      marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid gray'
    };

    return (
      <div style={{position: 'relative'}}>
        <div style={{width: pdWidth}}>
          <div style={fileChooserStyle}>
            <FileChooser updateData={this.updateData} />
          </div>
          <PathDetails nodes={pathNodes} />
        </div>
        <div style={{position: 'absolute', left: pdWidth, top: 0}}>
          <Sunburst width={sbWidth} height={sbHeight}
            nodes={nodes} highlightedNodes={highlightedNodes}
            updateFocusNode={this.updateFocusNode}
            updateCenterNode={this.updateCenterNode} />
        </div>
      </div>
    );

  }

}

export default App;