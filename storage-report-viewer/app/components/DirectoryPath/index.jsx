import React from 'react';

class DirectoryPath extends React.Component {

  static propTypes = {
    path: React.PropTypes.string
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {

    const { path } = this.props;

    return (
      <p className="directory-path">
        { path }
      </p>
    );

  }

}

export default DirectoryPath;
