import React, { Component } from "react";
import {Link} from 'react-router-dom';
import Onboarding from './Onboarding';
import Header from '../Header';
import Loading from '../Loading';


export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    }
    this.deleteModal = this.deleteModal.bind(this);
  }

  componentDidMount() {

  }

  close() {
    window.$('.tap-target').tapTarget('close')
  }

  deleteModal(props) {
    document.getElementsByClassName("modal")[0].style.display = "block";
    document.getElementsByClassName("modal")[0].style.top = "20%";
    document.getElementsByClassName("modal")[0].style.zIndex = "999";
    this.setState({ post: props, })
    // window.$('#deleteModal').modal('open');
  }

  closeModal() {
    document.getElementsByClassName("modal")[0].style.display = "none";
  }

  render() {
    const { onboardingComplete, paymentDue, accountName, logo, filteredPosts, initialLoad } = this.props;
    if(initialLoad) {
      if(onboardingComplete && !paymentDue) {
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
                  <Loading />
                </div>
              </div>
          </div>
        );
      } else {
        return (
          <Onboarding />
        )
      }
    } else {
      if(onboardingComplete && !paymentDue) {
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
                      <h5>Posts ({filteredPosts.length})
                      {/*
                        {appliedFilter === false ? <span className="filter"><a data-activates="slide-out" className="menu-button-collapse button-collapse">Filter</a></span> : <span className="hide"><a data-activates="slide-out" className="menu-button-collapse button-collapse">Filter<i className="filter-icon material-icons">arrow_drop_down</i></a></span>}
                        {appliedFilter === true ? <span className="filter"><a className="card filter-applied" onClick={() => this.setState({ appliedFilter: false, filteredValue: this.state.value})}>Clear</a></span> : <div />}
                      */}
                       <a id="add-button" onClick={this.props.newPost} className="btn-floating btn-small black">
                        <i className="large material-icons">add</i>
                       </a>
                      </h5>
                    </div>
                    <div className="col right s12 m6">
                      <form className="searchform">
                        <fieldset className=" form-group searchfield">
                        <label>Search</label>
                        <input type="text" className="searchinput" placeholder="Search Posts" onChange={this.props.filterList}/>
                        </fieldset>
                        </form>
                    </div>
                  </div>

                  {/* Feature Discovery
                  <div className={this.state.featureDiscovery}>
                    <div className="feature-discovery">
                    	<div className="hidden-circle">
                    		<p className="feature-discovery-p">It looks like you </p>
                    		<div className="hidden-wave"></div>
                    	</div>
                    </div>
                  </div>*/}
                  {/* End Feature Discovery */}

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
                      filteredPosts.map(post => {
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
                     <a onClick={this.closeModal} className="modal-close btn grey">Cancel</a>
                   </div>
                 </div>
                  {/* End Delete Post Modal */}
                  </div>
                </div>
              </div>
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
