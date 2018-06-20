import React from 'react';
import PropTypes from 'prop-types';

class BasePath extends React.Component {

  static propTypes = {
    nodes: PropTypes.array.isRequired
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { nodes } = this.props;
    const path = nodes.slice(1).map(node => node.name).join('/');

    const style = {
      font: '16px monospace',
      wordBreak: 'break-all',
      background: '#ddd',
      padding: 4
    };

    return (
      path.length > 0 ? <p style={style}>{path}</p> : null
    );
  }

}

export default BasePath;
