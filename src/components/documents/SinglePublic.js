import React, { Component } from "reactn";
import Loading from '../Loading';
const design = require('../helpers/design');
const posts = require('../helpers/singlepost');

const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.11/handlebars.min.js";
script.async = true;
script.id = "handlebars-template";
script.type = "text/handlebars-template";
document.body.appendChild(script);

export default class SinglePublic extends Component {

  componentDidMount() {
    this.loadScript();
    design.publicLoadMainHtml();
    posts.loadSinglePublic();
  }

  loadScript() {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.11/handlebars.min.js";
    script.async = true;
    script.id = "handlebars-template";
    script.type = "text/handlebars-template";
    document.body.appendChild(script);
    console.log("done");
  }


  render() {
      const { loading } = this.global;
      if(loading) {
        return <Loading />
      } else {
        return (
          <div>
            <div id="designed-post"></div>
          </div>
        );
      }
  }
}
