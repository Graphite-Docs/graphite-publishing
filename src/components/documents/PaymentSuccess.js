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
  loadAccount
} from '../helpers/helpers';
import Header from '../Header';

export default class PaymentSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountName: "",
      ownerBlockstackId: "",
      ownerEmail: "",
      accountId: "",
      signUpDate: "",
      onboardingComplete: false,
      accountType: "",
      paymentDue: true,
    }
  }

  componentWillMount() {
    this.loadAccount = loadAccount.bind(this);
    isUserSignedIn ? this.loadAccount() : loadUserData();
    if (isSignInPending()) {
      handlePendingSignIn().then((userData) => {
        window.location = window.location.origin;
      });
    }
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
    console.log(window.location.href.split('?')[1]);

    return (
      <div>
        <Header />
        <div className="container payment-wrapper">
          <div className="center-align">
            <h3>Thank you for your payment!</h3>
            <p><a href="/posts">Continue publishing</a></p>
            <p><strong>or</strong></p>
            <p>Download your receipt</p>
          </div>
        </div>
      </div>
    );
  }
}
