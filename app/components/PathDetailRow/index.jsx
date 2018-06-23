import React from 'react';
import PropTypes from 'prop-types';

import { formatBytes } from '../../util';

class PathDetailRow extends React.PureComponent {

  static propTypes = {
    node: PropTypes.object.isRequired,
    depth: PropTypes.number.isRequired,
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
        <td style={nameStyle}>{ node.data.name }</td>
        <td>{ formatBytes(node.value) }</td>
      </tr>
    );

  }

}

export default PathDetailRow;
