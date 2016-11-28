import React from 'react';

import { formatBytes } from '../../util';

class PathDetailRow extends React.PureComponent {

  static propTypes = {
    node: React.PropTypes.object.isRequired,
    depth: React.PropTypes.number.isRequired,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {

    const { node, depth } = this.props;
    const nameStyle = {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    };

    return (
      <tr>
        <td>{ depth }</td>
        <td style={nameStyle}>{ node.name }</td>
        <td>{ formatBytes(node.value) }</td>
      </tr>
    );

  }

}

export default PathDetailRow;
