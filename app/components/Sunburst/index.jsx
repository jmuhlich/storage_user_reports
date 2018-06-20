import React from 'react';
import PropTypes from 'prop-types';

import Arcs from '../Arcs';
import Tooltips from '../Tooltips';

class Sunburst extends React.Component {

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    nodes: PropTypes.array.isRequired,
    highlightedNodes: PropTypes.array.isRequired,
    updateFocusNode: PropTypes.func.isRequired,
    updateCenterNode: PropTypes.func.isRequired
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    this.props.updateCenterNode(null);
  }

  handleMouseOver = (e) => {
    this.props.updateFocusNode(null);
  }

  render() {

    const { width, height, nodes, highlightedNodes,
            updateFocusNode, updateCenterNode } =
      this.props;

    const centeringTransform = `translate(${width / 2} ${height / 2})`;

    return (
      <svg width={width} height={height}
        onClick={this.handleClick} onMouseOver={this.handleMouseOver}>
        <g transform={centeringTransform}>
          <Arcs nodes={nodes} highlightedNodes={highlightedNodes}
            updateFocusNode={updateFocusNode}
            updateCenterNode={updateCenterNode} />
          <Tooltips nodes={highlightedNodes} />
        </g>
      </svg>
    );

  }

}

export default Sunburst;
