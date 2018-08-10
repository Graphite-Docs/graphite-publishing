import {
  loadUserData,
  putFile,
  getFile
} from 'blockstack';
import {
  getDate
} from './helpers';
const uuidv4 = require('uuid/v4');
const { getPublicKeyFromPrivate } = require('blockstack');
const { encryptECIES } = require('blockstack/lib/encryption');
const { decryptECIES } = require('blockstack/lib/encryption');

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
  this.setState({ tempDocId: object.id, redirect: true});
  // setTimeout(this.savePostsCollection, 300);
  setTimeout(this.savePostCollectionToTeam, 300);
}

export function savePostCollectionToTeam() {
  const { team, count } = this.state;
    if(team.length > count) {
      let user = team[count].name;
      let pubKey = team[count].key;
      if(this.state.logging === true) {
        console.log('Saving to ' + user);
      }
      if(loadUserData().username !== user) {
        if(pubKey) {
          if(this.state.logging === true) {
            console.log("Here's the public key: ");
            console.log(team[count].key);
          }
          const data = this.state.myPosts;
          const encryptedData = JSON.stringify(encryptECIES(pubKey, JSON.stringify(data)));
          const file = pubKey + '?publishedPostscollection.json';
          if(this.state.logging === true) {
            console.log(file);
          }
          putFile(file, encryptedData, {encrypt: false})
            .then(() => {
              if(this.state.logging === true) {
                console.log("Shared encrypted file ");
              }
              this.setState({ count: count + 1 });
              setTimeout(this.savePostCollectionToTeam, 300)
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          if(this.state.logging === true) {
            console.log("No key yet");
          }
          this.setState({ count: count + 1 });
          setTimeout(this.savePostCollectionToTeam, 300)
        }
      } else {
        if(this.state.logging === true) {
          console.log("Teammate is logged in user");
        }
        this.setState({ count: count + 1 });
        setTimeout(this.savePostCollectionToTeam, 300)
      }
    } else {
      if(this.state.logging === true) {
        console.log("Everyone synced.");
      }
      this.setState({ count: 0, newTeammateId: "", newTeammateKey: "", newTeammateName: "", newTeammateRole: "", newTeammateEmail: "", newTeammateBlockstackId: "" });
      setTimeout(this.saveSinglePostToTeam, 500);
    }
}

export function saveSinglePostToTeam() {
  const { team, count } = this.state;
    if(team.length > count) {
      let user = team[count].name;
      let pubKey = team[count].key;
      if(this.state.logging === true) {
        console.log('Saving to ' + user);
      }
      if(loadUserData().username !== user) {
        if(pubKey) {
          if(this.state.logging === true) {
            console.log("Here's the public key: ");
            console.log(team[count].key);
          }
          const data = this.state.singlePost;
          const encryptedData = JSON.stringify(encryptECIES(pubKey, JSON.stringify(data)));
          const file = this.state.team[this.state.count].blockstackId + '?' + pubKey + '?' + this.state.tempDocId + '.json';
          if(this.state.logging === true) {
            console.log(file);
          }
          putFile(file, encryptedData, {encrypt: false})
            .then(() => {
              if(this.state.logging === true) {
                console.log("Shared encrypted file ");
              }
              this.setState({ count: count + 1 });
              setTimeout(this.saveSinglePostToTeam, 300)
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          if(this.state.logging === true) {
            console.log("No key yet");
          }
          this.setState({ count: count + 1 });
          setTimeout(this.saveSinglePostToTeam, 300)
        }
      } else {
        if(this.state.logging === true) {
          console.log("Teammate is logged in user");
        }
        this.setState({ count: count + 1 });
        setTimeout(this.saveSinglePostToTeam, 300)
      }
    } else {
      if(this.state.logging === true) {
        console.log("Everyone synced.");
      }
      this.setState({ count: 0, newTeammateId: "", newTeammateKey: "", newTeammateName: "", newTeammateRole: "", newTeammateEmail: "", newTeammateBlockstackId: "" });
      setTimeout(this.savePostsCollection, 300);
    }
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
  let file;
  if(this.state.tempDocId !== "") {
    file = this.state.tempDocId;
  } else {
    file = window.location.pathname.split('/post/')[1];
  }
  const fullFile = '/posts/' + file + '.json'
  putFile(fullFile, JSON.stringify(this.state.singlePost), {encrypt:true})
    .then(() => {
      console.log("Saved!");
      this.setState({ loading: false });
      if(this.state.redirect) {
        window.location.replace('/post/' + this.state.tempDocId)
      }

    })
    .catch(e => {
      console.log("e");
      console.log(e);
    });
}

export function loadMyPublishedPosts() {
  getFile('posts.json', {decrypt: true})
    .then((fileContents) => {
      if(fileContents) {
        this.setState({ myPosts: JSON.parse(fileContents || '{}'), posts: JSON.parse(fileContents || '{}') });
      } else {
        this.setState({ myPosts: [], posts: []});
      }
    })
    .then(() => {
      this.loadPublishedPosts();
    })
    .catch(error => {
      console.log(error);
    })
}

export function loadPublishedPosts() {
  console.log(this.state.count < this.state.team.length)
    if(this.state.count < this.state.team.length) {
      console.log(this.state.team[this.state.count].blockstackId);
      const file = getPublicKeyFromPrivate(loadUserData().appPrivateKey) + '?publishedPostscollection.json';
      const privateKey = loadUserData().appPrivateKey;
      const options = { username: this.state.team[this.state.count].blockstackId, zoneFileLookupURL: "https://core.blockstack.org/v1/names", decrypt: false}
        getFile(file, options)
         .then((fileContents) => {
           if(fileContents) {
             console.log("found a file: ");
             console.log(JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))))
             this.setState({ posts: this.state.posts.concat(JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents)))) })
             this.setState({count: this.state.count + 1});
           } else {
             this.setState({count: this.state.count + 1});
           }
         })
          .then(() => {
            this.loadPublishedPosts();
          })
          .catch(error => {
            console.log(error);
            this.setState({count: this.state.count + 1});
            this.loadPublishedPosts();
          });
    } else {
      console.log("All published files loaded");
      this.setState({ count: 0, postLoadingDone: true });
    }
  }

  export function deleteAllPosts() {
    console.log("see ya")
    this.setState({ myPosts: [] });
    setTimeout(this.savePostCollectionToTeam, 300);
  }
