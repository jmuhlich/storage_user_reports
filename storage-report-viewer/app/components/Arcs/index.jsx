import React from 'react';

import Arc from '../Arc';

class Arcs extends React.Component {

  static propTypes = {
    nodes: React.PropTypes.array,
    highlightedNodes: React.PropTypes.array,
    updateFocusNode: React.PropTypes.func
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {

    const { nodes, highlightedNodes, updateFocusNode } = this.props;

    return (
      <g>
        { nodes.map((d, i) =>
          <Arc key={i} node={d} baseDepth={nodes[0].depth}
               highlighted={highlightedNodes.includes(d)}
               updateFocusNode={updateFocusNode} />) }
      </g>
    );

  }

}

export default Arcs;
