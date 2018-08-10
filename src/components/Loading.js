import React, { Component } from 'react';

export default class Loading extends Component {

  render() {
    return (
      <div className="progress">
          <div className="indeterminate"></div>
      </div>
    );
  }
}
