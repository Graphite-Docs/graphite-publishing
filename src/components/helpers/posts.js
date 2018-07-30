import {
  loadUserData,
  putFile,
  getFile
} from 'blockstack';
import {
  getDate
} from './helpers';
const uuidv4 = require('uuid/v4');

export function newPost() {
  const object = {};
  const objectTwo = {};
  object.id = uuidv4();
  object.author = loadUserData().username;
  object.title = "Untitled";
  object.status = "Draft";
  object.tags = [];
  object.wordcount = 0;
  object.forReview = false;
  object.needsEdits = false;
  object.createdDate = getDate();
  object.lastUpdated = getDate();
  objectTwo.id = object.id;
  objectTwo.author = loadUserData().username;
  objectTwo.title = "Untitled";
  objectTwo.content = "";
  objectTwo.status = "Draft";
  objectTwo.shortDescription = "";
  objectTwo.tags = [];
  objectTwo.featureImg = ""
  objectTwo.wordcount = 0;
  objectTwo.forReview = false;
  objectTwo.needsEdits = false;
  objectTwo.createdDate = getDate();
  objectTwo.lastUpdated = getDate();
  this.setState({ myPosts: [...this.state.myPosts, object], posts: [...this.state.posts, object] });
  this.setState({ filteredPosts: [...this.state.filteredPosts, object] });
  this.setState({ singlePost: objectTwo });
  this.setState({ tempDocId: object.id });
  setTimeout(this.savePostsCollection, 300);
}

export function savePostsCollection() {
  putFile("posts.json", JSON.stringify(this.state.myPosts), {encrypt:true})
    .then(() => {
      this.saveNewSinglePost();
    })
    .catch(e => {
      console.log("e");
      console.log(e);
    });
}

export function saveNewSinglePost() {
  const file = this.state.tempDocId;
  const fullFile = '/posts/' + file + '.json'
  putFile(fullFile, JSON.stringify(this.state.singlePost), {encrypt:true})
    .then(() => {
      console.log("Saved!");
      this.setState({ redirect: true });
    })
    .catch(e => {
      console.log("e");
      console.log(e);
    });
}

export function loadMyPublishedPosts() {
  getFile('posts.json', {decrypt: true})
    .then((fileContents) => {
      this.setState({ myPosts: JSON.parse(fileContents || '{}'), posts: JSON.parse(fileContents || '{}') });
    })
}

export function loadPublishedPosts() {
    if(this.state.count < this.state.team.length) {
      console.log(this.state.team[this.state.count].name);
      const file = this.state.team[this.state.count].name + 'publishedPostscollection.json';
      const options = { username: this.state.team[this.state.count].name, zoneFileLookupURL: "https://core.blockstack.org/v1/names", decrypt: false}
        getFile(file, options)
         .then((fileContents) => {
           if(fileContents) {
             console.log("found a file: ");
             console.log(JSON.parse(fileContents || "{}"))
             this.setState({ publishedPostCollection: this.state.publishedPostCollection.concat(JSON.parse(fileContents || "{}")) })
             this.setState({count: this.state.count + 1});
           } else {
             this.setState({count: this.state.count + 1});
           }
         })
          .then(() => {
            this.loadPublishedCollections();
          })
          .catch(error => {
            console.log(error);
            this.setState({count: this.state.count + 1});
            this.loadPublishedCollections();
          });
    } else {
      console.log("All published files loaded");
      this.setState({ count: 0 });
      this.loadMainAdminPublished();
    }
  }
