import React from 'react';

import Arc from '../Arc';

class Arcs extends React.Component {

  static propTypes = {
    nodes: React.PropTypes.array,
    updateFocusNode: React.PropTypes.func
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {

    const { nodes, updateFocusNode } = this.props;

    return (
      <g>
        { nodes.map((d, i) =>
          <Arc node={d} baseDepth={nodes[0].depth}
          updateFocusNode={updateFocusNode} key={i} />) }
      </g>
    );

  }

}

export default Arcs;
