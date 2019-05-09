import React, { Component } from 'reactn';
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
import { loadPublicPostsCollection, loadPostPreview } from '../helpers/posts';
import { Container, Button, Icon, Modal, Grid, Image } from 'semantic-ui-react';
import { setTheme } from '../helpers/themes';
import marketplace from './marketplace.json';
const design = require('../helpers/design');

export default class Design extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: false, 
      modalOpen: false
    }
  }
  componentDidMount() {
    // loadPublicPostsCollection();
    isUserSignedIn() ? design.loadMainHtml() : loadUserData();
  }

  handleOpen = () => this.setState({ modalOpen: true })

  selectTheme = (theme) => {
    setTheme(theme);
    this.setState({ modalOpen: false })
  }

  previewMain = () => {
    console.log(this.global.posts)
    document.getElementById('dimmer').style.display = 'block';
    document.getElementById('designed-page-modal').style.display = 'block';
    var data,
      template;
    let posts = this.global.posts;
    console.log(posts)
    data = {
      "posts" : posts.filter(a => a.deleted !== true)
    }
      // source = document.getElementById("handlebars-template").innerHTML;
      template = window.Handlebars.compile(this.global.pageHTML);
      window.$('#designed-page').html(template(data));
  }
  

  closePreview = () => {
    document.getElementById('dimmer').style.display = 'none';
    document.getElementById('designed-page-modal') ? document.getElementById('designed-page-modal').style.display = 'none' : console.log("Not a page modal");
    document.getElementById('designed-post-modal') ? document.getElementById('designed-post-modal').style.display = 'none' : console.log("Not a post modal");
  }

  renderView() {
    if(document.getElementById('dimmer')) {
      window.$('#dimmer').click((e) => {
        document.getElementById('dimmer').style.display = 'none';
        document.getElementById('designed-page-modal') ? document.getElementById('designed-page-modal').style.display = 'none' : console.log("Not a page modal");
        document.getElementById('designed-post-modal') ? document.getElementById('designed-post-modal').style.display = 'none' : console.log("Not a post modal");

      })
    }
    
    const { loading } = this.global;
    let openBracket = "{{";
    let closedBracket = "}}";
    if(this.state.post === true) {
      return(
        <Container style={{marginTop: "25px"}}>
        <h1 className="center-align">Post Design
        <Modal trigger={<Icon style={{fontSize: "20px"}} name="question circle outline" />} closeIcon>
          <Modal.Header>How to Design Your Post</Modal.Header>
          <Modal.Content>
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
          </Modal.Content>
        </Modal>
        </h1>
        <p>Start with the template included, pick from one of the templates 
        <Modal trigger={<a> in the marketplace</a>}>
          <Modal.Header>Select a template</Modal.Header>
          <Modal.Content >
            
            <Modal.Description>
              <h3>Here</h3>
            </Modal.Description>
          </Modal.Content>
        </Modal>
        , or write your own.</p>
        
        <AceEditor
        editorProps={{
           $blockScrolling: Infinity
         }}
          mode="html"
          theme="twilight"
          name="html-editor"
          onChange={design.handlePostCodeChanges}
          value={this.global.postHTML}
        />
        <div style={{marginTop: "25px", marginBottom: "45px"}}>
        {loading === false ? <Button secondary onClick={design.saveMainHtml}>Save</Button> : <Button>Saving</Button>}
        <Button color='green' onClick={loadPostPreview}>Preview</Button>
        </div>

        <div id='designed-post-modal' style={{display: "none"}}>
          <Icon onClick={this.closePreview} name="close" style={{paddingRight: "10px", paddingTop: "10px", cursor: "pointer"}} />
          <div id="designed-post"></div>
        </div>
        <div id="dimmer"></div>
        </Container>
      )
    } else {
      return (
        <Container style={{marginTop: "25px"}}>

        <h1 className="center-align">Main Page Design 
        <Modal trigger={<Icon style={{fontSize: "20px"}} name="question circle outline" />} closeIcon>
          <Modal.Header>How to Design Your Main Page</Modal.Header>
          <Modal.Content>
          <p>Graphite Publishing uses <a href="https://handlebarsjs.com/" target="_blank" rel="noopener noreferrer">Handlerbars</a> as the simple templating engine to make designing your site easy. Here is an example: </p>
                  <div>
                    <img src={main} className="responsive-img" alt="Full example of page design" />
                  </div>
                  <p>You can include as little or as much from your posts as you would like. The only requirements are that you wrap everything in a {openBracket}#posts{closedBracket} block. You can see this in the above example. And you will need to create a link to the individual post by using the {openBracket}link{closedBracket} variable as illustrated above.</p>
                  <p>You can render any part of the post you want with the following Handlebars variables: </p>
                  <ul>
                    <li>{openBracket}title{closedBracket}</li>
                    <li>{openBracket}author{closedBracket}</li>
                    <li>{openBracket}featureImg{closedBracket}</li>
                    <li>{openBracket}lastUpdated{closedBracket}</li>
                    <li>{openBracket}link{closedBracket}</li>
                  </ul>
                  <p>Graphite Publishing supports full Handlebars syntax, including conditionals. Here is an example that conditionally renders a featured image for each post if one is available: </p>
                  <img src={conditional} className="responsive-img" alt="example with conditional"/>
                  <p>And, of course, there is full html and styling support. Use a style tag to apply your styles.</p>
          </Modal.Content>
        </Modal>
        </h1>
        <p>Start with the template included, pick from one of the templates 
        <Modal trigger={<a> in the marketplace</a>}>
          <Modal.Header>Select a template</Modal.Header>
          <Modal.Content >
            
            <Modal.Description>
              <h3>Here</h3>
            </Modal.Description>
          </Modal.Content>
        </Modal>, or write your own.</p>
       
        <AceEditor
        editorProps={{
           $blockScrolling: Infinity
         }}
          mode="html"
          theme="twilight"
          name="html-editor"
          onChange={design.handleCodeChanges}
          value={this.global.pageHTML}
        />
        <div style={{marginTop: "25px", marginBottom: "45px"}}>
        {loading === false ? <Button secondary onClick={design.saveMainHtml}>Save</Button> : <Button>Saving</Button>}
        
        <Button onClick={loadPublicPostsCollection} color='green'>Preview</Button>
        </div>
        
        <div id='designed-page-modal' style={{display: "none"}}>
          <Icon onClick={this.closePreview} name="close" style={{paddingRight: "10px", paddingTop: "10px", cursor: "pointer"}} />
          <div id="designed-page"></div>
        </div>
        <div id="dimmer"></div>


        </Container>
      )
    }
  }

  render() {
    const modalContent = (
      <Modal.Content >
        <Modal.Description>
          <Container>
          <Grid stackable>
            <Grid.Row columns={2}>
            {
              marketplace.templates.map(template => {
                return (
                  <Grid.Column key={template.name}>
                    <h3>{template.name}</h3>
                    <Image src={template.imageUrl} />
                    <Button onClick={() => this.selectTheme(template)} secondary>Add It</Button>
                  </Grid.Column>
                )
              })
            }
            </Grid.Row>
          </Grid>
          </Container>
        </Modal.Description>
      </Modal.Content>
    )
    const { onboardingComplete } = this.global;

    let mainStyle;
    let postStyle;
    if(this.state.post) {
      mainStyle = {
        background: "#e0e1e2",
        color: "#000"
      }
      postStyle = {
        background: "#000",
        color: "#fff"
      }
    } else {
      mainStyle = {
        background: "#000",
        color: "#fff"
      }
      postStyle = {
        background: "#e0e1e2",
        color: "#000"
      }
    }

    if(onboardingComplete) {
      return (
        <div>
        <Header />

          <Container className="main-design">
          <div>
            <Button style={mainStyle} onClick={() => this.setState({ post: false })}>Main Page</Button>
            <Button style={postStyle} onClick={() => this.setState({ post: true })}>Post Page</Button>
            <Modal 
            trigger={
            <Button onClick={this.handleOpen} color='blue' style={{float: "right"}}>Template Marketplace</Button>}
              open={this.state.modalOpen}
              onClose={this.handleClose}
            >
              <Modal.Header>Select a template</Modal.Header>
              {modalContent}
            </Modal>
            
          </div>

            {this.renderView()}

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
