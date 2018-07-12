import React, { Component } from "react";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      appliedFilter: false,
      loading: "hide",
    }
  }

  render() {
    const { posts, appliedFilter, loading } = this.state;
      return (
        <div>
          <div className="posts">

              <div className="container project-pane">

              {/*Loading indicator*/}
                <div className={loading}>
                  <div className="progress center-align">
                    <p>Loading...</p>
                    <div className="indeterminate"></div>
                  </div>
                </div>
                <div>
                <div className="row">
                  <div className="col s12 m6">
                    <h5>Posts ({posts.length})
                      {appliedFilter === false ? <span className="filter"><a data-activates="slide-out" className="menu-button-collapse button-collapse">Filter<i className="filter-icon material-icons">arrow_drop_down</i></a></span> : <span className="hide"><a data-activates="slide-out" className="menu-button-collapse button-collapse">Filter<i className="filter-icon material-icons">arrow_drop_down</i></a></span>}
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

                  <table className="bordered">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                  {
                    posts.map(post => {
                      let statusButton = "btn-floating center-align btn-small waves-effect waves-light green darken-2";
                    return(
                      <tr key={post.id}>
                        <td><input type="checkbox" checked={this.state.checked} value={post.id} id={post.id} onChange={this.handleCheckbox} /><label htmlFor={post.id}></label></td>
                        <td><a onClick={() => this.setState({ postId: post.id, userToLoad: post.author})}>{post.title.length > 30 ? post.title.substring(0,30)+"..." :  post.title}</a></td>
                        <td>{post.author}</td>
                        <td>{post.updated}</td>
                        <td><p className={statusButton}>S</p></td>
                      </tr>
                    );
                    })
                  }
                  </tbody>
                </table>
                </div>
              </div>
            </div>
        </div>
      );
  }
}
