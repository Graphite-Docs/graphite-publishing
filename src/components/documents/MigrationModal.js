import React, { Component } from 'reactn';
import { Modal, Loader } from 'semantic-ui-react'
import { Header as SemanticHeader } from 'semantic-ui-react';

export default class MigrationModal extends Component {

  render() {
    return (
        <Modal 
        open={true}
        basic size='small'>
        <SemanticHeader icon='archive' content='Migrating your content' />
        <Modal.Content>
          <p>
            We're migrating your blog to the newest version fo Graphite Publishing. This should only take a few seconds.
            <Loader />
          </p>
        </Modal.Content>
      </Modal>
    );
  }
}
