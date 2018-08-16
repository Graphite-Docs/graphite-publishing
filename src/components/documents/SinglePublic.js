import React, { Component } from "react";

export default class SinglePublic extends Component {

  componentDidMount() {
    this.loadScript();
    this.props.loadPostHtmlPublic()
    setTimeout(this.props.loadSinglePublic, 500);
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

      return (
        <div>
          <div id="designed-post"></div>
        </div>
      );
  }
}
