import React, { Component } from 'reactn';
import Loading from './Loading';
const design = require('./helpers/design');


export default class Publication extends Component {

  async componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.11/handlebars.min.js";
    script.async = true;
    script.id = "handlebars-template";
    script.type = "text/handlebars-template";
    document.body.appendChild(script);
    // document.title = this.props.accountName;
    await design.publicLoadMainHtml();
  }

  render() {
    const { publicPosts, pageHTML, loading } = this.global;
      if(pageHTML === undefined || pageHTML === "") {
        return (
          <div>
            <div className="container">
            {
              publicPosts.slice(0).reverse().map(post => {
              return(
                <div key={post.id} className="center-align">
                  <h3>{post.title}</h3>
                  {post.featureImg !== "" ? <img className="responsive-img" src={post.featureImg} alt="post" /> : <div className="hide" />}
                  <p>By {post.author}</p>
                  <p>{post.lastUpdated}</p>
                </div>
              );
              })
            }
            </div>
          </div>
        );
      } else {
        if(loading) {
          return ( <Loading />)
        } else {
          return (
            <div>
              <div id="designed-page"></div>
            </div>
          );
        }
      }

  }
}
