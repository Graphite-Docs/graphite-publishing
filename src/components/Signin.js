import React, { Component } from 'react';
import {
  redirectToSignIn
} from 'blockstack';

export default class Signin extends Component {
  handleSignIn(e) {
    e.preventDefault();
    redirectToSignIn();
  }

  render() {
    return (
      <div className="sign-in-page center-align">
        <h1>Welcome!</h1>
        <p>
        Graphite Publish is a decentralized and encrypted publishing platform where you own your data.
        </p>
        <p>
          <button onClick={ this.handleSignIn } className="btn black sign-in">
            Sign in
          </button>
        </p>

      </div>
    );
  }
}
