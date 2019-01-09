import React, { Component } from 'react';
import {
  redirectToSignIn
} from 'blockstack';
import hero from '../images/brooke.jpg'
import brand from '../images/branding.png'
import design from '../images/pagedesign.png'
import posts from '../images/posts.png'
import dark from '../images/darktheme.png'

export default class Signin extends Component {
  handleSignIn(e) {
    const origin = window.location.origin;
    e.preventDefault();
    redirectToSignIn(origin, origin + '/manifest.json', ['store_write', 'publish_data'])
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a style={{marginTop: "5px"}} href="/" className="brand-logo left hide-on-small-and-up"><img style={{height: '100px'}} src='https://i.imgur.com/1taYMrP.png' alt='graphite logo' /></a><a style={{fontWeight: "200", marginLeft: "60px"}} href="/" className="brand-logo left hide-on-med-and-down">Graphite Publishing</a>
            <ul id="nav-mobile" className="right">
              <li><a onClick={ this.handleSignIn } className='btn green white-text'>Sign In</a></li>
              <li><a href='https://graphitedocs.com/about'>About Graphite</a></li>
            </ul>
          </div>
        </nav>
        <div style={{marginTop: "-20px", backgroundImage: `linear-gradient(black, black), url(${hero})`, height: "500px", width: "100%", backgroundBlendMode: "saturation", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center"}}>
          <div className='container white-text'>
            <h3 style={{paddingTop: "65px"}}>Experience the convenience of a hosted blogging experience while retaining ownership of your data.</h3>
            <h5>Graphite Publishing is a decentralized and encrypted publishing platform where you own your data.</h5>
            <button onClick={ this.handleSignIn } className='btn green white-text center-align' style={{marginBottom: "-75px"}}>Start Writing Now</button>
          </div>
        </div>
        <div style={{marginTop: "45px"}} className='row container'>
          <div className='col s12'>
            <h3>Features to keep your writing...well...yours</h3>
            <h5>All while creating a wonderful writing experience</h5>
          </div>
          <div className='col s12'>
            <h4>Branding</h4>
            <img className='card resonsive-img' alt='brand your site' src={brand}/>
            <h5>Add your logo or add your name. No matter what you choose, you can work knowing the Graphite Publishing branding will fall away and the experience will be all your own.</h5>
          </div>
          <div className='col s12'>
            <h4>Site Design</h4>
            <img className='card resonsive-img' alt='brand your site' src={design}/>
            <h5>Choose from pre-designed options or build your site to be 100% custom. Full HTML and styling support baked in.</h5>
          </div>
          <div className='col s12'>
            <h4>Encrypted Drafts and Public Posts</h4>
            <img className='card resonsive-img' alt='brand your site' src={posts}/>
            <h5>When you start a post, it remains encrypted and n draft form. Only when you are ready to share it with the world does the post become public.</h5>
          </div>
          <div className='col s12'>
            <h4>Write Your Way</h4>
            <img className='card resonsive-img' alt='brand your site' src={dark}/>
            <h5>Write with a light or dark theme, choose full-screen focus mode, add a feature image to your posts. It is entirely up to you. Control the data AND the experience.</h5>
          </div>
          <div style={{marginTop: "30px"}} className='col s12 center-align'>
            <button onClick={ this.handleSignIn } className='btn green white-text center-align'>Start Writing Now</button>
          </div>
        </div>
        <footer style={{backgroundColor: "#282828"}} className="page-footer">
          <div className="container">
            <div className="row" style={{marginBottom: "0"}}>
              <div className="col l6 s12">
                <h5 className="white-text">Graphite Publishing</h5>
                <p className="grey-text text-lighten-4">Graphite Publishing is an experiment built by <a href='https://graphitedocs.com'>Graphite</a>.</p>
              </div>
              <div className="col l4 offset-l2 s12">
                <ul>
                  <li><a className="grey-text text-lighten-3" onClick={ this.handleSignIn }>Sign In</a></li>
                  <li><a className="grey-text text-lighten-3" href="https://graphitedocs.com/about">About Graphite</a></li>
                  <li><a className="grey-text text-lighten-3" href="https://publishing.graphitedocs.com/sites/graphite.id">Blog</a></li>
                  <li><a className="grey-text text-lighten-3" href="https://github.com/graphite-docs/graphite-publishing">Github</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
