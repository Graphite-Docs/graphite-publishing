import {
  putFile,
  getFile
} from 'blockstack';
import axios from 'axios';
let link;
let html;

export function setTheme(name) {
  if(name === 'card') {
    this.setState({ pageHTML: "<div>\n<nav>\n<div class='nav-wrapper'>\n<h3><a href='#' className='brand-logo'>Your Name or Image</a></h3>\n</div>\n</nav>\n<div class='row'>\n{{#posts}}\n<div class='col s6 m4'>\n<div class='card small'>\n<div class='card-image'>\n{{#if featureImg}}\n<img src={{featureImg}} />\n{{/if}}\n<span style='color:#000;' class='card-title'>\n{{title}}\n</span>\n</div>\n<div class='card-content'>\n<p>Published: {{lastUpdated}}</p>\n<p>By: {{author}}</p>\n</div>\n<div class='card-action'>\n<a style='color: #000' href={{link}}>Read It</a>\n</div>\n</div>\n</div>\n{{/posts}}\n</div>\n</div>" })
  } else if(name === 'clean') {
    this.setState({ pageHTML: "<div><nav style='text-align: center;'>\n<div class='nav-wrapper'>\n<h1><a href='#' style='text-align: center;'>YOUR SITE NAME</a></h1>\n<p style='text-align: center'>The best words on the internet</p>\n</div>\n</nav>\n<div style='max-width: 75%;margin: auto;margin-bottom: 25px;margin-top:50px;padding-top:25px;'>\n{{#posts}}\n<h3>{{title}}</h3>\n{{#if featureImg}}\n<img style='max-width:50%;margin:auto;' src={{featureImg}} alt={{title}} />\n{{/if}}\n<h5>{{author}}</h5>\n<h5>{{lastUpdated}}</h5>\n<a style='color:#fff' href={{link}}><button class='btn black'>Read More</button></a>\n<hr />\n{{/posts}}\n</div>\n</div>" })
  } else if(name === 'night') {
    this.setState({ pageHTML: "<div style='background: #282828;color:#eee;padding-bottom:45px;'>\n<div style='background: #000;width:100%;padding:10px;'>\n<h1>Your Site Name</h1>\n</div>\n<div style='margin:auto;margin-top: 65px; max-width: 85%;margin-bottom:45px;'>\n{{#posts}}\n<div style='margin-top:25px;'>\n</div>\n<p>{{lastUpdated}}</p>\n<h3>{{title}}</h3>\n{{#if featureImg}}\n<img src={{featureImg}} style='max-width:50%;margin:auto;' alt={{title}} />\n{{/if}}\n<p>Written by {{author}}</p>\n<a href={{link}} style='color:#000'><button style='color:#000;background: #eee;' class='btn'>Read</button></a>\n{{/posts}}\n</div>\n</div>\n</div>" })
  }
}

export function setPostTheme(name) {
  if(name === 'card') {
    this.setState({
      postHTML: "<div>\n<nav>\n<div class='nav-wrapper'>\n<h3 style='margin-left:10px;'><a href='#' className='brand-logo'>Your Name or Image</a></h3>\n</div>\n</nav>\n<div style='padding:15px;margin:auto;margin-top:45px;max-width:85%;' class='card'>\n<h3>{{title}}</h3>\n<p>{{author}}</p>\n<p>{{published}}</p>\n<div id='designed-post-content'></div>\n</div>\n</div>"
    })
  } else if(name === 'clean') {
    this.setState({
      postHTML: "<div>\n<nav style='text-align: center;'>\n<div class='nav-wrapper'>\n<h1><a href='#' style='text-align: center;'>YOUR SITE NAME</a></h1>\n</div>\n</nav>\n<div style='max-width: 75%;margin: auto;margin-bottom: 25px'>\n<h3>{{title}}</h3>\n<p>By {{author}}</p>\n<div id='designed-post-content'></div>\n</div>\n</div>"
    })
  } else if(name === 'night') {
    this.setState({
      postHTML: "<div style='background: #282828;color:#eee;padding-bottom:45px;'>\n<div style='background: #000;width:100%;padding:10px;'>\n<h1>Your Site Name</h1>\n</div>\n<div style='margin:auto;margin-top: 65px; max-width: 85%;margin-bottom:45px;'>\n<h3 style='text-align:center;'>{{title}}</h3>\n<p style='text-align:center;'> Published on {{published}} by {{author}}</p>\n<div id='designed-post-content'></div>\n</div>\n</div>"
    })
  }
}

export function handleCodeChanges(value) {
  const object = {};
  object.accountId = this.state.accountId;
  object.accountName = this.state.accountName;
  object.pageHTML = value;
  this.setState({ pageHTML: value, mainPage: object, editing: true });
}

export function handlePostCodeChanges(value) {
  const object = {};
  object.accountId = this.state.accountId;
  object.postHTML = value;
  this.setState({ postHTML: value, postPage: object, editing: true });
}

export function saveMainHtml() {
  const object = {};
  object.accountId = this.state.accountId;
  object.accountName = this.state.accountName;
  object.pageHTML = this.state.pageHTML;
  this.setState({ mainPage: object }, () => {
    this.setState({ loading: true });
    putFile('mainpagedesign.json', JSON.stringify(this.state.mainPage), {encrypt: false})
      .then(() => {
        this.loadPublicPostsCollection();
        this.setState({ loading: false, editing: false });
      })
      .catch(error => {
        console.log(error);
      })
  });
}

export function loadMainHtml() {
  getFile('mainpagedesign.json', {decrypt: false})
    .then((fileContents) => {
      this.setState({
        pageHTML: JSON.parse(fileContents || '{}').pageHTML
      })
    })
    .then(() => {
      if(this.state.pageHTML === undefined || this.state.pageHTML === "") {
        this.setState({
          pageHTML: "<div style='max-width:75%;margin:auto;text-align:center;'>\n<h1>Your Publication Name</h1>\n{{#posts}}\n<div style='padding:15px;margin:20px;' class='card'>\n<h3>{{title}}</h3>\n<p>A post by {{author}}</p>\n<p>Published {{lastUpdated}}</p>\n<a style='color: #000' href={{link}}><button style='color:#fff' class='btn black'>Read it</button></a>\n</div>\n{{/posts}}\n</div>"
        })
      }
    })
    .catch(error => {
      console.log(error);
    })
}

export function loadMainHtmlPublic() {
  const userToLoadFrom = window.location.href.split('/')[4].split('?')[0];
  const url ='https://gaia-gateway.com/';
  if(window.location.origin === 'http://localhost:3000'){
    axios.get(url + userToLoadFrom + '/localhost%3A3000/mainpagedesign.json')
    .then((response) => {
      this.setState({ pageHTML: response.data.pageHTML });
    })
    .then(() => {
      if(this.state.pageHTML === undefined || this.state.pageHTML === "") {
        this.setState({
          pageHTML: "<div style='max-width:75%;margin:auto;text-align:center;'>\n<h1>Your Publication Name</h1>\n{{#posts}}\n<div style='padding:15px;margin:20px;' class='card'>\n<h3>{{title}}</h3>\n<p>A post by {{author}}</p>\n<p>Published {{lastUpdated}}</p>\n<a href={{link}}><button class='btn'>Read it</button></a>\n</div>\n{{/posts}}\n</div>"
        })
      }
    })
    .catch(error => {
      console.log(error);
    })
  } else if (window.location.origin === 'https://publishing.graphitedocs.com') {
    axios.get('https://gaia-gateway.com/' + userToLoadFrom + '/publishing.graphitedocs.com/mainpagedesign.json')
    .then((response) => {
      this.setState({ pageHTML: response.data.pageHTML });
    })
    .then(() => {
      if(this.state.pageHTML === undefined || this.state.pageHTML === "") {
        this.setState({
          pageHTML: "<div style='max-width:75%;margin:auto;text-align:center;'>\n<h1>Your Publication Name</h1>\n{{#posts}}\n<div style='padding:15px;margin:20px;' class='card'>\n<h3>{{title}}</h3>\n<p>A post by {{author}}</p>\n<p>Published {{lastUpdated}}</p>\n<a href={{link}}><button class='btn'>Read it</button></a>\n</div>\n{{/posts}}\n</div>"
        })
      }
    })
    .catch(error => {
      console.log(error);
    })
  } else {
    axios.get('https://gaia-gateway.com/' + userToLoadFrom + '/staging-publishing.graphitedocs.com/mainpagedesign.json')
    .then((response) => {
      this.setState({ pageHTML: response.data.pageHTML });
    })
    .then(() => {
      if(this.state.pageHTML === undefined || this.state.pageHTML === "") {
        this.setState({
          pageHTML: "<div style='max-width:75%;margin:auto;text-align:center;'>\n<h1>Your Publication Name</h1>\n{{#posts}}\n<div style='padding:15px;margin:20px;' class='card'>\n<h3>{{title}}</h3>\n<p>A post by {{author}}</p>\n<p>Published {{lastUpdated}}</p>\n<a href={{link}}><button class='btn'>Read it</button></a>\n</div>\n{{/posts}}\n</div>"
        })
      }
    })
    .catch(error => {
      console.log(error);
    })
  }
}

export function loadFile() {
  axios.get(link + 'mainpagedesign.json')
    .then((response) => {
      html = response.data;
      console.log(html);
      this.setState({ pageHTML: html.pageHTML})
    })
    .catch(error => {
      console.log(error);
    });
}

export function savePostHtml() {
  const object = {};
  object.accountId = this.state.accountId;
  object.postHTML = this.state.postHTML;
  this.setState({ postHTML: this.state.postHTML, postPage: object, editing: true }, () => {
    this.setState({ loading: true });
    putFile('postpagedesign.json', JSON.stringify(this.state.postPage), {encrypt: false})
      .then(() => {
        this.loadPublicPostsCollection();
        this.setState({ loading: false, editing: false });
      })
      .catch(error => {
        console.log(error);
      })
  });
}

export function loadPostHtml() {
  getFile('postpagedesign.json', {decrypt: false})
    .then((fileContents) => {
      this.setState({
        postHTML: JSON.parse(fileContents || '{}').postHTML,
      })
    })
    .then(() => {
      console.log(this.state.postHTML)
      if(this.state.postHTML === undefined || this.state.postHTML === "") {
        this.setState({
          postHTML: "<div style='max-width:80%;margin: auto;'>\n<h3 style='text-align:center;'>{{title}}</h3>\n<h5>Published: {{published}}</h5>\n{{#if featuredImg}}\n<img class='responsive-img' src={{featuredImg}} alt='post feature'/>\n{{/if}}\n<div>\n<div id='designed-post-content'></div>\n</div>\n</div>"
        })
      }
    })
    .catch(error => {
      console.log(error);
    })
}

export function loadPostHtmlPublic() {
  const userToLoadFrom = window.location.href.split('/sites/')[1].split('/')[0];
  const url = 'https://gaia-gateway.com/';
  let origin;
  if(window.location.origin === 'http://localhost:3000') {
    origin = '/localhost%3A3000';
  } else if(window.location.origin === 'https://staging-publishing.graphitedocs.com') {
    origin = '/staging-publishing.graphitedocs.com';
  } else {
    origin = '/publishing.graphitedocs.com';
  }
  axios.get(url + userToLoadFrom + origin + '/postpagedesign.json')
  .then((response) => {
    this.setState({
      postHTML: response.data.postHTML,
    })
  })
  .then(() => {
    if(this.state.postHTML === undefined) {
      this.setState({
        postHTML: "<div style='max-width:80%;margin: auto;'>\n<h3 style='text-align:center;'>{{title}}</h3>\n<div>\n<h5>Published: {{published}}</h5>\n<div id='designed-post-content'></div>\n</div>\n</div>"
      })
    }
  })
  .catch(error => {
    console.log(error);
  })
}
