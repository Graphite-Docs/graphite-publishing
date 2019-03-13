import React, { Component } from 'reactn';
import {
  isUserSignedIn,
  loadUserData, 
  Person,
  signUserOut
} from 'blockstack';
import { Menu, Image, Icon, Dropdown } from 'semantic-ui-react'
const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

export default class Header extends Component {
  constructor(props) {
  	super(props);

  	this.state = {
      loading: false,
  	  person: {
  	  	name() {
          return 'Anonymous';
        },
  	  	avatarUrl() {
  	  	  return avatarFallbackImage;
  	  	},
  	  },
  	};
}

  componentDidMount() {
    window.$('.sidenav').sidenav();
  }

  handleSignOut = (e) => {
    e.preventDefault();
    signUserOut(window.location.origin);
  }

  renderHeader() {
    let person;
    const userData = loadUserData();
    if(userData) {
      person = new Person(userData.profile);
    } else {
      person = ""
    }

    const trigger = (
      <span>
        <div>
        <Image src={person ? person.avatarUrl() ? person.avatarUrl() : avatarFallbackImage : avatarFallbackImage} avatar style={{ width: "40px", height: "40px", marginRight: "15px" }} />
        <Icon style={{color: "#fff"}} name='caret down' />
        </div>
      </span> 
    )
    if (isUserSignedIn()) {
      
      const { logo, accountName, onboardingComplete, editing } = this.global;
      return (
        <div>

          <Menu className='header-menu' style={{ borderRadius: "0", background: "#000", border: "none", height: "70px" }}>
            <Menu.Item style={{border: "none"}}>
            {onboardingComplete ? <span className='accountLogo'>{editing === true ? <a style={{color: "#fff"}} href="/" className="modal-trigger brand-logo">{logo !== "" && logo !== undefined ? <Image src={logo} style={{ maxHeight: "50px", marginLeft: "10px" }} /> : accountName}</a> : <a style={{color: "#fff"}} href="/" className="brand-logo">{logo !== "" && logo !== undefined ? <Image src={logo} style={{ maxHeight: "50px", marginLeft: "10px" }} /> : accountName}</a>}</span> : <div className="hide" />}
             
            </Menu.Item>
            <Menu.Item position="right">
            <Dropdown trigger={trigger} icon={null} className="menuDrop">
                <Dropdown.Menu>
                  <Dropdown.Item><a href='/design'>Design</a></Dropdown.Item>
                  <Dropdown.Item><a href='/settings'>Settings</a></Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item><a onClick={this.handleSignOut}>Sign Out</a></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </Menu.Item>
          </Menu>

          {/*<nav className="main-header">
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
                </ul>*/}
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
