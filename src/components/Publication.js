import React, { Component } from 'react';

export default class Publication extends Component {

  componentDidMount() {
    this.props.loadMainHtml();

  }
  createMarkup() {
    return {__html: this.props.pageHTML};
  }

  render() {
    return (
      <div className="container">
        <div dangerouslySetInnerHTML={this.createMarkup()} />
      </div>
    );
  }
}
