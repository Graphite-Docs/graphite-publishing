import React, { Component } from "reactn";
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import Dropzone from 'react-dropzone';
import Onboarding from './Onboarding';
import { loadAccount } from "../helpers/helpers";
import { Icon, Input, Button, Divider, Sidebar, Menu, Image, Checkbox } from 'semantic-ui-react';
import {Menu as MainMenu} from 'semantic-ui-react';
import { Header as SemanticHeader } from 'semantic-ui-react';
const ui = require('../helpers/postui');
const single = require('../helpers/singlepost.js');
const wordCount = require('html-word-count');

export default class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state={
      visible: false
    }
  }

  async componentDidMount() {
    await loadAccount();
    await single.loadSingle();

    window.$('.summernote').summernote({
      placeholder: "Write something great...",
      callbacks: {
        onChange: function(contents, $editable) {

        }
      }
    });
    window.$('.summernote').on('summernote.change', function(we, contents, $editable) {

      single.handleContentChange(contents);
    });
  }

  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })


  render() {
      const { onboardingComplete, status, loading, content, featuredImg, publishPost, initialLoad, title } = this.global;
      const dropzoneStyle = {};
      let saveBtn;
      let saveBtnClass;
      if(publishPost && status === "Published") {
        saveBtn = "Published";
        saveBtnClass = "btn green";
      } else if(publishPost && status === "Draft") {
        saveBtn = "Publish";
        saveBtnClass = "btn green";
      } else {
        saveBtn = "Save"
        saveBtnClass = "btn blue";
      }
      if(initialLoad) {
        if(onboardingComplete) {
          return (
            <div>
              <Loading />
            </div>
          );
        } else {
          return (
            <Onboarding />
          )
        }
      } else {
        if(onboardingComplete) {
          return (
            <div>

                <MainMenu className='item-menu' id="single-post-header" style={{ borderRadius: "0", background: "#fff", color: "#000" }}>
                    <MainMenu.Item onClick={single.handleBack}>
                      <Link to={'/'}><Icon style={{color: "#000"}} id="back-arrow" name='arrow left' /></Link>
                    </MainMenu.Item>
                    <MainMenu.Item>
                    {
                      title
                      ?
                      <Input id='title-input' value={title} onChange={single.handleTitleChange} />
                      :
                      <Input id='title-input' value="Untitled" onChange={single.handleTitleChange} />
                    }
                  
                    </MainMenu.Item>
                    <MainMenu.Menu position='right'>
                      <MainMenu.Item>
                      {loading === true ? <span className="post-save-button"><Button className="btn grey">Saving</Button></span> : <span className="post-save-button"><Button onClick={single.handleSavePost} className={saveBtnClass}>{saveBtn}</Button></span>}
                      </MainMenu.Item>
                    </MainMenu.Menu>
                </MainMenu>

              <div className="summernote"></div>

              {/*Side Nav*/}

              <Sidebar id='side-nav' style={{zIndex: "999"}} as={Menu} animation='overlay' icon='labeled' vertical visible={this.state.visible} width='wide' direction='right'>
                <Icon id='side-nav-close' onClick={() => this.setState({ visible: false })} name='close' style={{float: "left", marginLeft: "15px", paddingTop: "15px", cursor: "pointer"}} />
                <SemanticHeader style={{marginTop: "25px"}}>
                  <h3 id='side-nav-heading'>Post Settings</h3>
                </SemanticHeader>
                <Divider />
                <Menu.Item as='a'>
                    <SemanticHeader id='side-nav-image-heading' as='h3'>Featured Image</SemanticHeader>
                    {featuredImg === "" ?
                      <div className="center">
                      <Dropzone
                        style={dropzoneStyle}
                        onDrop={ single.handleFeaturedDrop }
                        accept="image/png,image/jpeg,image/jpg,image/tiff,image/gif"
                        multiple={ false }
                        onDropRejected={ this.handleDropRejected }>
                        <Button secondary>Upload/Change</Button>
                      </Dropzone>
                      </div> :
                      <div>
                      <Image className="post-featured" src={featuredImg} alt="featured"/>
                      <div className="center">
                      <Dropzone
                        style={dropzoneStyle}
                        onDrop={ single.handleFeaturedDrop }
                        accept="image/png,image/jpeg,image/jpg,image/tiff,image/gif"
                        multiple={ false }
                        onDropRejected={ this.handleDropRejected }>
                        <Button secondary>Upload/Change</Button>
                      </Dropzone>
                      </div>
                      </div>
                    }
                </Menu.Item>
                <Divider />
                <Menu.Item as='a'>
                  <SemanticHeader id='side-nav-publish' as='h3'>Publish Post?</SemanticHeader>
                    <Checkbox style={{padding: "10px"}} label="Publish" toggle onChange={single.onSwitchClick} checked={this.global.publishPost} />
                </Menu.Item>
                <Menu.Item id='side-nav-custom' as='a'>
                  Custom Slug URLs, coming soon!
                </Menu.Item>
              </Sidebar>

              {/*End Side Nav*/}

              {/* Dirty Detection
              <div id="dirtyModal" className="modal">
                <div className="modal-content">
                  <h4>Unsaved Changes</h4>
                  <p>You have unsaved changes. Do you want to save?</p>
                </div>
                <div className="modal-footer">
                  <a onClick={single.handleSavePost} className="modal-close waves-effect waves-green btn-flat">Save</a>
                  <a href="/posts" className="modal-close waves-effect waves-green btn-flat">Nope</a>
                </div>
              </div>
              End Dirty Detection */}

              <Menu style={{width: "100%"}} className='bottom-post-nav'>
                <Menu.Menu position='right'>
                <Menu.Item id='footer-settings' onClick={() => this.setState({ visible: true })} as='a' icon='settings'>
                </Menu.Item>

                <Menu.Item id='footer-expand' as="a" onClick={ui.expand} icon="expand">
                </Menu.Item>

                <Menu.Item
                  position='right'
                  id='footer-dark'
                  as="a"
                  onClick={ui.darkMode}
                  icon={this.global.darkmode ? "moon" : "moon outline"}
                >
                </Menu.Item>
                <Menu.Item id='footer-words'>
                {wordCount(content)} words
                </Menu.Item>
                </Menu.Menu>
              </Menu>

              {/* focus mode */}
              {
                this.global.fullscreen === true ?
                <div className="end-fullscreen">

                    <a onClick={ui.expand}><Icon name="compress" /></a>

                </div>
                :
                <div className="hide" />
              }
              {/*End focus mode */}

            </div>
          );
        } else {
          return (
            <Onboarding />
          )
        }
      }
  }
}
