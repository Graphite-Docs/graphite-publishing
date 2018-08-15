import {
  putFile,
  getFile
} from 'blockstack';
// import axios from 'axios';

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
  console.log(userToLoadFrom)
  const options = { username: userToLoadFrom, zoneFileLookupURL: "https://core.blockstack.org/v1/names", decrypt: false}
  getFile('mainpagedesign.json', options)
    .then((fileContents) => {
      console.log(JSON.parse(fileContents))
      this.setState({
        pageHTML: JSON.parse(fileContents || '{}').pageHTML,
        accountName: JSON.parse(fileContents || '{}').accountName
      })
    })
    .catch(error => {
      console.log(error);
    })
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
  const userToLoadFrom = window.location.href.split('/public/')[1].split('/')[0];
  const options = { username: userToLoadFrom, zoneFileLookupURL: "https://core.blockstack.org/v1/names", decrypt: false}
  getFile('postpagedesign.json', options)
    .then((fileContents) => {
      this.setState({
        postHTML: JSON.parse(fileContents || '{}').postHTML,
      })
    })
    .catch(error => {
      console.log(error);
    })
}
