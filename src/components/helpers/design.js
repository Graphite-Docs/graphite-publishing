import {
  putFile,
  getFile
} from 'blockstack';
// import axios from 'axios';

export function handleCodeChanges(value) {
  const object = {};
  object.accountId = this.state.accountId;
  object.pageHTML = value;
  this.setState({ pageHTML: value, mainPage: object });
}

export function saveMainHtml() {
  putFile('mainpagedesign.json', JSON.stringify(this.state.mainPage), {encrypt: false})
    .catch(error => {
      console.log(error);
    })
}

export function loadMainHtml() {
  getFile('mainpagedesign.json', {decrypt: false})
    .then((fileContents) => {
      this.setState({
        pageHTML: JSON.parse(fileContents || '{}').pageHTML,
      })
    })
    .catch(error => {
      console.log(error);
    })
}

export function loadPublic() {

}
