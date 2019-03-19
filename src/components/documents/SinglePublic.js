import React, { Component } from "reactn";
import Loading from '../Loading';
const design = require('../helpers/design');
const posts = require('../helpers/singlepost');

export default class SinglePublic extends Component {

  async componentDidMount() {
    const script = await document.createElement("script");
    script.src = await "https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.11/handlebars.min.js";
    script.async = await true;
    script.id = await "handlebars-template";
    script.type = await "text/handlebars-template";
    await document.body.appendChild(script);
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
