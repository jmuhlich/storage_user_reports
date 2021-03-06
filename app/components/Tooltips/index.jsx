import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../Tooltip';

class Tooltips extends React.PureComponent {

  static propTypes = {
    nodes: PropTypes.array,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {

    const { nodes } = this.props;

    const maxDepth = nodes.length ? nodes[nodes.length-1].depth : NaN;

    const tooltipList = nodes.map(
      (node, i) => <Tooltip key={i} node={node} height={maxDepth-node.depth} />
    );

    return (<g style={{pointerEvents: "none"}}>{ tooltipList }</g>);

  }

}

export default Tooltips;
