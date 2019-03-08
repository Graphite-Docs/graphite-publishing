import React, { Component } from "reactn";
import {
  isUserSignedIn,
} from 'blockstack';
import Signin from '../Signin';
import Loading from '../Loading';
import smallLogo from '../../images/graphite-mark.png';
import { Container, Input, Grid, Popup, Button } from 'semantic-ui-react';

const signUp = require('../helpers/signUpForm');

export default class Onboarding extends Component {

  componentDidMount() {
    window.$('.tooltipped').tooltip();
  }

  render() {
    window.$('.tooltipped').tooltip();
    const { loading, initialLoad } = this.global;

    if(!isUserSignedIn()) {
      return (
        <Signin handleSignIn={this.handleSignIn} />
      );
    } else if(initialLoad){
      return (
        <div >
          <Loading />
        </div>
      );
    } else {
      return (
        <Container style={{textAlign: "center", paddingTop: "100px"}}>
          <h1><span><img className="small-logo circle" src={smallLogo} alt="Graphite logo" /></span>Ready to start writing?</h1>
          <h2 style={{margin: "50px"}}>Let's get your account set up!</h2>
          {/*<button onClick={this.props.inviteInfo}>Do it</button>*/}
          <h5 className="sign-up-h5">Account Information</h5>
          <Grid stackable columns={2}>
              <Grid.Column>
                  <Input label="Account Name" onChange={signUp.handleAccountName} placeholder="New York Times" id="account_name" type="text" className="validate" />
              </Grid.Column>
              <Grid.Column>
                
                <Popup trigger={<Input label="Email Address" onChange={signUp.handleEmail} placeholder="name@email.com" id="email" type="text" className="validate" />} content='For reminders and team invites only.' />
              </Grid.Column>
          </Grid>
          <Button style={{marginTop: "25px"}} onClick={signUp.signUp} secondary>{loading ? <span className="animated-dots">Here we go</span> : <span>Get started</span>}</Button>
        </Container>
      );
    }
  }

}
