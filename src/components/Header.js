import React, { Component } from 'react';
import {
  isUserSignedIn,
} from 'blockstack';

export default class Header extends Component {

  componentDidMount() {
    window.$('.sidenav').sidenav();
  }

  renderHeader() {
    if (isUserSignedIn()) {
      const { logo, accountName, onboardingComplete, editing } = this.props;
      return (
        <div>
          <nav className="main-header">
            <div className="nav-wrapper">
              {onboardingComplete ? <h3>{editing === true ? <a href="#dirtyModal" className="modal-trigger brand-logo">{logo !== "" && logo !== undefined ? <img src={logo} alt="Account logo" /> : accountName}</a> : <a href="/" className="brand-logo">{logo !== "" && logo !== undefined ? <img src={logo} alt="Account logo" /> : accountName}</a>}</h3> : <div className="hide" />}
              <a data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
              <ul className="right hide-on-med-and-down">
                <li>{editing === true ? <a href="#dirtyModal" className="modal-trigger">Posts</a> : <a href="/posts">Posts</a>}</li>
                {onboardingComplete === true ? <li>{editing === true ? <a href="#dirtyModal" className="modal-trigger">Design</a> : <a href="/design">Design</a>}</li> : <li className="hide" />}
                {onboardingComplete === true ? <li>{editing === true ? <a href="#dirtyModal" className="modal-trigger">Settings</a> : <a href="/settings">Settings</a>}</li> : <li className="hide" />}
                <li><a className="sign-out" onClick={ this.props.handleSignOut }>Sign Out</a></li>
              </ul>
            </div>
          </nav>

          <ul className="sidenav" id="mobile-demo">
            <li><a href="/posts">Posts</a></li>
            {onboardingComplete === true ? <li><a href="/design">Design</a></li> : <li className="hide" />}
            {onboardingComplete === true ? <li><a href="/settings">Settings</a></li> : <li className="hide" />}
            <li><a onClick={ this.props.handleSignOut }>Sign Out</a></li>
          </ul>
        </div>
      );
    } else {
      return(
        <div />
      );
    }
  }

  render() {
    return (
      <div>
      {this.renderHeader()}
      </div>
    );
  }
}
