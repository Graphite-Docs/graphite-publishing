import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Onboarding from './Onboarding';
import Header from '../Header';

export default class Settings extends Component {

  componentDidMount() {
    window.$('.modal').modal();
    window.$('.tooltipped').tooltip();
    window.$('select').formSelect();
  }

  render() {
    const { onboardingComplete, paymentDue, logo, accountName, ownerBlockstackId, integrations, newDomain, newTeammateName, newTeammateRole, newTeammateEmail } = this.props;
    let originalDomain;
    if(accountName !== undefined && accountName !== "") {
      originalDomain = window.location.origin + "/sites/" + ownerBlockstackId;
    } else {
      originalDomain = window.location.origin + "/sites/";
    }
    // let teamList;
    let integrationsList
    // team === undefined ? teamList = [] : teamList = team;
    integrations === undefined ? integrationsList = [] : integrationsList = integrations;
    const dropzoneStyle = {};
    if(onboardingComplete && !paymentDue) {
      return (
        <div>
        <Header
          handleSignOut={this.props.handleSignOut}
          clearAccountData={this.props.clearAccountData}
          onboardingComplete={onboardingComplete}
          logo={logo}
          accountName={accountName}
         />
        <div className="container">
          <div className="center-align">
            <div className="row account-settings">
              {/*<button onClick={this.props.clearAccountData}>Do it</button>*/}
              <div className="col s12">
                <h5>Logo</h5>
                { logo !== "" && logo !== undefined ?
                  <div>
                    <img className="settings-logo" src={logo} alt="Account Avatar" /> <br />
                    <Dropzone
                      style={dropzoneStyle}
                      onDrop={ this.props.handleDrop }
                      accept="image/png,image/jpeg,image/jpg,image/tiff,image/gif"
                      multiple={ false }
                      onDropRejected={ this.handleDropRejected }>
                      <button className="add-logo-btn btn black">Change Logo</button>
                    </Dropzone>
                    <button onClick={this.props.removeLogo} className="btn-flat">Remove</button>
                  </div>
                  :
                  <Dropzone
                    style={dropzoneStyle}
                    onDrop={ this.props.handleDrop }
                    accept="image/png,image/jpeg,image/jpg,image/tiff,image/gif"
                    multiple={ false }
                    onDropRejected={ this.handleDropRejected }>
                    <button className="add-logo-btn btn black">Add Logo</button>
                  </Dropzone>
                }
              </div>
              <div className="col s12 m6">
                <h5>Account Name</h5>
                <h6 className="add-logo-btn">{accountName}<span className="edit-icon"><a className="modal-trigger" data-target="modal2"><i className="material-icons tiny">edit</i></a></span></h6>
              </div>
              <div className="col s12 m6 domain">
                <h5>Account Domain</h5>
                <p>{newDomain !=="" && newDomain !==undefined ? <a href={newDomain}>{newDomain}</a> : <a href={originalDomain}>{originalDomain}</a>}</p>
                {newDomain ? <p>You have a custom domain <button onClick={this.props.removeDomain} className="btn-flat">Remove</button></p> : <button data-target="modal1" className="modal-trigger btn black">Request Custom Domain</button>}
              </div>
              <div className="col s12">
              <div className="col s12 account-settings-section">
                <h5 className="left">Your Team {/*(1+1 === 2) ? <button className="btn-floating btn-small black modal-trigger" data-target="modal3"><i className="material-icons white-text">add</i></button> : <span className="note"><a className="note-link" onClick={() => window.Materialize.toast('Your main account admin can add teammates.', 4000)}>?</a></span>*/}</h5>

                <table className="bordered">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>ID</th>
                      <th>Role {/*<span><a className="info modal-trigger" href="#roleInfoModal"><i className="material-icons">info_outline</i></a></span>*/}</th>
                      {(1+1 === 2) ? <th></th> : <div />}
                    </tr>
                  </thead>
                  <tbody>
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
                      <tr>
                        <td>Team publications coming soon!</td>
                        <td></td>
                        <td></td>
                      </tr>
                  </tbody>
                </table>
              </div>
              {/* Integrations */}
                  <div className="col s12 account-settings-section">
                    <div className="row">
                    <h5 className="left">Integrations <button className="modal-trigger add-teammate-button btn-floating btn-small black" href="#integrationsModal"><i className="material-icons white-text">add</i></button></h5>
                    <table className="permissions">
                      <thead>
                        <tr>
                          <th>Integration Name</th>
                          <th>Date Added</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                      {integrationsList.slice(0).reverse().map(int => {
                          return (
                            <tr key={int.id}>
                              <td>{int.name}</td>
                              <td>{int.added}</td>
                              <td><a onClick={() => this.setState({ deleteIntegration: int.id, deleteIntName: int.name, deleteIntegrationModal: "" })} ><i className="material-icons red-text">delete</i></a></td>
                            </tr>
                          )
                        })
                      }
                      </tbody>
                    </table>

                    </div>
                  </div>
                  {/* End Integrations */}

                  {/*Request Domain*/}
                  <div id="modal1" className="modal">
                    <div className="modal-content requestDomain">
                      <h4>Request a Custom Domain</h4>
                      <p>Coming soon...</p>
                      {/*<p>Please provide your desired domain.</p>
                      <input onChange={this.props.handleNewDomain} type="text" placeholder="https://www.mydomain.com" />
                      <br />
                      <p className="left-align">To complete the set up of your custom domain, add a CNAME record with your domain registrar and point it to <code className="code">{originalDomain}</code>.</p>
                      <br />
                      <p className="left-align">Example: If your custom domain is set to www.mydomain.com, you would add a CNAME record to the DNS for www and point it to the target of {originalDomain}.</p>*/}

                    </div>
                    <div className="modal-footer">
                      <a onClick={this.props.clearDomainName} className="modal-close waves-effect waves-green btn-flat">Cancel</a>
                      {/*<a onClick={this.props.accountDetails} className="modal-close waves-effect waves-green btn black">Create Domain</a>*/}
                    </div>
                  </div>
                  {/*End Request Domain*/}

                  {/*Edit Account Name*/}
                  <div id="modal2" className="modal">
                    <div className="modal-content requestDomain">
                      <h4>Update Account Name</h4>
                      <input onChange={this.props.newAccountName} type="text" placeholder="My Account Name" />
                    </div>
                    <div className="modal-footer">
                      <a onClick={this.props.clearAccountName} className="modal-close waves-effect waves-green btn-flat">Cancel</a>
                      <a onClick={this.props.accountDetails} className="modal-close waves-effect waves-green btn black">Update</a>
                    </div>
                  </div>
                  {/*Edit Account Name*/}

                  {/*Add Teammate*/}
                  <div id="modal3" className="modal modal-fixed-footer">
                    <div className="modal-content addteammate">
                      <h4>Add Teammate</h4>
                      <div className="input-field col s12 m6">
                        <input value={newTeammateName} onChange={this.props.handleTeammateName} type="text" placeholder="Johnny Cash" />
                        <label className="active">Teammate Name<span className="red-text">*</span></label>
                      </div>
                      <div className="input-field col s12 m6">
                        <input value={newTeammateEmail} onChange={this.props.handleTeammateEmail} type="text" placeholder="johnny@cash.com" />
                        <label className="active">Teammate Email<span className="red-text">*</span></label>
                      </div>
                      <div className="input-field col s12">
                        <select value={newTeammateRole} onChange={this.props.handleTeammateRole}>
                          <option value="" disabled>Select Role</option>
                          <option value="admin">Administrator</option>
                          <option value="editor">Editor</option>
                          <option value="author">Author</option>
                        </select>
                        <label>Role<span className="red-text">*</span></label>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <a onClick={this.props.clearNewTeammate} className="modal-close waves-effect waves-green btn-flat">Cancel</a>
                      <a onClick={this.props.addTeammate} className="modal-close waves-effect waves-green btn black">Add Teammate</a>
                    </div>
                  </div>
                  {/*End Add Teammate*/}

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
        </div>
        </div>
      );
    } else {
      return (
        <Onboarding />
      )
    }

  }
}
