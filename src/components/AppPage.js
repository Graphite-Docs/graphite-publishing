import React, { Component } from "react";
import Signin from "./Signin";
import Header from './Header';
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
    const { onboardingComplete, logo, accountName } = this.props;

    return (
      <div>
        <div className="site-wrapper">
          <div className="site-wrapper-inner">
            {!isUserSignedIn() ? (
                <Signin handleSignIn={this.handleSignIn} />
              ) : (
                <div>
                <Header
                  handleSignOut={this.props.handleSignOut}
                  onboardingComplete={onboardingComplete}
                  logo={logo}
                  accountName={accountName}
                 />
                <Posts
                  newPost={this.props.newPost}
                  posts={this.props.posts}
                />
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}
