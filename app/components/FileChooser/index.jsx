import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import { formatBytes } from '../../util';

class FileChooser extends React.PureComponent {

  static propTypes = {
    updateData: PropTypes.func
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  handleChange = (e) => {
    const reader = new FileReader();
    const file = this.inputNode.files[0];
    reader.readAsText(file);
    reader.onload = (e) => {
      const content = e.target.result;
      const rows = d3.csvParseRows(content);
      const root = (rows[0][0] == "SizeH") ? this.parseFormat1(rows) : this.parseFormat2(rows);
      this.props.updateData(root.sort(
        (a, b) => a.data.path.localeCompare(b.data.path)
      ));
    };
  };

  parseFormat1(rows) {
    const records = rows.slice(1).map(r => {
      const path = r[1].replace(/^ /, "/").replace(/([^\/])$/, "$1/");
      return {
        path: path,
        name: path.replace(/.*\/([^\/]+)\/?/, "$1"),
        size: +r[2]
      }
    });
    const stratify = d3.stratify()
                       .id(d => d.path)
                       .parentId(d => d.path.replace(/[^/]*\/$/, ""));
    const root = stratify(records);
    root.each(n => { n.value = n.data.size });
    if (root.value === 0) {
      root.value = root.children.map(n => n.value).reduce((a, b) => a + b);
    }
    return root;
  }

  parseFormat2(rows) {
  }

  render() {

    return (
      <input type="file" onChange={this.handleChange}
             ref={ input => { this.inputNode = input } }/>
    );

  }

}

export default FileChooser;
