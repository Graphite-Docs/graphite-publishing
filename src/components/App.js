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
  clearAccountData,
  copyLink
} from './helpers/helpers';
import {
  loadInvite,
  loadInviteStatus,
  acceptInvite,
  saveToInviter,
  sendToInviter,
  sendAcceptEmail,
  saveBasicInviteInfo,
  inviteInfo
} from './helpers/invite';
import {
  confirmAcceptance
} from './helpers/acceptance';
import {
  handleAccountName,
  handleEmail,
  signUp,
  postMain,
  saveAccountSignUp,
} from './helpers/signUpForm';
import {
  handleTeammateId,
  handleTeammateName,
  handleTeammateRole,
  handleTeammateEmail,
  addTeammate,
  teammateToDelete,
  updateTeammate,
  updateRole,
  saveInvite,
  sendInvite
} from './helpers/team';
import {
  saveToTeam,
  checkForLatest,
  loadBasicInviteInfo,
  setLoadedFile
} from './helpers/teamsync'
import AppPage from './AppPage';
import Main from './documents/Main';
import Posts from './documents/Posts';
import Settings from './documents/Settings';
import PaymentSuccess from './documents/PaymentSuccess';
import Header from './Header';
import Onboarding from './documents/Onboarding';
import Payment from './documents/Payment';
import Invites from './documents/Invites';
import Acceptances from './documents/Acceptances';
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
      editing: false,
      pubKey: "",
      teammateIndex: "",
      newTeammateId: "",
      newTeammateName: "",
      newTeammateRole: "",
      newTeammateEmail: "",
      newTeammateKey: "",
      newTeammateBlockstackId: "",
      id: "",
      teamMateMostRecent: "",
      count: 0,
      inviteDetails: {},
      inviterKey: "",
      inviteDate: 0,
      inviter: "" ,
      inviteAccepted: false,
      inviteeBlockstackId: "",
      inviteeEmail: "",
      inviteeName: "",
      inviteeKey: "",
      inviteeRole: "",
      inviterEmail: "",
      inviteeId: "",
      sendToInviter: {}
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
    this.handleTeammateId = handleTeammateId.bind(this);
    this.handleTeammateName = handleTeammateName.bind(this);
    this.handleTeammateRole = handleTeammateRole.bind(this);
    this.handleTeammateEmail = handleTeammateEmail.bind(this);
    this.addTeammate = addTeammate.bind(this);
    this.teammateToDelete = teammateToDelete.bind(this);
    this.updateTeammate = updateTeammate.bind(this);
    this.updateRole = updateRole.bind(this);
    this.saveToTeam = saveToTeam.bind(this);
    this.checkForLatest = checkForLatest.bind(this);
    this.saveInvite = saveInvite.bind(this);
    this.sendInvite = sendInvite.bind(this);
    this.loadInvite = loadInvite.bind(this);
    this.copyLink = copyLink.bind(this);
    this.loadInviteStatus = loadInviteStatus.bind(this);
    this.acceptInvite = acceptInvite.bind(this);
    this.saveToInviter = saveToInviter.bind(this);
    this.sendToInviter = sendToInviter.bind(this);
    this.sendAcceptEmail = sendAcceptEmail.bind(this);
    this.confirmAcceptance = confirmAcceptance.bind(this);
    this.saveBasicInviteInfo = saveBasicInviteInfo.bind(this);
    this.loadBasicInviteInfo = loadBasicInviteInfo.bind(this);
    this.inviteInfo = inviteInfo.bind(this);
    this.setLoadedFile = setLoadedFile.bind(this);
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
    const { inviter, inviterKey, inviteAccepted, newTeammateId, newTeammateName, newTeammateRole, newTeammateEmail, newTeammateBlockstackId, onboardingComplete, paymentDue, logo, accountName, ownerEmail, integrations, team, newDomain, ownerBlockstackId, accountId, editing } = this.state;

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
                  addTeammate={this.addTeammate}
                  handleTeammateId={this.handleTeammateId}
                  handleTeammateName={this.handleTeammateName}
                  handleTeammateRole={this.handleTeammateRole}
                  handleTeammateEmail={this.handleTeammateEmail}
                  teammateToDelete={this.teammateToDelete}
                  updateTeammate={this.updateTeammate}
                  copyLink={this.copyLink}
                  newTeammateId={newTeammateId}
                  newTeammateName={newTeammateName}
                  newTeammateRole={newTeammateRole}
                  newTeammateEmail={newTeammateEmail}
                  newTeammateBlockstackId={newTeammateBlockstackId}
                  integrations={integrations}
                  team={team}
                  accountName={accountName}
                  logo={logo}
                  newDomain={newDomain}
                  ownerBlockstackId={ownerBlockstackId}
                  accountId={accountId}
                  editing={editing}
                  />}
              />
              <Route exact path="/acceptances" render={(props) =>
                <Acceptances {...props}
                  confirmAcceptance={this.confirmAcceptance}
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
    } else if(inviterKey && inviteAccepted === false) {
      return (
        <div>
          <Header
            handleSignOut={this.handleSignOut}
            onboardingComplete={onboardingComplete}
            logo={logo}
            accountName={accountName}
          />
          <Invites
            accountName={accountName}
            inviter={inviter}
            inviterKey={inviterKey}
            acceptInvite={this.acceptInvite}
          />
        </div>
      )
    }else {
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
            inviteInfo={this.inviteInfo}
            accountName={accountName}
            ownerEmail={ownerEmail}
          />
        </div>
      );
    }
  }
}
