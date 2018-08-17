import React, { Component } from 'react';
import {
  redirectToSignIn
} from 'blockstack';

export default class Signin extends Component {
  handleSignIn(e) {
    const origin = window.location.origin;
    e.preventDefault();
    redirectToSignIn(origin, origin + '/manifest.json', ['store_write', 'publish_data'])
  }

  render() {
    return (
      <div className="sign-in-page center-align">
        <h1>Welcome!</h1>
        <p>
        Graphite Publishing is a decentralized and encrypted publishing platform where you own your data.
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
