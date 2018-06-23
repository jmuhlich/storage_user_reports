import React from 'react';
import * as d3 from 'd3';

import FileChooser from '../FileChooser';
import BasePath from '../BasePath';
import PathDetails from '../PathDetails';
import Instructions from '../Instructions';
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
  };

  static defaultProps = {
    sbWidth: 700,
    sbHeight: 700,
    pdWidth: 500,
    insExtraWidth: 100
  };

  constructor(props) {
    super(props);

    const { sbWidth, sbHeight } = props;

    const sbRadius = Math.min(sbWidth, sbHeight) / 2.2;
    this.partition = d3.partition()
                       .size([2 * Math.PI, sbRadius * sbRadius])

    this.state = { root: null, center: null, highlightedNodes: [] };
  }

  getLineage(node, full=false) {
    var nodes;
    if (node === null) {
      nodes = [];
    } else {
      nodes = [node];
      while (node.parent !== null &&
             (node !== this.state.center || full)) {
        nodes.push(node.parent);
        node = node.parent;
      }
      nodes.reverse();
    }
    return nodes;
  }

  updateData = (data) => {
    const root = this.partition(data);
    this.setState({ root: root, center: root });
  }

  updateFocusNode = (node) => {
    this.setState({
      highlightedNodes: node === null ?
                        [this.state.root] : this.getLineage(node)
    });
  };

  updateCenterNode = (node) => {
    if (node === null) {
      node = this.state.root;
    } else if (node === this.state.center && node.parent !== null) {
      node = node.parent;
    }
    // FIXME The height attributes in the children don't change here so
    // the arc radii are wrong. Need to rebuild the subtree or something.
    node = this.partition(node);
    this.setState({ center: node, highlightedNodes: [node] });
  };

  render() {

    const { sbWidth, sbHeight, pdWidth, insExtraWidth } = this.props;
    const { root, center, highlightedNodes } = this.state;

    const basePathNodes = this.getLineage(center, true);
    const fullPathNodes = basePathNodes.concat(highlightedNodes.slice(1));

    const fileChooserStyle = {
      marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid gray'
    };
    const instructionsStyle = {
      position: 'absolute', bottom: 0, width: pdWidth + insExtraWidth
    };

    return (
      <div style={{position: 'relative', height: sbHeight}}>
        <div style={{width: pdWidth}}>
          <div style={fileChooserStyle}>
            <FileChooser updateData={this.updateData} />
          </div>
          { center !== null && <BasePath node={center} /> }
          <PathDetails nodes={fullPathNodes} />
          <div style={instructionsStyle}>
            <Instructions />
          </div>
        </div>
        <div style={{position: 'absolute', left: pdWidth, top: 0}}>
          { center !== null &&
              <Sunburst width={sbWidth} height={sbHeight}
                root={center} highlightedNodes={highlightedNodes}
                updateFocusNode={this.updateFocusNode}
                updateCenterNode={this.updateCenterNode} />
          }
        </div>
      </div>
    );

  }

}

export default App;
