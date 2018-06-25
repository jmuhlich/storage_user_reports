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

    this.state = {
      root: null,
      renderRoot: null,
      highlightedNodes: []
    };
  }

  updateData = (data) => {
    const root = data;
    const renderRoot = this.partition(data.copy());
    this.setState({ root: root, renderRoot: renderRoot });
  }

  updateFocusNode = (node) => {
    this.setState({
      highlightedNodes: node === null ?
                        [this.state.renderRoot] : node.ancestors().reverse()
    });
  };

  updateCenterNode = (center) => {
    if (center === null) {
      center = this.state.root;
    } else if (center === this.state.renderRoot) {
      const trueCenter = this.findCenter();
      if (trueCenter.parent !== null) {
        center = trueCenter.parent;
      }
    }
    const renderRoot = this.partition(center.copy());
    this.setState({ renderRoot: renderRoot, highlightedNodes: [renderRoot] });
  };

  findCenter() {
    if (this.state.renderRoot === null) {
      return null;
    }
    return this.findNodeByPath(this.state.renderRoot.data.path);
  }

  findNodeByPath(path, node=this.state.root) {
    if (node.data.path === path) {
      return node;
    }
    for (let child of node.children) {
      if (path.startsWith(child.data.path)) {
        return this.findNodeByPath(path, child);
      }
    }
    return null;
  }

  render() {

    const { sbWidth, sbHeight, pdWidth, insExtraWidth } = this.props;
    const { root, renderRoot, highlightedNodes } = this.state;

    const center = this.findCenter();
    const basePathNodes = center !== null ? center.ancestors().reverse() : [];
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
          { renderRoot !== null &&
              <Sunburst width={sbWidth} height={sbHeight}
                root={renderRoot} highlightedNodes={highlightedNodes}
                updateFocusNode={this.updateFocusNode}
                updateCenterNode={this.updateCenterNode} />
          }
        </div>
      </div>
    );

  }

}

export default App;
