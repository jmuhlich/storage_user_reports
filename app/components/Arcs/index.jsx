import React from 'react';
import PropTypes from 'prop-types';

import Arc from '../Arc';

class Arcs extends React.Component {

  static propTypes = {
    root: PropTypes.object,
    highlightedNodes: PropTypes.array,
    updateFocusNode: PropTypes.func,
    updateCenterNode: PropTypes.func
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {

    const { root, highlightedNodes, updateFocusNode, updateCenterNode } =
      this.props;

    const arcList = root.descendants().map(
      (node, i) =>
        (node.x1 - node.x0) > .01 ?
              <Arc key={i} node={node}
                highlighted={highlightedNodes.includes(node)}
                updateFocusNode={updateFocusNode}
                updateCenterNode={updateCenterNode} />
            : null
    );

    return (<g>{ arcList }</g>);

  }

}

export default Arcs;
