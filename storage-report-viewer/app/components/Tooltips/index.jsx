import React from 'react';

import Tooltip from '../Tooltip';

class Tooltips extends React.Component {

  static propTypes = {
    highlightedNodes: React.PropTypes.array,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {

    const { highlightedNodes } = this.props;

    const nodes = highlightedNodes.slice().sort((a,b) => a.depth-b.depth);
    const maxDepth = nodes.length ? nodes[nodes.length-1].depth : NaN;

    const tooltipList = nodes.map(
      (node, i) => <Tooltip key={i} node={node} height={maxDepth-node.depth} />
    );

    return (<g style={{pointerEvents: "none"}}>{ tooltipList }</g>);

  }

}

export default Tooltips;
