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
  removeDomain,
  loadDomain,
  clearDomainName,
} from './helpers/settings';
import {
  loadAccount,
  clearAccountData,
  copyLink,
  getDate
} from './helpers/helpers';
import {
  newPost,
  savePostsCollection,
  saveNewSinglePost,
  loadMyPublishedPosts,
  loadPublishedPosts,
  savePostCollectionToTeam,
  saveSinglePostToTeam,
  deleteAllPosts,
  savePublicPostsCollection,
  saveNewSinglePublicPost,
  loadPublicPostsCollection,
  loadPostToDelete,
  deletePost,
  saveUpdatePostCollection,
  saveUpdatedPublicPostsCollection,
  filterList
} from './helpers/posts';
import {
  loadPost,
  loadSingle,
  handleTitleChange,
  handleSavePost,
  handleContentChange,
  handlePostURL,
  handleFeaturedDrop,
  onSwitchClick,
  loadSinglePublic
} from './helpers/singlepost';
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
  loadDb
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
  sendInvite,
  clearNewTeammate
} from './helpers/team';
import {
  saveToTeam,
  checkForLatest,
  loadBasicInviteInfo,
  setLoadedFile
} from './helpers/teamsync'
import {
  handleCodeChanges,
  saveMainHtml,
  loadMainHtml,
  handlePostCodeChanges,
  savePostHtml,
  loadPostHtml,
  loadMainHtmlPublic,
  loadPostHtmlPublic,
  loadFile,
  setTheme,
  setPostTheme
} from './helpers/design';
import Posts from './documents/Posts';
import Settings from './documents/Settings';
import PaymentSuccess from './documents/PaymentSuccess';
import Header from './Header';
import Onboarding from './documents/Onboarding';
import Payment from './documents/Payment';
import Invites from './documents/Invites';
import Acceptances from './documents/Acceptances';
import Design from './documents/Design';
import Publication from './Publication';
import SinglePost from './documents/SinglePost';
import SinglePublic from './documents/SinglePublic';
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
      sendToInviter: {},
      pageHTML: "",
      checking: false,
      mainPage: {},
      postHTML: "",
      postPage: {},
      posts: [],
      myPosts: [],
      singlePost: {},
      filteredPosts: [],
      appliedFilter: false,
      tempDocId: "",
      content: "",
      title: "",
      unsavedChanges: false,
      createdDate: "",
      loading: false,
      logging: true,
      confirmationDone: false,
      status: "Draft",
      redirect: false,
      index: 0,
      postLoadingDone: false,
      featuredImg: "",
      postURL: "",
      postLoading: false,
      publishPost: false,
      publicPosts: [],
      link: "",
      initialLoad: true
    }
  }

  componentDidMount() {
    if(window.location.pathname.includes('/sites/')) {
      this.setState({onboardingComplete: true, paymentDue: false });
    }
    if (isSignInPending()) {
      handlePendingSignIn().then((userData) => {
        window.location = window.location.origin;
      });
    }

    //Settings
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

    //Invite and Acceptance
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
    this.loadDomain = loadDomain.bind(this);
    this.clearDomainName = clearDomainName.bind(this);
    this.clearNewTeammate = clearNewTeammate.bind(this);

    //Design
    this.handleCodeChanges = handleCodeChanges.bind(this);
    this.saveMainHtml = saveMainHtml.bind(this);
    this.loadMainHtml = loadMainHtml.bind(this);
    this.loadDb = loadDb.bind(this);
    this.getDate = getDate.bind(this);
    this.handlePostCodeChanges = handlePostCodeChanges.bind(this);
    this.savePostHtml = savePostHtml.bind(this);
    this.loadPostHtml = loadPostHtml.bind(this);
    this.loadPostHtmlPublic = loadPostHtmlPublic.bind(this);
    this.loadFile = loadFile.bind(this);
    this.setTheme = setTheme.bind(this);
    this.setPostTheme = setPostTheme.bind(this);

    //Posts
    this.newPost = newPost.bind(this);
    this.savePostsCollection = savePostsCollection.bind(this);
    this.saveNewSinglePost = saveNewSinglePost.bind(this);
    this.loadMyPublishedPosts = loadMyPublishedPosts.bind(this);
    this.loadPublishedPosts = loadPublishedPosts.bind(this);
    this.loadPost = loadPost.bind(this);
    this.loadSingle = loadSingle.bind(this);
    this.savePostCollectionToTeam = savePostCollectionToTeam.bind(this);
    this.deleteAllPosts = deleteAllPosts.bind(this);
    this.loadPublicPostsCollection = loadPublicPostsCollection.bind(this);
    this.loadMainHtmlPublic = loadMainHtmlPublic.bind(this);
    this.loadPostToDelete = loadPostToDelete.bind(this);
    this.deletePost = deletePost.bind(this);
    this.saveUpdatePostCollection = saveUpdatePostCollection.bind(this);
    this.saveUpdatedPublicPostsCollection = saveUpdatedPublicPostsCollection.bind(this);
    this.filterList = filterList.bind(this);

    //Single Post
    this.handleTitleChange = handleTitleChange.bind(this);
    this.handleSavePost = handleSavePost.bind(this);
    this.handleContentChange = handleContentChange.bind(this);
    this.saveSinglePostToTeam = saveSinglePostToTeam.bind(this);
    this.handlePostURL = handlePostURL.bind(this);
    this.handleFeaturedDrop = handleFeaturedDrop.bind(this);
    this.onSwitchClick = onSwitchClick.bind(this);
    this.savePublicPostsCollection = savePublicPostsCollection.bind(this);
    this.saveNewSinglePublicPost = saveNewSinglePublicPost.bind(this);
    this.loadSinglePublic = loadSinglePublic.bind(this);

    isUserSignedIn() ?  this.loadAccount() : loadUserData();

    console.log('Build Date: ', Config.BUILD_DATE_STAMP)
    console.log('Build Time: ', Config.BUILD_TIME_STAMP)
  }

  handleSignIn(e) {
    const origin = window.location.origin;
    e.preventDefault();
    redirectToSignIn(origin, origin + '/manifest.json', ['store_write', 'publish_data'])
  }

  handleSignOut(e) {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  render() {
    const { pageHTML, inviter, inviterKey, inviteAccepted, newTeammateId, newTeammateName, newTeammateRole, newTeammateEmail, newTeammateBlockstackId, onboardingComplete,
            paymentDue, logo, accountName, ownerEmail, integrations, team, newDomain, ownerBlockstackId, accountId, editing, posts, filteredPosts, appliedFilter, tempDocId,
            myPosts, title, content, unsavedChanges, loading, confirmationDone, postLoadingDone, featuredImg, postURL, postLoading, publishPost, status, publicPosts,
            postHTML, postPage, initialLoad } = this.state;
    if(onboardingComplete && !paymentDue) {
      return (
        <div>
        <BrowserRouter>
            <div className="main-container">
              <Route exact path="/" render={(props) =>
                <Posts {...props}
                  newPost={this.newPost}
                  loadMyPublishedPosts={this.loadMyPublishedPosts}
                  handleSignOut={this.handleSignOut}
                  deleteAllPosts={this.deleteAllPosts}
                  clearAccountData={this.clearAccountData}
                  filterList={filterList}
                  loadPostToDelete={this.loadPostToDelete}
                  posts={posts}
                  filteredPosts={filteredPosts}
                  appliedFilter={appliedFilter}
                  tempDocId={tempDocId}
                  myPosts={myPosts}
                  onboardingComplete={onboardingComplete}
                  logo={logo}
                  accountName={accountName}
                  postLoadingDone={postLoadingDone}
                  initialLoad={initialLoad}
                  paymentDue={paymentDue}
                />}
              />
              <Route exact path="/posts"  render={(props) =>
                <Posts {...props}
                  newPost={this.newPost}
                  loadMyPublishedPosts={this.loadMyPublishedPosts}
                  handleSignOut={this.handleSignOut}
                  deleteAllPosts={this.deleteAllPosts}
                  clearAccountData={this.clearAccountData}
                  loadPostToDelete={this.loadPostToDelete}
                  filterList={this.filterList}
                  posts={posts}
                  filteredPosts={filteredPosts}
                  appliedFilter={appliedFilter}
                  tempDocId={tempDocId}
                  myPosts={myPosts}
                  onboardingComplete={onboardingComplete}
                  logo={logo}
                  accountName={accountName}
                  initialLoad={initialLoad}
                  paymentDue={paymentDue}
                />}
              />
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
                  clearDomainName={this.clearDomainName}
                  clearNewTeammate={this.clearNewTeammate}
                  handleSignOut={this.handleSignOut}
                  initialLoad={initialLoad}
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
                  onboardingComplete={onboardingComplete}
                  paymentDue={paymentDue}
                  />}
              />
              <Route exact path="/design" render={(props) =>
                <Design {...props}
                  handleCodeChanges={this.handleCodeChanges}
                  handlePostCodeChanges={this.handlePostCodeChanges}
                  saveMainHtml={this.saveMainHtml}
                  loadMainHtml={this.loadMainHtml}
                  handleSignOut={this.handleSignOut}
                  loadPublicPostsCollection={this.loadPublicPostsCollection}
                  loadPostHtml={this.loadPostHtml}
                  savePostHtml={this.savePostHtml}
                  setTheme={this.setTheme}
                  setPostTheme={this.setPostTheme}
                  initialLoad={initialLoad}
                  pageHTML={pageHTML}
                  postHTML = {postHTML}
                  postPage={postPage}
                  loading={loading}
                  team={team}
                  onboardingComplete={onboardingComplete}
                  paymentDue={paymentDue}
                  logo={logo}
                  accountName={accountName}
                  editing={editing}
                />}
              />
              <Route exact path="/acceptances" render={(props) =>
                <Acceptances {...props}
                  confirmAcceptance={this.confirmAcceptance}
                  loading={loading}
                  initialLoad={initialLoad}
                  confirmationDone={confirmationDone}
                  onboardingComplete={onboardingComplete}
                  paymentDue={paymentDue}
                />}
              />
              <Route exact path="/sites/:id" render={(props) =>
                <Publication
                  accountId={accountId}
                  pageHTML={pageHTML}
                  publicPosts={publicPosts}
                  accountName={accountName}
                  initialLoad={initialLoad}
                  handleContentChange={this.handleContentChange}
                  loadPublicPostsCollection={this.loadPublicPostsCollection}
                  loadMainHtmlPublic={this.loadMainHtmlPublic}
                />}
              />
              <Route exact path="/sites/:id/public/:id" render={(props) =>
                <SinglePublic
                  loadSinglePublic={this.loadSinglePublic}
                  loadPostHtmlPublic={this.loadPostHtmlPublic}
                  initialLoad={initialLoad}
                  loading={loading}
                />}
              />
              <Route exact path="/post/:id" render={(props) =>
                <SinglePost {...props}
                  loadPost={this.loadPost}
                  loadMyPublishedPosts={this.loadMyPublishedPosts}
                  handleTitleChange={this.handleTitleChange}
                  handleSavePost={this.handleSavePost}
                  handleContentChange={this.handleContentChange}
                  handlePostURL={this.handlePostURL}
                  handleFeaturedDrop={this.handleFeaturedDrop}
                  onSwitchClick={this.onSwitchClick}
                  publishPost={publishPost}
                  title={title}
                  content={content}
                  unsavedChanges={unsavedChanges}
                  loading={loading}
                  featuredImg={featuredImg}
                  postURL={postURL}
                  postLoading={postLoading}
                  status={status}
                  editing={editing}
                  onboardingComplete={onboardingComplete}
                  paymentDue={paymentDue}
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
            clearAccountData={this.clearAccountData}
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
            clearAccountData={this.clearAccountData}
            onboardingComplete={onboardingComplete}
            logo={logo}
            accountName={accountName}
          />
          <Invites
            acceptInvite={this.acceptInvite}
            loadInvite={this.loadInvite}
            accountName={accountName}
            inviter={inviter}
            inviterKey={inviterKey}
            loading={loading}
          />
        </div>
      )
    }else {
      return (
        <div>
          <Header
            handleSignOut={this.handleSignOut}
            clearAccountData={this.clearAccountData}
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
            loading={loading}
            initialLoad={initialLoad}
          />
        </div>
      );
    }
  }
}
