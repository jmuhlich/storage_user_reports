import React from 'react';

import DirectoryPath from '../DirectoryPath';
import Sunburst from '../Sunburst';

class App extends React.Component {

  static propTypes = {
    data: React.PropTypes.object
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {

    const { data } = this.props;

    return (
      <div>
        <DirectoryPath path="/test/path" />
        <Sunburst width={960} height={700} data={data} />
      </div>
    );

  }

}

export default App;
