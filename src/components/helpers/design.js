import {
  putFile,
  getFile
} from 'blockstack';
import axios from 'axios';
let link;
let html;

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
  this.setState({ loading: true });
  putFile('mainpagedesign.json', JSON.stringify(this.state.mainPage), {encrypt: false})
    .then(() => {
      this.loadPublicPostsCollection();
      this.setState({ loading: false, editing: false });
    })
    .catch(error => {
      console.log(error);
    })
}

export function loadMainHtml() {
  getFile('mainpagedesign.json', {decrypt: false})
    .then((fileContents) => {
      this.setState({
        pageHTML: JSON.parse(fileContents || '{}').pageHTML
      })
    })
    .catch(error => {
      console.log(error);
    })
}

export function loadMainHtmlPublic() {
  const userToLoadFrom = window.location.href.split('/')[4].split('?')[0];
  const url ='https://gaia-gateway.com/';
  if(window.location.origin === 'http://localhost:3000'){
    console.log("bingo");
    axios.get(url + userToLoadFrom + '/localhost%3A3000/mainpagedesign.json')
    .then((response) => {
      this.setState({ pageHTML: response.data.pageHTML });
    })
    .then(() => {
      console.log(this.state.pageHTML);
    })
    .catch(error => {
      console.log(error);
    })
  } else if (window.location.origin === 'https://app.graphitedocs.com') {
    axios.get('https://gaia-gateway.com/' + userToLoadFrom + '/app.graphitedocs.com/mainpagedesign.json')
    .then((response) => {
      this.setState({ pageHTML: response.data.pageHTML });
    })
    .catch(error => {
      console.log(error);
    })
  } else {
    axios.get('https://gaia-gateway.com/' + userToLoadFrom + '/serene-hamilton-56e88e.netlify.com/mainpagedesign.json')
    .then((response) => {
      this.setState({ pageHTML: response.data.pageHTML });
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
  this.setState({ loading: true });
  putFile('postpagedesign.json', JSON.stringify(this.state.postPage), {encrypt: false})
    .then(() => {
      this.loadPublicPostsCollection();
      this.setState({ loading: false, editing: false });
    })
    .catch(error => {
      console.log(error);
    })
}

export function loadPostHtml() {
  getFile('postpagedesign.json', {decrypt: false})
    .then((fileContents) => {
      console.log(JSON.parse(fileContents || '{}'))
      this.setState({
        postHTML: JSON.parse(fileContents || '{}').postHTML,
      })
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
    console.log(this.state.postHTML);
  })
  .catch(error => {
    console.log(error);
  })
}
