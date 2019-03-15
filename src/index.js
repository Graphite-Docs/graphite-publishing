import React, { setGlobal } from 'reactn';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import './styles/style.css';
import 'semantic-ui-css/semantic.min.css';
import * as serviceWorker from './registerServiceWorker';
import { configure } from 'radiks';

setGlobal({
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
    initialLoad: true, 
    publications: [],
    multiBlog: false, 
    darkmode: false, 
    fullscreen: false,
    migrated: false
})

configure({
    apiServer: 'http://localhost:5000'
  });

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
