import React from 'react';

import { formatBytes } from '../../util';

class PathDetailRow extends React.Component {

  static propTypes = {
    node: React.PropTypes.object.isRequired
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {

    const { node } = this.props;
    const nameStyle = {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    };

    return (
      <tr>
        <td>{ node.depth }</td>
        <td style={nameStyle}>{ node.name }</td>
        <td>{ formatBytes(node.value) }</td>
      </tr>
    );

  }

}

export default PathDetailRow;
