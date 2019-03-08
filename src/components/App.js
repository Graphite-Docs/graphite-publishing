import React, { Component } from 'reactn';
import { BrowserRouter, Route } from 'react-router-dom';
import '../styles/style.css';
import {
  isSignInPending,
  isUserSignedIn,
  loadUserData,
  redirectToSignIn,
  handlePendingSignIn,
  signUserOut,
} from 'blockstack';
import {
  loadAccount
} from './helpers/helpers';
import Posts from './documents/Posts';
import Settings from './documents/Settings';
import PaymentSuccess from './documents/PaymentSuccess';
import Growl from './Growl';
import Invites from './documents/Invites';
import Acceptances from './documents/Acceptances';
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

    isUserSignedIn() ?  loadAccount() : loadUserData();

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
              <Route exact path="/settings"
                render={(props) =>
                  <Settings {...props}
                  
                  />}
              />
              <Route exact path="/design" render={(props) =>
                <Design {...props}
                  
                />}
              />
              <Route exact path="/acceptances" render={(props) =>
                <Acceptances {...props}
                  
                />}
              />
              <Route exact path="/sites/:id" render={(props) =>
                <Publication
                  
                />}
              />
              <Route exact path="/sites/:id/public/:id" render={(props) =>
                <SinglePublic
                  
                />}
              />
              <Route exact path="/success" component={PaymentSuccess} />
            </div>
          </BrowserRouter>
        </div>
      );
  }
}
