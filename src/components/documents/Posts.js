import React, { Component } from "react";
import {Link} from 'react-router-dom';
import Header from '../Header';


export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {}
    }
  }

  componentDidMount() {
    // this.props.loadMyPublishedPosts();
    window.$('.tap-target').tapTarget();
    window.$('.modal').modal();
  }

  close() {
    window.$('.tap-target').tapTarget('close')
  }

  deleteModal(props) {
    this.setState({ post: props, })
    window.$('#deleteModal').modal('open')
  }

  render() {
    const { onboardingComplete, accountName, logo, posts, appliedFilter, postLoadingDone } = this.props;

    if(postLoadingDone === true && posts.length < 1) {
      window.$('.tap-target').tapTarget('open');
      setTimeout(this.close, 3000)
    }
      return (
        <div>
          <Header
            handleSignOut={this.props.handleSignOut}
            clearAccountData={this.clearAccountData}
            onboardingComplete={onboardingComplete}
            accountName={accountName}
            logo={logo}
          />
          <div className="posts">

              <div className="container project-pane">

                <div>
                <div className="row">
                  <div className="col s12 m6">
                    <h5>Posts ({posts.length})
                      {appliedFilter === false ? <span className="filter"><a data-activates="slide-out" className="menu-button-collapse button-collapse">Filter</a></span> : <span className="hide"><a data-activates="slide-out" className="menu-button-collapse button-collapse">Filter<i className="filter-icon material-icons">arrow_drop_down</i></a></span>}
                      {appliedFilter === true ? <span className="filter"><a className="card filter-applied" onClick={() => this.setState({ appliedFilter: false, filteredValue: this.state.value})}>Clear</a></span> : <div />}
                    </h5>
                  </div>
                  <div className="col right s12 m6">
                    <form className="searchform">
                      <fieldset className=" form-group searchfield">
                      <input type="text" className="searchinput" placeholder="Search Posts" onChange={this.filterList}/>
                      </fieldset>
                      </form>
                  </div>
                </div>

                {/* Feature Discovery */}
                <div className="tap-target" data-target="add-button">
                  <div className="tap-target-content">
                    <h5>Create a new post</h5>
                    <p>Looks like you don'{/*'*/}t have any posts. Create one by clicking this button.</p>
                  </div>
                </div>
                {/* End Feature Discovery */}

                {/* Add button */}
                <div className="fixed-action-btn">
                    <a id="add-button" onClick={this.props.newPost} className="btn-floating btn-large black">
                      <i className="large material-icons">add</i>
                    </a>
                </div>
                {/* End Add Button */}

                  <table className="bordered">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                  {
                    posts.map(post => {
                      let statusButton;
                      if(post.status === "Published") {
                        statusButton = "btn-floating center-align btn-small waves-effect waves-light green darken-2";
                      } else {
                        statusButton = "btn-floating center-align btn-small waves-effect waves-light yellow accent-4";
                      }
                    return(
                      <tr key={post.id}>
                        <td><input type="checkbox" value={post.id} id={post.id} onChange={this.handleCheckbox} /><label htmlFor={post.id}></label></td>
                        <td><Link to={'/post/' + post.id}>{post.title.length > 30 ? post.title.substring(0,30)+"..." :  post.title}</Link></td>
                        <td>{post.author}</td>
                        <td>{post.createdDate}</td>
                        <td><p className={statusButton}>{post.status.charAt(0)}</p></td>
                        <td><a onClick={() => this.deleteModal(post)}><i className="material-icons red-text delete-button">delete</i></a></td>
                      </tr>
                    );
                    })
                  }
                  </tbody>
                </table>

                {/* Delete Post Modal */}
                <div id="deleteModal" className="modal">
                 <div className="modal-content">
                   <h4>Delete Post</h4>
                   <p>Are you sure you want to delete <span className="bigger">{this.state.post.title}</span>?</p>
                 </div>
                 <div className="modal-footer">
                   <a onClick={() => this.props.loadPostToDelete(this.state.post)} className="btn red">Delete</a>
                   <a className="modal-close btn grey">Cancel</a>
                 </div>
               </div>
                {/* End Delete Post Modal */}
                </div>
              </div>
            </div>
        </div>
      );
  }
}
