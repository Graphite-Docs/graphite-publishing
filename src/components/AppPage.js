import React, { Component } from "react";
import Signin from "./Signin";
import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
} from "blockstack";
import Posts from './documents/Posts';

export default class AppPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  handleSignIn(e) {
    e.preventDefault();
    const origin = window.location.origin;
    redirectToSignIn(origin, origin + "/manifest.json", [
      "store_write",
      "publish_data"
    ]);
  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  componentWillMount() {
    if (isSignInPending()) {
      handlePendingSignIn().then(userData => {
        window.location = window.location.origin;
      });
    }
  }

  render() {

    return (
      <div>
        <div className="site-wrapper">
          <div className="site-wrapper-inner">
            {!isUserSignedIn() ? (
                <Signin handleSignIn={this.handleSignIn} />
              ) : (
                <Posts />
              )
            }
          </div>
        </div>
      </div>
    );
  }
}
