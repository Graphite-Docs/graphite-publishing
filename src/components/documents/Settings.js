import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

export default class Settings extends Component {

  componentDidMount() {
    window.$('.modal').modal();
    window.$('.tooltipped').tooltip();
  }

  render() {
    const { logo, accountName, team, integrations, newDomain, ownerBlockstackId } = this.props;
    let originalDomain;
    if(accountName !== undefined && accountName !== "") {
      originalDomain = "https://publishing.graphitedocs.com/sites/" + ownerBlockstackId;
    } else {
      originalDomain = "https://publishing.graphitedocs.com/sites/";
    }
    let teamList;
    let integrationsList
    team === undefined ? teamList = [] : teamList = team;
    integrations === undefined ? integrationsList = [] : integrationsList = integrations;
    const dropzoneStyle = {};
    return (
      <div>
      <div className="container">
        <div className="center-align">
          <div className="row account-settings">
            <button onClick={this.props.clearAccountData}>Do it</button>
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
              <h5 className="left">Your Team {(1+1 === 2) ? <button className="btn-floating btn-small black" onClick={() => this.setState({ editing: true, hideMain: "hide", teammateModal: "" })}><i className="material-icons white-text">add</i></button> : <span className="note"><a className="note-link" onClick={() => window.Materialize.toast('Your main account admin can add teammates.', 4000)}>?</a></span>}</h5>

              <table className="bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date Added</th>
                    <th>Role <span><a data-position="top" data-tooltip="Learn more about roles <a href='https://graphitedocs.com'>here</a>." className="tooltipped info"><i className="material-icons">info_outline</i></a></span></th>
                    {(1+1 === 2) ? <th></th> : <div />}
                  </tr>
                </thead>
                <tbody>
                    {teamList.slice(0).reverse().map(mate => {
                        return (
                          <tr key={mate.name}>
                            <td><a onClick={() => this.setState({ selectedTeammate: mate.name, updateTeammateModal: "", hideMain: "hide", editing: true})}>{mate.name}</a></td>
                            <td>{mate.added}</td>
                            <td>{mate.role}</td>
                            {(1+1 === 2) ? <td><a onClick={() => this.setState({ deleteContact: mate.name, deleteTeammateModal: "" })} ><i className="material-icons red-text">delete</i></a></td> : <div />}
                          </tr>
                        )
                      })
                    }
                </tbody>
              </table>
            </div>
            {/* Integrations */}
                <div className="col s12 account-settings-section">
                  <div className="row">
                  <h5 className="left">Integrations <button className="add-teammate-button btn-floating btn-small black" onClick={() => this.setState({ integrationsModal: "", editing: true })}><i className="material-icons white-text">add</i></button></h5>
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
                    <p>Please provide your desired domain.</p>
                    <input onChange={this.props.handleNewDomain} type="text" placeholder="https://www.mydomain.com" />
                    <br />
                    <p className="left-align">To complete the set up of your custom domain, add a CNAME record with your domain registrar and point it to <code className="code">{originalDomain}</code>.</p>
                    <br />
                    <p className="left-align">Example: If your custom domain is set to www.mydomain.com, you would add a CNAME record to the DNS for www and point it to the target of {originalDomain}.</p>

                  </div>
                  <div className="modal-footer">
                    <a className="modal-close waves-effect waves-green btn-flat">Cancel</a>
                    <a onClick={this.props.accountDetails} className="modal-close waves-effect waves-green btn black">Create Domain</a>
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
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
