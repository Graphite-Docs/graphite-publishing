import React, { Component } from "react";

export default class SinglePost extends Component {

  componentDidMount() {
    window.$('#summernote').summernote();
    this.props.loadMyPublishedPosts();
    setTimeout(this.props.loadPost, 300)
    window.$('#summernote').summernote({
      callbacks: {
        onChange: function(contents, $editable) {
          console.log('onChange:', contents, $editable);
        }
      }
    });
    window.$('#summernote').on('summernote.change', function(we, contents, $editable) {
      console.log('summernote\'s content is changed.' + contents);
      this.props.handleContentChange(contents);
    }.bind(this));
  }


  render() {
      return (
        <div>
        <nav>
          <div className="nav-wrapper">
            <h3><a href="/posts" className="brand-logo"><i className="material-icons">arrow_back</i></a></h3>
            <form className="left">
              <div className="input-field">
                <input value={this.props.title} onChange={this.props.handleTitleChange} id="search" type="search" required />
                <label className="label-icon" htmlFor="search"><i className="material-icons">edit</i></label>
              </div>
            </form>
            <ul className="right">
              <button onClick={this.props.handleSavePost} className="btn blue">Save</button>
            </ul>
          </div>
        </nav>
          <div id="summernote">Hello Summernote</div>
        </div>
      );
  }
}
