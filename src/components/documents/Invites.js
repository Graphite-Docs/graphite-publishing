import React, { Component } from 'react';
import {
  isSignInPending,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
  isUserSignedIn,
  loadUserData
} from 'blockstack';
import {
  loadInvite
} from '../helpers/invite';
import Signin from '../Signin';

export default class Invites extends Component {

  componentWillMount() {
    this.loadInvite = loadInvite.bind(this);
    if (isSignInPending()) {
      handlePendingSignIn().then((userData) => {
        window.location = window.location.origin;
      });
    }
  }

  componentDidMount() {
    isUserSignedIn ? this.loadInvite() : loadUserData();
  }

  handleSignIn(e) {
    e.preventDefault();
    const origin = window.location.origin
    redirectToSignIn(origin, origin + '/manifest.json', ['store_write', 'publish_data'])
  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  render() {
    console.log(window.location.href);

    return (
      <div>
        { !isUserSignedIn() ?
          <Signin handleSignIn={ this.handleSignIn } />
          :
          <div className="container payment-wrapper">
            <div className="center-align">
              <h3>You have been invite to join the {this.props.accountName} team.</h3>
              <p>Click below to accept the invite. You will have access to write, but until the person who invited you confirms the invite acceptance, you will not be able to interact with the team.</p>
              <p>Read more about Graphite Publishing's{/*'*/} security <a>here</a>.</p>
              <button className="btn black">Accept Invite</button>
            </div>
          </div>
        }
      </div>
    );
  }
}
