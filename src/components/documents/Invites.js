import React, { Component } from 'react';
import {
  isSignInPending,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
  isUserSignedIn,
} from 'blockstack';
import Signin from '../Signin';

export default class Invites extends Component {

  componentDidMount() {
    if (isSignInPending()) {
      handlePendingSignIn().then((userData) => {
        window.location = window.location.origin;
      });
    }
    this.props.loadInvite();
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
    const { loading } = this.props;
    console.log(this.props)
    return (
      <div>
        { !isUserSignedIn() ?
          <Signin handleSignIn={ this.handleSignIn } />
          :
          <div className="container payment-wrapper">
            <div className="center-align">
              <h3>You have been invited to join the <u>{this.props.accountName}</u> team.</h3>
              <p>Click below to accept the invite. You will have access to write, but until the person who invited you confirms the invite acceptance, you will not be able to interact with the team.</p>
              <p>Read more about Graphite Publishing's{/*'*/} security <a>here</a>.</p>
              <button onClick={this.props.acceptInvite} className="btn black">{loading === true ? <span className="animated-dots">Accepting</span> : <span>Accept Invite</span>}</button>
            </div>
          </div>
        }
      </div>
    );
  }
}
