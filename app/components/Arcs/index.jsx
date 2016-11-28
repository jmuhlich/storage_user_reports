import React from 'react';

import Arc from '../Arc';

class Arcs extends React.Component {

  static propTypes = {
    nodes: React.PropTypes.array,
    highlightedNodes: React.PropTypes.array,
    updateFocusNode: React.PropTypes.func,
    updateCenterNode: React.PropTypes.func
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {

    const { nodes, highlightedNodes, updateFocusNode, updateCenterNode } =
      this.props;

    const arcList = nodes.map(
      (node, i) =>
        node.dx > .01 ?
              <Arc key={i} node={node} baseDepth={nodes[0].depth}
                highlighted={highlightedNodes.includes(node)}
                updateFocusNode={updateFocusNode}
                updateCenterNode={updateCenterNode} />
            : null
    );

    return (<g>{ arcList }</g>);

  }

}

export default Arcs;
