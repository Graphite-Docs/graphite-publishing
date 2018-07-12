import React, { Component } from "react";
import {
  isUserSignedIn,
} from 'blockstack';
import Signin from '../Signin';
import smallLogo from '../../images/graphiteSquare.jpg';

export default class Onboarding extends Component {

  componentDidMount() {
    window.$('.tooltipped').tooltip();
  }


  render() {
    if(!isUserSignedIn()) {
      return (
        <Signin handleSignIn={this.handleSignIn} />
      );
    } else {
      return (
        <div className="center-align onboarding-set-up">
          <h3><span><img className="small-logo circle" src={smallLogo} alt="Graphite logo" /></span>Start your 14-day free trial</h3>
          <div className="container sign-ip-form">
          <div className="row">
              <form className="col s12">
                <div className="row">
                  <h5 className="sign-up-h5">Account Information</h5>
                  <div className="input-field col s12 m6">
                    <input onChange={this.props.signUpAccountName} placeholder="New York Times" id="account_name" type="text" className="validate" />
                    <label className="active" htmlFor="account_name">Account Name</label>
                  </div>
                  <div className="input-field col s12 m6">
                    <input onChange={this.props.signUpEmail} placeholder="name@email.com" id="email" type="text" className="validate" />
                    <label className="active" htmlFor="email">Email Address<span><a data-position="top" data-tooltip="For reminders and team invites only." className="tooltipped info"><i className="material-icons">info_outline</i></a></span></label>
                  </div>
                </div>
              </form>
              <p>That's it. Seriously. We don't need anything else for you to start writing. If you still like us in 14 days, we'{/*'*/}ll ask for payment then.</p>
              <button onClick={this.props.signUp} className="btn sign-up-button black">Get started</button>
            </div>
          </div>
        </div>
      );
    }
  }

}
