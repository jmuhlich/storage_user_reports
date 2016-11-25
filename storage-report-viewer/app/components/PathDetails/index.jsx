import React from 'react';

import PathDetailRow from '../PathDetailRow';

class PathDetails extends React.Component {

  static propTypes = {
    nodes: React.PropTypes.array.isRequired
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {

    const { nodes } = this.props;

    const rowList = nodes.map(
      (node, i) => <PathDetailRow key={i} node={node} depth={i} />
    );

    return (
      <table style={{width: '100%', tableLayout: 'fixed'}}>
        <tbody>
          <tr>
            <th style={{textAlign: 'left', width: '4em'}}>Depth</th>
            <th style={{textAlign: 'left'}}>Name</th>
            <th style={{textAlign: 'left', width: '4em'}}>Size</th>
          </tr>
          { rowList }
        </tbody>
      </table>
    );

  }

}

export default PathDetails;
