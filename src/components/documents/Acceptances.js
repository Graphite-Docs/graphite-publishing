import React, { Component } from 'reactn';
import {
  isSignInPending,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
  isUserSignedIn,
} from 'blockstack';
import Signin from '../Signin';

export default class Acceptances extends Component {

  componentDidMount() {
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
    const { loading, confirmationDone } = this.global;
    let mainLink = window.location.href;
    let userToLoadFrom = mainLink.split('?')[1];
    return (
      <div>
        { !isUserSignedIn() ?
          <Signin handleSignIn={ this.handleSignIn } />
          :
          <div className="container payment-wrapper">
            <div className="center-align">
              {
                confirmationDone === false ?
                <div>
                  <h3>Confirm invite acceptance</h3>
                  <h5>Invite accepted by: <strong>{userToLoadFrom}</strong></h5>
                  <button onClick={this.props.confirmAcceptance} className="btn black">{loading === true ? <span className="animated-dots">Confirming</span> : <span>Confirm Invite Acceptance</span>}</button>
                </div>
                :
                <div>
                  <h3>Teammate confirmed!</h3>
                  <a href='/settings'><button className="btn black">Go to Settings</button></a>
                </div>
              }

            </div>
          </div>
        }
      </div>
    );
  }
}
