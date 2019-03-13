import React, { Component } from 'reactn';
import Dropzone from 'react-dropzone';
import { Grid, Image, Container, Table, Button, Icon, Modal, Input } from 'semantic-ui-react'
import Onboarding from './Onboarding';
import Header from '../Header';
const settings = require('../helpers/settings');

export default class Settings extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => {
    this.setState({ modalOpen: false })
    settings.clearAccountName();
  }

  handleUpdate = () => {
    this.setState({ modalOpen: false })
    settings.accountDetails();
  }

  render() {
    const { onboardingComplete, logo, accountName, ownerBlockstackId, newDomain } = this.global;
    let originalDomain;
    if(accountName !== undefined && accountName !== "") {
      originalDomain = window.location.origin + "/sites/" + ownerBlockstackId;
    } else {
      originalDomain = window.location.origin + "/sites/";
    }
    // let teamList;

    // team === undefined ? teamList = [] : teamList = team;
 
    const dropzoneStyle = {};
    if(onboardingComplete) {
      return (
        <div>
        <Header />
        <Container>
          <div className="center-align">
            <Grid divided='vertically' stackable style={{marginTop: "60px"}}>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <div style={{maxWidth: "85%", margin: "auto", textAlign: "center"}}>
                  <h3>Logo</h3>
                { logo !== "" && logo !== undefined ?
                  <div>
                    <Image className="settings-logo" src={logo} alt="Account Avatar" /> <br />
                    <Dropzone
                      style={dropzoneStyle}
                      onDrop={ settings.handleDrop }
                      accept="image/png,image/jpeg,image/jpg,image/tiff,image/gif"
                      multiple={ false }
                      onDropRejected={ this.handleDropRejected }>
                      <button className="add-logo-btn btn black">Change Logo</button>
                    </Dropzone>
                    <Button secondary onClick={settings.removeLogo} className="btn-flat">Remove</Button>
                  </div>
                  :
                  <Dropzone
                    style={dropzoneStyle}
                    onDrop={ settings.handleDrop }
                    accept="image/png,image/jpeg,image/jpg,image/tiff,image/gif"
                    multiple={ false }
                    onDropRejected={ this.handleDropRejected }>
                    <Button secondary>Add Logo</Button>
                  </Dropzone>
                }
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div style={{maxWidth: "85%", margin: "auto", textAlign: "center"}}>
                    <h3>Account Name</h3>
                    <h6 className="add-logo-btn">{accountName}<span className="edit-icon"><a className="modal-trigger">
                    <Modal
                      trigger={<Icon onClick={this.handleOpen} name='edit' />}
                      open={this.state.modalOpen}
                      onClose={this.handleClose}
                      basic
                      size='small'
                    >
                      <Modal.Content>
                        <h3>Edit Account Name</h3>
                        <Input onChange={settings.newAccountName} placeholder="New York Times" />
                      </Modal.Content>
                      <Modal.Actions>
                        <Button onClick={this.handleClose}>
                          Cancel
                        </Button>
                        <Button color='green' onClick={this.handleUpdate}>
                          Save
                        </Button>
                      </Modal.Actions>
                    </Modal>
                    </a></span></h6>
                    <h3>Account Domain</h3>
                <p>{newDomain !=="" && newDomain !==undefined ? <a href={newDomain}>{newDomain}</a> : <a href={originalDomain}>{originalDomain}</a>}</p>
                <p>Custom domains and subdomains coming soon!</p>
                {/* newDomain ? <p>You have a custom domain <Button secondary onClick={this.props.removeDomain} className="btn-flat">Remove</Button></p> : <Button secondary>Request Custom Domain</Button> */}
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid divided='vertically' style={{marginTop: "60px"}}>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <div className="col s12 account-settings-section">
                  <h3 className="left">Your Team {/*(1+1 === 2) ? <button className="btn-floating btn-small black modal-trigger" data-target="modal3"><i className="material-icons white-text">add</i></button> : <span className="note"><a className="note-link" onClick={() => window.Materialize.toast('Your main account admin can add teammates.', 4000)}>?</a></span>*/}</h3>

                  <Table className="bordered">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Role {/*<span><a className="info modal-trigger" href="#roleInfoModal"><i className="material-icons">info_outline</i></a></span>*/}</Table.HeaderCell>
                        {(1+1 === 2) ? <Table.HeaderCell></Table.HeaderCell> : <div />}
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {/*teamList.slice(0).map(mate => {
                            return (
                              <tr key={mate.name}>

                              <td id="shareLinkModal" className="modal">
                                <div className="modal-content">
                                  <h4>Share Invite Link</h4>
                                  <input type="text" defaultValue={mate.inviteLink} id="copy" /><span><a onClick={this.props.copyLink}><i className="material-icons tiny">content_copy</i></a></span>
                                </div>
                              </td>

                                {
                                  mate.invitedAccepted === false ?
                                  <td><a data-target="modal4" className="modal-trigger">{mate.name}</a><span><a data-target="shareLinkModal" className="modal-trigger"><i className="material-icons tiny link">link</i></a></span></td>
                                  :
                                  <td><a data-target="modal4" className="modal-trigger">{mate.name}</a></td>
                                }
                                <td>{mate.blockstackId}</td>
                                <td>{mate.role.charAt(0).toUpperCase() + mate.role.slice(1)}</td>
                                {(1+1 === 2 && mate.role !== "Owner") ? <td><a onClick={() => this.props.teammateToDelete(mate.id)} ><i className="material-icons red-text">delete</i></a></td> : <td></td>}
                                <td id="modal4" className="modal center-align modal-fixed-footer">
                                  <div className="modal-content">
                                    <h4>Update Role for {mate.name}</h4>
                                    <div className="input-field col s12">
                                      <select defaultValue="select" onChange={this.props.handleTeammateRole}>
                                        <option value="select" disabled>Select Role</option>
                                        <option value="admin">Administrator</option>
                                        <option value="editor">Editor</option>
                                        <option value="author">Author</option>
                                      </select>
                                      <label>Role</label>
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                    <a className="modal-close waves-effect waves-green btn-flat">Cancel</a>
                                    <a onClick={() => this.props.updateTeammate(mate.id)} className="modal-close waves-effect waves-green btn black">Update</a>
                                  </div>
                                </td>
                              </tr>
                            )
                          })
                        */}
                        <Table.Row>
                          <Table.Cell>Team publications coming soon!</Table.Cell>
                          <Table.Cell></Table.Cell>
                          <Table.Cell></Table.Cell>
                        </Table.Row>
                    </Table.Body>
                  </Table>
                </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <div className="row account-settings">
              {/*<button onClick={this.props.clearAccountData}>Do it</button>*/}
              
              <div className="col s12">
              
              {/* Integrations */}
                  <div className="col s12 account-settings-section">
                    <div className="row">
                    <h3 className="left">Integrations</h3>
                    <Table className="permissions">
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Integration Name</Table.HeaderCell>
                          <Table.HeaderCell>Date Added</Table.HeaderCell>
                          <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                      <Table.Row >
                        <Table.Cell>Integrations coming soon!</Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                      {/*integrationsList.slice(0).reverse().map(int => {
                          return (
                            <Table.Row key={int.id}>
                              <Table.Cell>Team publications coming soon!</Table.Cell>
                              <Table.Cell>{int.name}</Table.Cell>
                              <Table.Cell>{int.added}</Table.Cell>
                              <Table.Cell><a onClick={() => this.setState({ deleteIntegration: int.id, deleteIntName: int.name, deleteIntegrationModal: "" })} ><i className="material-icons red-text">delete</i></a></Table.Cell>
                            </Table.Row>
                          )
                        })
                      */}
                      </Table.Body>
                    </Table>

                    </div>
                  </div>
                  {/* End Integrations */}


                  {/*Role Info Modal */}
                  <div id="roleInfoModal" className="modal">
                    <div className="modal-content">
                      <h4>Modal Header</h4>
                      <p>A bunch of text</p>
                    </div>
                    <div className="modal-footer">
                      <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
                    </div>
                  </div>
                  {/*End Role Info Modal */}

                  {/*Integrations Modal*/}
                  <div id="integrationsModal" className="modal">
                    <div className="modal-content">
                      <h4>Integrations</h4>
                      <p>Connect your publication or learn about available integrations.</p>
                      <h5>Comming Soon!</h5>
                    </div>
                    <div className="modal-footer">
                      <a className="modal-close waves-effect waves-green btn-flat">Done</a>
                    </div>
                  </div>

                  {/*End Integrations Modal*/}
              </div>
            </div>
          </div>
        </Container>
        </div>
      );
    } else {
      return (
        <Onboarding />
      )
    }

  }
}
