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
      const root = (rows[0][0] == "SizeH") ?
                   this.parse(rows, 1, 2, true) :
                   this.parse(rows, 0, 1, false);
      this.props.updateData(root.sort(
        (a, b) => a.data.path.localeCompare(b.data.path)
      ));
    };
  };

  parse(rows, path_col, size_col, pre_summed) {
    const records = rows.slice(1).map(r => {
      const path = r[path_col].replace(/^ /, "/").replace(/([^\/])$/, "$1/");
      return {
        path: path,
        name: path.replace(/.*\/([^\/]+)\/?/, "$1"),
        size: +r[size_col]
      }
    });
    const stratify = d3.stratify()
                       .id(d => d.path)
                       .parentId(d => d.path.replace(/[^/]*\/$/, ""));
    const root = stratify(records);
    if (pre_summed) {
      root.each(n => { n.value = n.data.size });
      if (root.value === 0) {
        root.value = root.children.map(n => n.value).reduce((a, b) => a + b);
      }
    } else {
      root.sum(d => d.size);
    }
    return root;
  }

  render() {

    return (
      <input type="file" onChange={this.handleChange}
             ref={ input => { this.inputNode = input } }/>
    );

  }

}

export default FileChooser;
