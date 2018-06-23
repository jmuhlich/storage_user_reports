import React from 'react';
import PropTypes from 'prop-types';

class BasePath extends React.Component {

  static propTypes = {
    node: PropTypes.object.isRequired
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { node } = this.props;
    const path = node.data.path;

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
