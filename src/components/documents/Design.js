import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Header from '../Header';
import Onboarding from './Onboarding';
import {
  loadUserData,
  isUserSignedIn
} from 'blockstack';
import AceEditor from 'react-ace';
import 'brace/mode/html';
import 'brace/theme/twilight';
import example from '../../images/div_example.png';
import advancedExample from '../../images/advanced_example.png';
import main from '../../images/main.png';
import conditional from '../../images/conditional.png';

export default class Design extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: false
    }
  }
  componentDidMount() {
    this.props.loadPublicPostsCollection();
    isUserSignedIn() ? this.props.loadMainHtml() : loadUserData();
    isUserSignedIn() ? this.props.loadPostHtml() : loadUserData();
    window.$('.modal').modal();
    window.$('.tabs').tabs();
  }

  renderView() {
    if(this.state.post === true) {
      return(
        <div>
        <h3 className="center-align">Post Design <span><a className="modal-trigger" href="#postHelpModal"><i className="material-icons  blue-text">help_outline</i></a></span></h3>
        <p>Start with the template included, pick from one of the templates below, or write your own.</p>
        <button onClick={() => this.props.setPostTheme('card')} className='btn blue'>Card Style</button><button onClick={() => this.props.setPostTheme('night')} className='btn black'>Night</button><button onClick={() => this.props.setPostTheme('clean')} className='btn grey'>Clean</button>
        <AceEditor
        editorProps={{
           $blockScrolling: Infinity
         }}
          mode="html"
          theme="twilight"
          name="html-editor"
          onChange={this.props.handlePostCodeChanges}
          value={this.props.postHTML}
        />
        {this.props.loading === false ? <button onClick={this.props.savePostHtml} className="btn blue">Save</button> : <button className="btn grey">Saving</button>}
        <a className="modal-trigger" href="#previewPost"><button className="btn green">Preview</button></a>


        </div>
      )
    } else {
      return (
        <div>

        <h3 className="center-align">Main Page Design <span><a className="modal-trigger" href="#pageHelpModal"><i className="material-icons  blue-text">help_outline</i></a></span></h3>
        <p>Start with the template included, pick from one of the templates below, or write your own.</p>
        <button onClick={() => this.props.setTheme('card')} className='btn blue'>Card Style</button><button onClick={() => this.props.setTheme('night')} className='btn black'>Night</button><button onClick={() => this.props.setTheme('clean')} className='btn grey'>Clean</button>
        <AceEditor
        editorProps={{
           $blockScrolling: Infinity
         }}
          mode="html"
          theme="twilight"
          name="html-editor"
          onChange={this.props.handleCodeChanges}
          value={this.props.pageHTML}
        />
        {this.props.loading === false ? <button onClick={this.props.saveMainHtml} className="btn blue">Save</button> : <button className="btn grey">Saving</button>}
        <a className="modal-trigger" href="#previewMain"><button className="btn green">Preview</button></a>


        </div>
      )
    }
  }

  render() {
    const { team, onboardingComplete, paymentDue, accountName, logo, editing } = this.props;
    let loggedInUser = team.filter(obj => {return obj.blockstackId === loadUserData().username});
    let openBracket = "{{";
    let closedBracket = "}}";
    if(onboardingComplete && !paymentDue) {
      return (
        <div className="container design-page">
        <Header
          handleSignOut={this.props.handleSignOut}
          onboardingComplete={onboardingComplete}
          logo={logo}
          accountName={accountName}
          editing={editing}
         />
        {loggedInUser[0].isOwner ?
          <div className="main-design">
          <ul className="tabs">
            <li className="tab col s3"><a href="#first" onClick={() => this.setState({ post: false })}>Main Page</a></li>
            <li className="tab col s3"><a href="#second" onClick={() => this.setState({ post: true })}>Post Page</a></li>
          </ul>

            {this.renderView()}

            <div className="previewMainParent">
              <div id="previewPost" className="modal">
                <div className="modal-content">
                  <div className="previewModalClose">
                    <a href="#!" className="right modal-close waves-effect waves-green btn-flat">Done</a>
                  </div>
                  <div id="designed-post"></div>

                </div>
              </div>
            </div>

            <div className="previewMainParent">
              <div id="previewMain" className="modal">
                <div className="modal-content">
                  <div className="previewModalClose">
                    <a href="#!" className="right modal-close waves-effect waves-green btn-flat">Done</a>
                  </div>
                  <div id="designed-page"></div>
                </div>
              </div>
            </div>


            {/*Post Help Modal */}
              <div id="postHelpModal" className="modal">
                <div className="modal-content">
                  <h4>How to Design Your Post</h4>
                  <p>Graphite Publishing uses <a href="https://handlebarsjs.com/" target="_blank" rel="noopener noreferrer">Handlerbars</a> as the simple templating engine to make designing your posts easy.</p>
                  <p>The only requirement for a post to be rendered is a div with the id of "designed-post-content".</p>
                  <img src={example} className="responsive-img" alt="div example"/>
                  <p>Additionaly, you can render any part of the post you want with the following Handlebars variables: </p>
                  <ul>
                    <li>{openBracket}title{closedBracket}</li>
                    <li>{openBracket}author{closedBracket}</li>
                    <li>{openBracket}featureImg{closedBracket}</li>
                    <li>{openBracket}published{closedBracket}</li>
                  </ul>
                  <p>Graphite Publishing supports full Handlebars syntax, including conditionals. Here is an example that uses all variables and a conditional if block: </p>
                  <img src={advancedExample} className="responsive-img" alt="example with more syntax"/>
                  <p>And, of course, there is full html and styling support. Use a style tag to apply your styles.</p>
                </div>
                <div className="modal-footer">
                  <a href="#!" className="modal-close waves-effect waves-green btn-flat">Got it</a>
                </div>
              </div>
            {/* End Post Help Modal */}

            {/*Main Page Help Modal */}
              <div id="pageHelpModal" className="modal">
                <div className="modal-content">
                  <h4>How to Design Your Main Page</h4>
                  <p>Graphite Publishing uses <a href="https://handlebarsjs.com/" target="_blank" rel="noopener noreferrer">Handlerbars</a> as the simple templating engine to make designing your site easy. Here is an example: </p>
                  <div>
                    <img src={main} className="responsive-img" alt="Full example of page design" />
                  </div>
                  <p>You can include as little or as much from your posts as you would like. The only requirements are that you wrap everything in a {openBracket}#posts{closedBracket} block. You can see this in the above example. And you will need to create a link to the individual post by using the {openBracket}link{closedBracket} variable as illustrated above.</p>
                  <p>You can render any part of the post you want with the following Handlebars variables: </p>
                  <ul>
                    <li>{openBracket}title{closedBracket}</li>
                    <li>{openBracket}author{closedBracket}</li>
                    <li>{openBracket}featuredImg{closedBracket}</li>
                    <li>{openBracket}lastUpdated{closedBracket}</li>
                    <li>{openBracket}link{closedBracket}</li>
                  </ul>
                  <p>Graphite Publishing supports full Handlebars syntax, including conditionals. Here is an example that conditionally renders a featured image for each post if one is available: </p>
                  <img src={conditional} className="responsive-img" alt="example with conditional"/>
                  <p>And, of course, there is full html and styling support. Use a style tag to apply your styles.</p>
                </div>
                <div className="modal-footer">
                  <a href="#!" className="modal-close waves-effect waves-green btn-flat">Got it</a>
                </div>
              </div>
            {/* End Main Page Help Modal */}

            {/* Dirty Detection */}
            {this.state.post === false ?
              <div id="dirtyModal" className="modal">
                <div className="modal-content">
                  <h4>Unsaved Changes</h4>
                  <p>You have unsaved changes. Do you want to save?</p>
                </div>
                <div className="modal-footer">
                  <a onClick={this.props.saveMainHtml} className="modal-close waves-effect waves-green btn-flat">Save</a>
                  <a href="/posts" className="modal-close waves-effect waves-green btn-flat">Nope</a>
                </div>
              </div>
              :
              <div id="dirtyModal" className="modal">
                <div className="modal-content">
                  <h4>Unsaved Changes</h4>
                  <p>You have unsaved changes. Do you want to save?</p>
                </div>
                <div className="modal-footer">
                  <a onClick={this.props.savePostHtml} className="modal-close waves-effect waves-green btn-flat">Save</a>
                  <a href="/posts" className="modal-close waves-effect waves-green btn-flat">Nope</a>
                </div>
              </div>
            }
            {/*End Dirty Detection */}

          </div>
          :
          <div>
            <h3>Only the account owner can edit the site design.</h3>
            <p><Link to={'/'}>Go home</Link></p>
          </div>
        }


        </div>
      );
    } else {
      return (
        <Onboarding />
      )
    }
  }
}
