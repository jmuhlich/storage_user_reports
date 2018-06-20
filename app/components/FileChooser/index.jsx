import React from 'react';
import PropTypes from 'prop-types';

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
      const rows = content.split(/\r\n|\n/);
      const headers = rows[0];
      // FIXME Enum for format.
      const format = headers.match(/^SizeH/) ? 1 : 2;
      // Skip last row if empty (due to final newline).
      const numRows = rows[rows.length - 1].length > 0 ?
                      rows.length : rows.length - 1;
      const root = {
        name: '<all files>',
        depth: 0,
        children: []
      };
      let prevNode = root;
      for (let i = 1; i < numRows; i++) {
        const fields = rows[i].split(/, /);
        const bytes = parseInt(fields[fields.length - 1]);
        // FIXME CSV parsing hack for format 2.
        const path = format == 1 ? fields.slice(1, -1).join(',') :
                     fields.slice(0, -1).join(',').replace(/(^"|"$)/, '');
        const names = path.split(/\//);
        const node = {
          size: bytes,
          name: names[names.length - 1],
          depth: names.length
        };
        const deltaDepth = node.depth - prevNode.depth;
        if (deltaDepth === 1) {
          prevNode.children = [node];
          node.parent = prevNode;
        } else if (deltaDepth <= 0) {
          var ancestor = prevNode.parent;
          for (let d = deltaDepth; d < 0; d++) {
            ancestor = ancestor.parent;
          }
          ancestor.children.push(node);
          node.parent = ancestor;
        } else if (deltaDepth > 1) {
          throw (`Input data skipped ${deltaDepth - 1} level(s) ` +
                 `after row '${path}'`);
        }
        prevNode = node;
      }
      this.props.updateData(root);
    };
  };

  render() {

    return (
      <input type="file" onChange={this.handleChange}
             ref={ input => { this.inputNode = input } }/>
    );

  }

}

export default FileChooser;
