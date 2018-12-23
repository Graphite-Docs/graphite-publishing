import React, { Component } from "react";
import {
  isUserSignedIn,
} from 'blockstack';
import Signin from '../Signin';
import Loading from '../Loading';
import smallLogo from '../../images/graphiteSquare.jpg';

export default class Onboarding extends Component {

  componentDidMount() {
    window.$('.tooltipped').tooltip();
  }

  render() {
    window.$('.tooltipped').tooltip();
    const { loading, initialLoad } = this.props;

    if(!isUserSignedIn()) {
      return (
        <Signin handleSignIn={this.handleSignIn} />
      );
    } else if(initialLoad){
      return (
        <div className="center-align onboarding-set-up">
          <Loading />
        </div>
      );
    } else {
      return (
        <div className="center-align onboarding-set-up">
          <h3><span><img className="small-logo circle" src={smallLogo} alt="Graphite logo" /></span>Start your free beta trial</h3>
          <h5>Graphite Publishing is in early release. Beta testers will have access to the system at no charge.</h5>
          <div className="container sign-ip-form">
          {/*<button onClick={this.props.inviteInfo}>Do it</button>*/}
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
              <p>That's it. Seriously. We don't need anything else for you to start writing. If you still like us when we are out of beta, we'{/*'*/}ll talk money then 😉.</p>
              <button onClick={this.props.signUp} className="btn sign-up-button black">{loading ? <span className="animated-dots">Here we go</span> : <span>Get started</span>}</button>
            </div>
          </div>
        </div>
      );
    }
  }

}
