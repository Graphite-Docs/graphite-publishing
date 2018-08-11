import React, { Component } from "react";
import Loading from '../Loading';
import Dropzone from 'react-dropzone';
const wordcount = require('wordcount');

export default class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state={
      fullscreen: false,
      darkmode: false
    }
    this.expand = this.expand.bind(this);
    this.darkMode = this.darkMode.bind(this);
  }

  componentDidMount() {
    window.$('.sidenav').sidenav({ edge: 'right'});
    window.$('.modal').modal();
    window.$('.summernote').summernote({
      placeholder: 'Write something great...'
    });
    this.props.loadMyPublishedPosts();
    setTimeout(this.props.loadPost, 1500);

    window.$('.summernote').summernote({
      callbacks: {
        onChange: function(contents, $editable) {

        }
      }
    });
    window.$('.summernote').on('summernote.change', function(we, contents, $editable) {

      this.props.handleContentChange(contents);
    }.bind(this));
  }

  expand() {
    if(this.state.fullscreen === false) {
      this.setState({fullscreen: true});
      document.getElementsByClassName('note-toolbar')[0].style.display = 'none';
      document.getElementsByClassName('single-post-header')[0].style.display = 'none';
      document.getElementsByClassName('note-editor')[0].style.top = '50px';
      document.getElementsByClassName('bottom-post-nav')[0].style.display = 'none';
    } else {
      this.setState({fullscreen: false});
      document.getElementsByClassName('note-toolbar')[0].style.display = 'block';
      document.getElementsByClassName('single-post-header')[0].style.display = 'block';
      document.getElementsByClassName('note-editor')[0].style.top = '150px';
      document.getElementsByClassName('bottom-post-nav')[0].style.display = 'block';
    }
  }

  darkMode() {
    if(this.state.darkmode === false) {
      this.setState({ darkmode: true });
      document.getElementsByClassName('main-container')[0].style.background = '#282828';
      document.getElementsByClassName('single-post-header')[0].style.background = '#282828';
      document.getElementsByClassName('single-post-header')[0].style.color = '#fff';
      document.getElementById('search').style.color = '#fff';
      document.getElementsByClassName('note-editor')[0].style.background = '#282828';
      document.getElementsByClassName('note-editor')[0].style.background = '#282828';
      document.getElementsByClassName('note-toolbar')[0].style.background = '#282828';
      document.getElementsByClassName('note-editable')[0].style.background = '#282828';
      document.getElementsByClassName('note-editable')[0].style.color = '#fff';
      document.getElementsByClassName('bottom-post-nav')[0].style.color = '#fff';
      document.getElementsByClassName('bottom-post-nav')[0].style.background = '#282828';
      document.getElementsByClassName('subheader')[0].style.color = '#fff';
      document.getElementsByClassName('subheader')[1].style.color = '#fff';
      document.getElementById('search').style.background = '#282828';
      document.getElementById('slide-out').style.background = '#282828';
      var noteBtn = document.getElementsByClassName('note-btn');
        for (var i = 0; i < noteBtn.length; ++i) {
            var item = noteBtn[i];
            item.style.background = '#282828';
            item.style.color = '#fff';
            item.style.border = 'none';
        }

      var bottomLinks = document.getElementsByClassName('bottom-nav-link');
        for (var a = 0; a < bottomLinks.length; ++a) {
            var ax = bottomLinks[a];
            ax.style.color = '#fff';
        }
    } else {
      this.setState({ darkmode: false });
      document.getElementsByClassName('main-container')[0].style.background = '#fff';
      document.getElementsByClassName('single-post-header')[0].style.background = '#fff';
      document.getElementsByClassName('single-post-header')[0].style.color = '#000';
      document.getElementById('search').style.color = '#000';
      document.getElementsByClassName('note-editor')[0].style.background = '#fff';
      document.getElementsByClassName('note-editor')[0].style.background = '#fff';
      document.getElementsByClassName('note-toolbar')[0].style.background = '#fff';
      document.getElementsByClassName('note-editable')[0].style.background = '#fff';
      document.getElementsByClassName('note-editable')[0].style.color = '#000';
      document.getElementsByClassName('bottom-post-nav')[0].style.color = '#000';
      document.getElementsByClassName('bottom-post-nav')[0].style.background = '#fff';
      document.getElementsByClassName('subheader')[0].style.color = '#000';
      document.getElementsByClassName('subheader')[1].style.color = '#000';
      document.getElementById('search').style.background = '#fff';
      document.getElementById('slide-out').style.background = '#fff';
      noteBtn = document.getElementsByClassName('note-btn');
        for (i = 0; i < noteBtn.length; ++i) {
            item = noteBtn[i];
            item.style.background = '#fff';
            item.style.color = '#000';
            item.style.border = '1px solid #fff';
        }
        bottomLinks = document.getElementsByClassName('bottom-nav-link');
          for (a = 0; a < bottomLinks.length; ++a) {
              ax = bottomLinks[a];
              ax.style.color = '#000';
          }
    }
  }


  render() {
      const { postLoading, loading, content, featuredImg, postURL } = this.props;
      const dropzoneStyle = {};
      return (
        <div>
        {
          postLoading === true ?
          <nav className="navbar-fixed single-post-header">
            <div className="nav-wrapper">
              <Loading />
            </div>
          </nav> :
          <nav className="navbar-fixed single-post-header">
            <div className="nav-wrapper">
              <h3 className="post-nav-header"><a href="/posts" className="brand-logo left"><i className="material-icons">arrow_back</i></a></h3>
              <form className="left post-title">
                <div className="input-field">
                  <input value={this.props.title} onChange={this.props.handleTitleChange} id="search" type="search" required />
                  <label className="label-icon" htmlFor="search"><i className="dark-mode material-icons">edit</i></label>
                </div>
              </form>
              <ul className="right">
                {loading === true ? <span className="post-save-button"><button className="btn grey">Saving</button></span> : <span className="post-save-button"><button onClick={this.props.handleSavePost} className="btn blue">Save</button><button className="more-btn btn black"><i className="more-icon material-icons">arrow_downward</i></button></span>}
              </ul>
            </div>
          </nav>
        }

          <div className="summernote"></div>

          {/*Side Nav*/}
          <ul id="slide-out" className="sidenav">
            <li><div>
              <div className="background">
                <a className="featured-margin subheader">Featured Image</a>
                {featuredImg === "" ?
                <div className="center">
                <Dropzone
                  style={dropzoneStyle}
                  onDrop={ this.props.handleFeaturedDrop }
                  accept="image/png,image/jpeg,image/jpg,image/tiff,image/gif"
                  multiple={ false }
                  onDropRejected={ this.handleDropRejected }>
                  <button className="btn black">Upload/Change</button>
                </Dropzone>
                </div> :
                <div>
                <img className="post-featured" src={featuredImg} alt="featured"/>
                <div className="center">
                <Dropzone
                  style={dropzoneStyle}
                  onDrop={ this.props.handleFeaturedDrop }
                  accept="image/png,image/jpeg,image/jpg,image/tiff,image/gif"
                  multiple={ false }
                  onDropRejected={ this.handleDropRejected }>
                  <button className="btn black">Upload/Change</button>
                </Dropzone>
                </div>
                </div>
                }
              </div>
            </div></li>
            <li><div className="divider"></div></li>
            <li><a className="subheader">Post URL</a></li>
            {postURL !== "" ? <li className="container"><input onChange={this.props.handlePostURL} type="text" placeholder={'/' + postURL.replace(/\s+/, "-")} /></li> : <li className="container"><input onChange={this.props.handlePostURL} type="text" placeholder={'/' + this.props.title.replace(/\s+/, "-")} /></li>}
            </ul>
          {/*End Side Nav*/}

          <nav className="bottom-post-nav">
            <div className="nav-wrapper">
              <ul id="nav-mobile" className="right">
                <li><a data-target="slide-out" className="sidenav-trigger settings-btn bottom-nav-link"><i className="material-icons">settings</i></a></li>
                <li><a className='bottom-nav-link' onClick={this.expand}><i className="bottom-nav-link material-icons">fullscreen</i></a></li>
                <li><a className='bottom-nav-link' onClick={this.darkMode}><i className="bottom-nav-link material-icons">brightness_2</i></a></li>
                <li><a className='bottom-nav-link'>{wordcount(content)} words</a></li>
              </ul>
            </div>
          </nav>

          {/*End focus mode */}
          {
            this.state.fullscreen === true ?
            <div className="end-fullscreen fixed-action-btn">

                <a onClick={this.expand}><i className="material-icons">fullscreen_exit</i></a>

            </div>
            :
            <div className="hide" />
          }
          {/*End focus mode */}

        </div>
      );
  }
}
