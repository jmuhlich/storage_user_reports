import React from 'react';
import * as d3 from 'd3';

import Arcs from '../Arcs';
import Tooltips from '../Tooltips';

class Sunburst extends React.Component {

  static propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    data: React.PropTypes.object
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
  }

  render() {

    const { width, height, data } = this.props;

    const radius = Math.min(width, height) / 2.2;
    const centeringTransform = `translate(${width / 2} ${height * .5})`;
    const partition = d3.layout.partition()
                        .sort(null)
                        .size([2 * Math.PI, radius * radius])
                        .value(d => d.size);
    const nodes = partition.nodes(data);

    return (
      <svg width={width} height={height}>
        <g transform={centeringTransform}>
          <Arcs nodes={nodes} />
          {/* <Tooltips data={data} /> */}
        </g>
      </svg>
    );

  }

}

export default Sunburst;
