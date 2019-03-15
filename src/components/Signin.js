import React, { Component } from 'react';
import {
  redirectToSignIn
} from 'blockstack';
import darkLogo from '../images/graphite-mark-dark.svg';
import logo from '../images/graphite-mark-light.svg';
import dark from '../images/darkmode.png'
import light from '../images/lightmode.png'
import theme from '../images/design.png'
import publishing from '../images/publishing.png'
import post from '../images/blogimage.jpeg'
import gitcoin from '../images/gitcoin.png'

export default class Signin extends Component {
  handleSignIn(e) {
    const origin = window.location.origin;
    e.preventDefault();
    redirectToSignIn(origin, origin + '/manifest.json', ['store_write', 'publish_data'])
  }

  switchTheme = (props) => {
    if(props === 'light') {
      document.getElementById('dark').style.display = "none";
      document.getElementById('light').style.display = "block";
    } else {
      document.getElementById('dark').style.display = "block";
      document.getElementById('light').style.display = "none";
    }
  }

  render() {

    return (
      <div>
      <div id="loading">
          <div className="load-circle"><span className="one"></span></div>
        </div>

        <header>
          <nav className="navbar header-nav navbar-expand-lg">
            <div className="container">
        
              <a className="navbar-brand" href="/">
                <img className="light-logo" style={{height: "70px!important"}} src={logo} title="" alt="" />
                <img className="dark-logo" style={{height: "70px!important"}} src={darkLogo} title="" alt="" />
              </a>
              <a className='nav-link'>
                <span  style={{color: "#8053f6", display: "inline-block", verticalAlign: "middle", fontSize: "15px", fontWeight: "600", position: "relative"}}>Publishing</span>
              </a>

              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                  <span></span>
              </button>

              <div className="collapse navbar-collapse justify-content-end" id="navbar">
                <ul className="navbar-nav ml-auto align-items-lg-center">
                  <li><a className="nav-link" href="#feature">Features</a></li>
                  <li><a className="nav-link" href="#themes">Themes</a></li>
                  <li><a className="nav-link" href="#blog">Blog</a></li>
                  <li><a className="nav-link" href="https://graphitedocs.com">About Graphite</a></li>
                  <li><a onClick={this.handleSignIn} className="nav-link-btn" style={{cursor: "pointer", color: "#fff"}}>Sign In</a></li>
                </ul>
              </div>

            </div>
          </nav> 
        </header>

        <main>
          <section id="home" className="home-banner-02 banner-effect">
            <div className="container">
              <div className="row p-100px-t justify-content-center">
                <div className="col-lg-10 text-center m-100px-t md-m-50px-t sm-m-20px-t">
                  <h2 className="white-color font-alt">Enjoy the convenience of a hosted blogging experience while retaining ownership of your data.</h2>
                  <p className="white-color">Graphite Publishing is a decentralized and encrypted publishing platform where you own your data.</p>
                  <div className="btn-bar">
                    <a className="m-btn m-btn-theme2nd" href="#feature">Learn More</a>
                    <a onClick={this.handleSignIn} className="m-btn m-btn-white" style={{cursor: "pointer"}}>Try It</a>
                  </div>
                </div>
                <div className="col-md-12 text-center p-50px-t sm-p-50px-b">
                  <img src={publishing} title="" alt="" />
                </div>
              </div>
            </div>
            <div className="hb-overlay theme-bg">
              <div className="banner-effect-b">
                <img src="static/img/banner-effect-1.svg" title="" alt="" />
              </div>
              <div className="hb-effect hbe-1"></div>
              <div className="hb-effect hbe-2"></div>
            </div>

          </section>

          <section id="feature" className="section round-section overflow-hidden">
            <div className="round round-1"></div>
            <div className="round round-2"></div>
            <div className="round round-3"></div>
            <div className="round round-4"></div>
            <div className="container">
              <div className="row justify-content-center m-45px-b sm-m-25px-b">
                <div className="col-lg-8">
                  <div className="section-titel-01 text-center">
                    <h2 className="dark-color">It's your blog, make it special</h2>
                    <p>Graphite Publishing gives you full control over the design of your blog.</p>
                  </div>
                </div>
              </div> 

              <div className="row">
                <div className="col-md-6 col-lg-3 m-15px-tb">
                  <div className="feature-box-02 box-shadow">
                    <div className="icon">
                      <i className="icon-tools-2"></i>
                    </div>
                    <div className="feature-content">
                      <h4 className="dark-color">Simple Configuration</h4>
                      <p>Brand the editing experience with your name or logo. Set up a custom domain (soon!). Settings made simple.</p>
                      
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 m-15px-tb">
                  <div className="feature-box-02 box-shadow">
                    <div className="icon">
                      <i className="icon-tools"></i>
                    </div>
                    <div className="feature-content">
                      <h4 className="dark-color">Built-In Designer</h4>
                      <p>Using HTML, you can customize your entire blog. Design the main page and design your post pages.</p>
                      
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 m-15px-tb">
                  <div className="feature-box-02 box-shadow">
                    <div className="icon">
                      <i className="icon-layers"></i>
                    </div>
                    <div className="feature-content">
                      <h4 className="dark-color">Template Documentation</h4>
                      <p>Easily understand how to build blog templates using our in-app documentation.</p>
                      
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-3 m-15px-tb">
                  <div className="feature-box-02 box-shadow">
                    <div className="icon">
                      <i className="icon-scissors"></i>
                    </div>
                    <div className="feature-content">
                      <h4 className="dark-color">Clean Experience</h4>
                      <p>The writing experience adapts to you. Dark mode, full-screen mode, html editor. You're in control.</p>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="detail" className="section gray-bg">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-7 text-center p-50px-r md-p-30px-t">
                  <img id='dark' src={dark} title="" alt="dark theme blog" />
                  <img style={{display: "none"}} id='light' src={light} title="" alt="light theme blog" />
                  <div className="btn-bar">
                    <a style={{background: "#8053f6", margin: "15px", border: "#8053f6 solid 1px", color: "#fff"}} onClick={() => this.switchTheme("dark")} className="m-btn m-btn-theme2nd">Dark</a><a style={{color: "#fff"}} onClick={() => this.switchTheme("light")} className="m-btn m-btn-theme2nd">Light</a>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="intro-col p-35px-l md-p-0px-l">
                    <h2 className="dark-color">Focus on what's most important...writing</h2>
                    <p>With a clean editor layout and options that allow you to make the experience all your own, you'll never want to stop writing.</p>
                  </div>
                </div>
                
              </div>
            </div>
          </section>

          <section id="themes" className="section overflow-hidden">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-5">
                  <div className="intro-col p-35px-r md-p-0px-r">
                    <h2 className="dark-color">Custom templates, built by you or snagged from the marketplace</h2>
                    <p>Graphite Publishing has a rich template builder, so you can literally design your blog to look any way you'd like. But soon, it will also have a template marketplace for you to browse and update your site with.</p>
                    <div className="btn-bar">
                      <a style={{cursor: "pointer", color: "#fff"}} onClick={this.handleSignIn} className="m-btn m-btn-theme2nd">Get Started Now</a>
                    </div>
                  </div>
                </div> 
                <div className="col-lg-7 text-center md-p-30px-t">
                  <img id="designer" className="max-width-auto" src={theme} title="" alt="" />
                </div> 
              </div>
            </div>
          </section>

          <section id="blog" className="section gray-bg round-section overflow-hidden">
            <div className="round round-1"></div>
            <div className="round round-2"></div>
            <div className="round round-3"></div>
            <div className="round round-4"></div>
            <div className="container">
              <div className="row justify-content-center m-45px-b sm-m-25px-b">
                <div className="col-lg-8">
                  <div className="section-titel-01 text-center">
                    <h2 className="dark-color">The Lead - the official Graphite blog</h2>
                    <p>Powered by Graphite Publishing. <a href="https://publishing.graphitedocs.com/sites/graphite.id">See what's possible.</a></p>
                  </div> 
                </div> 
              </div>

              <div className="row">
                <div className="col-lg-4 m-15px-tb">
                    <div className="blog-item">
                      <div className="blog-img box-shadow">
                        <a href="https://publishing.graphitedocs.com/sites/graphite.id/public/48dd52ca-cca8-4fa8-bca7-5f9b38533bfc"><img src={dark} title="" alt="" /></a>
                        <div className="post-meta theme-bg-2nd white-color"> Dec 26, 2018 </div>
                      </div>
                      <div className="blog-content box-shadow">
                        <h4><a className="dark-color" href="https://publishing.graphitedocs.com/sites/graphite.id/public/48dd52ca-cca8-4fa8-bca7-5f9b38533bfc">Introducing Graphite Publishing.</a></h4>
                        <p>While blogging may not be a core necessity for Graphite, it is something we've always been interested in.</p>
                        <a className="link-btn" href="https://publishing.graphitedocs.com/sites/graphite.id/public/48dd52ca-cca8-4fa8-bca7-5f9b38533bfc">Read More</a>
                      </div>
                    </div>
                </div>

                <div className="col-lg-4 m-15px-tb">
                    <div className="blog-item">
                      <div className="blog-img box-shadow">
                        <a href="https://publishing.graphitedocs.com/sites/graphite.id/public/5c82163b-6d47-4a80-b58b-bbe1e29a557c"><img src={post} title="" alt="" /></a>
                        <div className="post-meta theme-bg-2nd white-color"> Dec 23, 2018 </div>
                      </div>
                      <div className="blog-content box-shadow">
                        <h4><a className="dark-color" href="https://publishing.graphitedocs.com/sites/graphite.id/public/5c82163b-6d47-4a80-b58b-bbe1e29a557c">Removing The Complexity From Blockchain Use Cases</a></h4>
                        <p>For anyone who has read this blog before, you already know my opinion on decentralized applications.</p>
                        <a className="link-btn" href="https://publishing.graphitedocs.com/sites/graphite.id/public/5c82163b-6d47-4a80-b58b-bbe1e29a557c">Read More</a>
                      </div>
                    </div>
                </div>

                <div className="col-lg-4 m-15px-tb">
                    <div className="blog-item">
                      <div className="blog-img box-shadow">
                        <a href="https://publishing.graphitedocs.com/sites/graphite.id/public/274360e4-b759-4d02-86e2-8b2400fd8e87"><img src={gitcoin} title="" alt="" /></a>
                        <div className="post-meta theme-bg-2nd white-color"> Dec 23, 2018 </div>
                      </div>
                      <div className="blog-content box-shadow">
                        <h4><a className="dark-color" href="https://publishing.graphitedocs.com/sites/graphite.id/public/274360e4-b759-4d02-86e2-8b2400fd8e87">You Shouldn't Notice Decentralization</a></h4>
                        <p>Decentralization is the concept of taking something that is largely controlled by one party and distributing said control to a group. In software, this means a bunch of different things.</p>
                        <a className="link-btn" href="https://publishing.graphitedocs.com/sites/graphite.id/public/274360e4-b759-4d02-86e2-8b2400fd8e87">Read More</a>
                      </div>
                    </div>
                </div>

              </div>
            </div>
          </section>

        </main>

        <footer className="footer">
          <div className="footer-top">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-5">
                  <ul className="nav justify-content-center justify-content-md-end sm-m-20px-t">
                    <li><a className="nav-link" style={{cursor: "pointer"}}>Sign up/in</a></li>
                    <li><a className="nav-link" href="#feature">Features</a></li>
                    <li><a className="nav-link" href="https://graphitedocs.com">About</a></li>
                  </ul>  
                </div>
                <div className="col-md-2">
                  <div className="footer-logo text-center">
                    <img src={darkLogo} title="" alt="" />
                  </div>
                </div>
                <div className="col-md-5">
                  <ul className="nav justify-content-center justify-content-md-start sm-m-20px-t">
                    <li><a className="nav-link" href="#themes">Themes</a></li>
                    <li><a className="nav-link" href="#blog">Blog</a></li>
                    <li><a className="nav-link" href="https://github.com/Graphite-Docs/graphite-publishing">Github</a></li>
                  </ul>  
                </div>
              </div>
            </div>
          </div>
        </footer>
        </div>
    );
  }
}
