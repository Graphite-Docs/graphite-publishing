import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Header from '../Header';
import {
  loadUserData,
  isUserSignedIn
} from 'blockstack';
import AceEditor from 'react-ace';
import 'brace/mode/html';
import 'brace/theme/twilight';

export default class Design extends Component {

  componentDidMount() {
    isUserSignedIn() ? this.props.loadMainHtml() : loadUserData();
    window.$('.modal').modal();
  }

  render() {
    const { team, onboardingComplete, accountName, logo } = this.props;
    let loggedInUser = team.filter(obj => {return obj.blockstackId === loadUserData().username});


    return (
      <div className="container">
      <Header
        handleSignOut={this.props.handleSignOut}
        onboardingComplete={onboardingComplete}
        logo={logo}
        accountName={accountName}
       />
      {loggedInUser[0].isOwner ?
        <div>
          <h1>Design</h1>
          <AceEditor
            mode="html"
            theme="twilight"
            name="html-editor"
            onChange={this.props.handleCodeChanges}
            value={this.props.pageHTML}
          />
          <button onClick={this.props.saveMainHtml} className="btn black">Save</button>
          <a className="modal-trigger" href="#previewMain"><button className="btn grey">Preview</button></a>
          <div className="previewMainParent">
            <div id="previewMain" className="modal">
              <div className="modal-content">
                <div className="previewModalClose">
                  <a href="#!" className="right modal-close waves-effect waves-green btn-flat">Done</a>
                </div>
                <div dangerouslySetInnerHTML={{ __html: this.props.pageHTML }} />
              </div>
            </div>
          </div>
        </div>
        :
        <div>
          <h3>Only the account owner can edit the site design.</h3>
          <p><Link to={'/'}>Go home</Link></p>
        </div>
      }


      </div>
    );
  }
}
