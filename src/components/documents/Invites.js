import React, { Component } from "reactn";
import Loading from '../Loading';
import smallLogo from '../../images/graphite-mark.png';
import { Container, Button } from 'semantic-ui-react';

export default class Invites extends Component {

  componentDidMount() {
  }

  render() {
    const { loading } = this.global;
      if(loading) {
        return (
          <Loading />
        )
      } else {
        return (
          <Container style={{textAlign: "center", paddingTop: "170px"}}>
            <h1><span><img className="small-logo circle" src={smallLogo} alt="Graphite logo" /></span>Welcome to Graphite Publishing!</h1>
            <h2 style={{margin: "50px"}}>You've been invited to the TEAMNAME team. Let's get your account set up.</h2>
            {/*<button onClick={this.props.inviteInfo}>Do it</button>*/}
            
            <Button style={{marginTop: "25px"}} secondary>{loading ? <span className="animated-dots">Here we go</span> : <span>Accept Invite</span>}</Button>
          </Container>
        );
      }
    }
}
