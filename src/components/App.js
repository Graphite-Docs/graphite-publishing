import React, { Component } from 'reactn';
import { BrowserRouter, Route } from 'react-router-dom';
import '../styles/style.css';
import {
  isSignInPending,
  isUserSignedIn,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
} from 'blockstack';
import {
  loadAccount
} from './helpers/helpers';
import Posts from './documents/Posts';
import Settings from './documents/Settings';
import Growl from './Growl';
import Invites from './documents/Invites';
import Design from './documents/Design';
import Publication from './Publication';
import SinglePost from './documents/SinglePost';
import SinglePublic from './documents/SinglePublic';
import { User } from 'radiks';
const Config = require('Config');

export default class App extends Component {

  async componentDidMount() {
    if(window.location.pathname.includes('/sites/')) {
      this.setState({onboardingComplete: true, paymentDue: false });
    }
    if (isSignInPending()) {
      await handlePendingSignIn().then(async (userData) => {
        await User.createWithCurrentUser();
        console.log("created")
        window.location = window.location.origin;
      });
    }

    isUserSignedIn() ?  loadAccount() : console.log("not signed in");

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
      return (
        <div>
        <Growl />
        <BrowserRouter>
            <div className="main-container">
              <Route exact path='/' component={Posts} />
              <Route exact path='/posts' component={Posts} />
              <Route exact path="/posts/:id" component={SinglePost} />
              <Route exact path='/invites/:id' component={Invites} />
              <Route exact path='/settings' component={Settings} />
              <Route exact path='/design' component={Design} />
              <Route exact path='/sites/:id' component={Publication} />
              <Route exact path='/sites/:id/public/:id' component={SinglePublic} />
            </div>
          </BrowserRouter>
        </div>
      );
  }
}
