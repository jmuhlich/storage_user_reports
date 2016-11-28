import React from 'react';

class Instructions extends React.Component {

  static propTypes = { };

  static defaultProps = { };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Instructions</h2>
        <ul>
          <li>
            To begin, click "Choose File" and select a user storage report CSV
            file.
          </li>
          <li>
            Move the pointer over the arcs to display folder names and sizes.
          </li>
          <li>
            Click on an arc to reorient on that folder.
          </li>
          <li>
            Click on the middle circle to go up to the parent folder.
          </li>
          <li>
            Click in the white space just outside the arcs to return to the
            top level.
          </li>
        </ul>
      </div>
    );
  }
}

export default Instructions;
