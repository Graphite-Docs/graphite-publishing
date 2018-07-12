import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {
  isSignInPending,
  isUserSignedIn,
  loadUserData,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
} from 'blockstack';
import {
  accountDetails,
  saveAccount,
  handleDrop,
  saveLogo,
  removeLogo,
  newAccountName,
  clearAccountName,
  handleNewDomain,
  removeDomain
} from './helpers/settings';
import {
  loadAccount,
  clearAccountData
} from './helpers/helpers';
import {
  handleAccountName,
  handleEmail,
  signUp,
  postMain,
  saveAccountSignUp,
} from './helpers/signUpForm';
import AppPage from './AppPage';
import Main from './documents/Main';
import Posts from './documents/Posts';
import Settings from './documents/Settings';
import PaymentSuccess from './documents/PaymentSuccess';
import Header from './Header';
import Onboarding from './documents/Onboarding';
import Payment from './documents/Payment';
const Config = require('Config');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: "",
      accountName: "",
      ownerBlockstackId: "",
      ownerEmail: "",
      accountId: "",
      signUpDate: "",
      trialPeriod: false,
      accountType: "",
      paymentDue: true,
      team: [],
      integrations: [],
      newDomain: "",
      accountDetails: {},
      newAccountName: "",
      alt: "",
      singleFile: {},
      onboardingComplete: false,
    }
  }

  componentWillMount() {
    if (isSignInPending()) {
      handlePendingSignIn().then((userData) => {
        window.location = window.location.origin;
      });
    }
    this.loadAccount = loadAccount.bind(this);
    this.accountDetails = accountDetails.bind(this);
    this.saveAccount = saveAccount.bind(this);
    this.handleDrop = handleDrop.bind(this);
    this.saveLogo = saveLogo.bind(this);
    this.removeLogo = removeLogo.bind(this);
    this.handleAccountName = handleAccountName.bind(this);
    this.handleEmail = handleEmail.bind(this);
    this.signUp = signUp.bind(this);
    this.postMain = postMain.bind(this);
    this.saveAccountSignUp = saveAccountSignUp.bind(this);
    this.clearAccountData = clearAccountData.bind(this);
    this.newAccountName = newAccountName.bind(this);
    this.clearAccountName = clearAccountName.bind(this);
    this.handleNewDomain = handleNewDomain.bind(this);
    this.removeDomain = removeDomain.bind(this);
    isUserSignedIn() ?  this.loadAccount() : loadUserData();
  }

  componentDidMount() {
    console.log('Build Date: ', Config.BUILD_DATE_STAMP)
    console.log('Build Time: ', Config.BUILD_TIME_STAMP)
  }

  handleSignIn(e) {
    e.preventDefault();
    redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  render() {
    const { onboardingComplete, paymentDue, logo, accountName, ownerEmail, integrations, team, newDomain, ownerBlockstackId } = this.state;
    if(onboardingComplete && !paymentDue) {
      return (
        <div>
        <BrowserRouter>
            <div className="main-container">
              <Header
                handleSignOut={this.handleSignOut}
                onboardingComplete={onboardingComplete}
                logo={logo}
                accountName={accountName}
               />
              <Route exact path="/" component={AppPage} />
              <Route exact path="/documents" component={Main} />
              <Route exact path="/posts" component={Posts} />
              <Route exact path="/settings"
                render={(props) =>
                  <Settings {...props}
                  clearAccountData={this.clearAccountData}
                  handleDrop={this.handleDrop}
                  removeLogo={this.removeLogo}
                  newAccountName={this.newAccountName}
                  clearAccountName={this.clearAccountName}
                  accountDetails={this.accountDetails}
                  handleNewDomain={this.handleNewDomain}
                  removeDomain={this.removeDomain}
                  integrations={integrations}
                  team={team}
                  accountName={accountName}
                  logo={logo}
                  newDomain={newDomain}
                  ownerBlockstackId={ownerBlockstackId}
                  />}
              />
              <Route exact path="/success" component={PaymentSuccess} />
            </div>
          </BrowserRouter>
        </div>
      );
    } else if(paymentDue && onboardingComplete) {
      return (
        <div>
          <Header
            handleSignOut={this.handleSignOut}
            onboardingComplete={onboardingComplete}
            logo={logo}
            accountName={accountName}
          />
          <Payment />
        </div>
      );
    } else {
      return (
        <div>
          <Header
            handleSignOut={this.handleSignOut}
            onboardingComplete={onboardingComplete}
            logo={logo}
            accountName={accountName}
          />
          <Onboarding
            signUpAccountName={this.handleAccountName}
            signUpEmail={this.handleEmail}
            signUp={this.signUp}
            accountName={accountName}
            ownerEmail={ownerEmail}
          />
        </div>
      );
    }
  }
}
