import React, { Component } from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

export default class Loading extends Component {

  render() {
    return (
    <Segment style={{height: "100vh", postion: "fixed", top: "0", zIndex: "999"}}>
      <Dimmer active>
        <Loader size='massive'>Loading</Loader>
      </Dimmer>
    </Segment>
    );
  }
}
