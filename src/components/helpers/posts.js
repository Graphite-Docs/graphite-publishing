import {
  loadUserData,
  putFile,
  getFile
} from 'blockstack';
import {
  getDate
} from './helpers';
import axios from 'axios';
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
  object.link = window.location.origin + '/public/' + this.state.ownerBlockstackId + '/posts/' + object.id;
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
  setTimeout(this.savePostsCollection, 300);
  // setTimeout(this.savePostCollectionToTeam, 300);
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
  this.setState({ editing: false });
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
      } else {
        this.savePublicPostsCollection()
      }

      // if(this.state.status === "Published") {
      //  this.savePublicPostsCollection()
      // }

    })
    .catch(e => {
      console.log("e");
      console.log(e);
    });
}

export function savePublicPostsCollection() {
  const { myPosts } = this.state;
  var publishedPosts = myPosts.filter(post => post.status === "Published");
  putFile("publicposts.json", JSON.stringify(publishedPosts), {encrypt:false})
    .then(() => {
      this.saveNewSinglePublicPost();
    })
    .catch(e => {
      console.log("e");
      console.log(e);
    });
}

export function saveNewSinglePublicPost() {
  let file;
  if(this.state.tempDocId !== "") {
    file = this.state.tempDocId;
  } else {
    file = window.location.pathname.split('/post/')[1];
  }
  const fullFile = 'public/' + file + '.json'
  if(this.state.status === "Published") {
    putFile(fullFile, JSON.stringify(this.state.singlePost), {encrypt:false})
      .then(() => {
        console.log("Saved!");
        this.setState({ loading: false });
      })
      .catch(e => {
        console.log("e");
        console.log(e);
      });
  } else {
    const object = {};
    putFile(fullFile, JSON.stringify(object), {encrypt:false})
      .then(() => {
        console.log("Saved!");
        this.setState({ loading: false });
      })
      .catch(e => {
        console.log("e");
        console.log(e);
      });
  }

}

export function loadPublicPostsCollection() {
  let userToLoadFrom;
  if(window.location.pathname === '/design') {
    userToLoadFrom = this.state.ownerBlockstackId;
    const options = { username: userToLoadFrom, zoneFileLookupURL: "https://core.blockstack.org/v1/names", decrypt: false, verify: false}
    getFile('publicposts.json', options)
      .then((fileContents) => {
        console.log(JSON.parse(fileContents || '{}'))
        this.setState({ publicPosts: JSON.parse(fileContents || '{}') });
      })
      .then(() => {
          var data,
           template;
          let posts = this.state.publicPosts;
          data = {
            "posts" : posts
          }
           // source = document.getElementById("handlebars-template").innerHTML;
           template = window.Handlebars.compile(JSON.stringify(this.state.pageHTML));
           window.$('#designed-page').html(template(data));
      })
      .then(() => {
        let publicPosts = this.state.publicPosts;
        if(publicPosts.length > 0) {
          var data, template;
          let postCount = publicPosts.length;
          let randomPostIndex = Math.floor(Math.random() * postCount) + 0 ;
          let randomPost = publicPosts[randomPostIndex];
          const fullFile = '/posts/' + randomPost.id + '.json';
          getFile(fullFile, {decrypt: true})
            .then((fileContents) => {
              data = {
                "title" : JSON.parse(fileContents).title || "",
                "content" : JSON.parse(fileContents).content || "",
                "author" : JSON.parse(fileContents).author || "",
                "published" : JSON.parse(fileContents).lastUpdated || "",
                "featuredImg" : JSON.parse(fileContents).featureImg || "",
                "link" : window.location.origin + '/public/' + this.state.ownerBlockstackId + '/posts/' + JSON.parse(fileContents).id
              }
            })
            .then(() => {
              template = window.Handlebars.compile(this.state.postHTML);
              window.$('#designed-post').html(template(data));
              window.$('#designed-post-content').html(data.content);
            })
            .catch(error => {
              console.log(error);
            })

        }

      })
  } else {
    userToLoadFrom = window.location.href.split('/')[4].split('?')[0]
    const url ='https://gaia-gateway.com/';
    if(window.location.origin === 'http://localhost:3000'){
      console.log("bingo");
      axios.get(url + userToLoadFrom + '/localhost%3A3000/publicposts.json')
      .then((response) => {
        this.setState({ publicPosts: response.data });
      })
      .then(() => {
        var data,
         template;
        let posts = this.state.publicPosts;
        data = {
          "posts" : posts
        }
         // source = document.getElementById("handlebars-template").innerHTML;
         template = window.Handlebars.compile(this.state.pageHTML);
         window.$('#designed-page').html(template(data));
      })
      .catch(error => {
        console.log(error);
      })
    } else if (window.location.origin === 'https://app.graphitedocs.com') {
      axios.get('https://gaia-gateway.com/' + userToLoadFrom + '/app.graphitedocs.com/publicposts.json')
      .then((response) => {
        this.setState({ publicPosts: response.data });
      })
      .then(() => {
        var data,
         template;
        let posts = this.state.publicPosts;
        data = {
          "posts" : posts
        }
         // source = document.getElementById("handlebars-template").innerHTML;
         template = window.Handlebars.compile(this.state.pageHTML);
         window.$('#designed-page').html(template(data));
      })
      .catch(error => {
        console.log(error);
      })
    } else {
      axios.get('https://gaia-gateway.com/' + userToLoadFrom + '/serene-hamilton-56e88e.netlify.com/publicposts.json')
      .then((response) => {
        this.setState({ publicPosts: response.data });
      })
      .then(() => {
        var data,
         template;
        let posts = this.state.publicPosts;
        data = {
          "posts" : posts
        }
         // source = document.getElementById("handlebars-template").innerHTML;
         template = window.Handlebars.compile(this.state.pageHTML);
         window.$('#designed-page').html(template(data));
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

}

export function loadMyPublishedPosts() {
  getFile('posts.json', {decrypt: true})
    .then((fileContents) => {
      if(fileContents) {
        this.setState({ myPosts: JSON.parse(fileContents || '{}'), filteredPosts: JSON.parse(fileContents || '{}'), posts: JSON.parse(fileContents || '{}'), postLoadingDone: true });
      } else {
        this.setState({ myPosts: [], posts: [], postLoadingDone: true });
      }
    })
    // .then(() => {
    //   this.loadPublishedPosts();
    // })
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

  export function loadPostToDelete(props) {
    let posts = this.state.myPosts;
    const thisPost = posts.find((post) => { return post.id === props.id });
    let index = thisPost && thisPost.id;
    function findObjectIndex(post) {
        return post.id === index;
    }
    this.setState({index: posts.findIndex(findObjectIndex), tempDocId: props.id });
    setTimeout(this.deletePost);
  }

  export function deletePost() {
    const fullFile = '/posts/' + this.state.tempDocId + '.json';
    const object = {};

    putFile(fullFile, JSON.stringify(object), {encrypt: true})
      .then(() => {
        let updatedArray = window.$.grep(this.state.myPosts, function(e){
             return e.id !== this.state.tempDocId;
        }.bind(this));
        this.setState({singlePost: {}, myPosts: updatedArray, posts: updatedArray, filteredPosts: updatedArray });
        window.$('#deleteModal').modal('close')
        setTimeout(this.saveUpdatePostCollection, 300);
      })
      .catch(error => {
        console.log(error);
      })

  }

  export function saveUpdatePostCollection() {
    putFile("posts.json", JSON.stringify(this.state.myPosts), {encrypt:true})
      .then(() => {
        this.saveUpdatedPublicPostsCollection();
      })
      .catch(e => {
        console.log("e");
        console.log(e);
      });
  }

  export function saveUpdatedPublicPostsCollection() {
    const { myPosts } = this.state;
    var publishedPosts = myPosts.filter(post => post.status === "Published");
    putFile("publicposts.json", JSON.stringify(publishedPosts), {encrypt:false})
      .then(() => {
        this.loadMyPublishedPosts();
      })
      .catch(e => {
        console.log("e");
        console.log(e);
      });
  }

  export function filterList(event){
    var updatedList = this.state.myPosts;
    updatedList = updatedList.filter(function(item){
      return item.title.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({filteredPosts: updatedList});
  }
