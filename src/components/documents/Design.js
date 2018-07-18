import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/html';
import 'brace/theme/twilight';

export default class Design extends Component {

  componentDidMount() {
  }

  render() {

    return (
      <div className="container">
        <h1>Design</h1>
        <AceEditor
          mode="html"
          theme="twilight"
          name="html-editor"
          onChange={this.props.handleCodeChanges}
          value={this.props.pageHTML}
        />
      </div>
    );
  }
}
