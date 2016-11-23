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

    const arcList = nodes.map(
      (d, i) =>
        d.dx > .01 ?
              <Arc key={i} node={d} baseDepth={nodes[0].depth}
                   highlighted={highlightedNodes.includes(d)}
                   updateFocusNode={updateFocusNode} />
            : null
    );

    return (<g>{ arcList }</g>);

  }

}

export default Arcs;
