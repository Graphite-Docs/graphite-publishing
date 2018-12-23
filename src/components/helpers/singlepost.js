import {
  getFile,
  loadUserData
} from 'blockstack';
import {
  getDate
} from './helpers';
import axios from 'axios';
import update from 'immutability-helper';

export function loadPost() {
    this.setState({postLoading: true})
    let posts = this.state.myPosts;
    const thisPost = posts.find((post) => { return post.id === window.location.pathname.split('/post/')[1]});
    let index = thisPost && thisPost.id;
    function findObjectIndex(post) {
        return post.id === index;
    }
    this.setState({index: posts.findIndex(findObjectIndex)})
    setTimeout(this.loadSingle, 200);
}

export function loadSingle() {
  const fullFile = '/posts/' + window.location.pathname.split('/post/')[1] + '.json';

  getFile(fullFile, {decrypt: true})
   .then((fileContents) => {
      this.setState({
        title: JSON.parse(fileContents || '{}').title,
        content: JSON.parse(fileContents || '{}').content,
        createdDate: JSON.parse(fileContents || '{}').createdDate,
        postURL: JSON.parse(fileContents || '{}').url || JSON.parse(fileContents || '{}').title.replace(/\s+/, "-"),
        featuredImg: JSON.parse(fileContents || '{}').featureImg || "",
        publishPost: JSON.parse(fileContents || '{}').publishPost || false,
        status: JSON.parse(fileContents || '{}').status || "Draft",
     })
   })
   .then(() => {
     this.setState({postLoading: false})
     let markupStr = this.state.content;
     if(markupStr !=="") {
       window.$('.summernote').summernote('code', markupStr);
     }
   })
    .catch(error => {
      console.log(error);
    });
}

export function handleTitleChange(e) {
  this.setState({
    title: e.target.value,
    editing: true,
  });
  // clearTimeout(this.timeout);
  // this.timeout = setTimeout(this.handleAutoAdd, 1500)
}

export function handlePostURL(e) {
  this.setState({ postURL: e.target.value });
}

export function onSwitchClick(e) {
  const target = e.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  this.setState({ publishPost: value })
}

export function handleFeaturedDrop(files) {
  var file = files[0]
  const reader = new FileReader();
  reader.onload = (event) => {
     const object = {};
     object.file = file;
     object.link = event.target.result;
     object.name = file.name;
     object.size = file.size;
     object.type = file.type;
     if(object.size > 111048576) {
       this.handleDropRejected();
       console.log("file too large")
     }else {
       this.setState({featuredImg: object.link, editing: true});
     }
   };
   reader.readAsDataURL(file);
}

export function handleSavePost() {
  this.setState({ loading: true });
  const object = {};
  const objectTwo = {};
  object.id = window.location.pathname.split('/post/')[1];
  object.author = loadUserData().username;
  object.title = this.state.title;
  object.tags = [];
  object.wordcount = 0;
  object.forReview = false;
  object.needsEdits = false;
  object.createdDate = this.state.createdDate;
  object.lastUpdated = getDate();
  object.url = this.state.postURL.replace(/\s+/, "-");
  object.link = window.location.origin + '/sites/' + this.state.ownerBlockstackId + '/public/' + window.location.pathname.split('/post/')[1];
  object.featureImg = this.state.featuredImg;
  if(this.state.publishPost === true) {
    object.status = "Published";
    objectTwo.status = "Published";
    this.setState({ status: "Published" });
  } else {
    object.status = "Draft";
    objectTwo.status = "Draft";
    this.setState({ status: "Draft" });
  }
  object.publishPost = this.state.publishPost;
  objectTwo.id = window.location.pathname.split('/post/')[1];
  objectTwo.link = window.location.origin + '/sites/' + this.state.ownerBlockstackId + '/public/' + window.location.pathname.split('/post/')[1];
  objectTwo.author = loadUserData().username;
  objectTwo.title = this.state.title;
  objectTwo.content = this.state.content || "";
  objectTwo.shortDescription = "";
  objectTwo.tags = [];
  objectTwo.featureImg = this.state.featuredImg;
  objectTwo.url = this.state.postURL.replace(/\s+/, "-");
  objectTwo.wordcount = 0;
  objectTwo.forReview = false;
  objectTwo.needsEdits = false;
  objectTwo.createdDate = this.state.createdDate
  objectTwo.publishPost = this.state.publishPost;
  objectTwo.lastUpdated = getDate();
  const index = this.state.index;
  const updatedPost = update(this.state.myPosts, {$splice: [[index, 1, object]]});
  this.setState({singlePost: objectTwo, myPosts: updatedPost });
  setTimeout(this.savePostsCollection, 300);
}

export function handleContentChange(props) {
  this.setState({ content: props, editing: true });
}

export function loadSinglePublic() {
  this.setState({ loading: true });
  const url = 'https://gaia-gateway.com';
  const userToLoadFrom = window.location.href.split('/sites/')[1].split('/')[0];
  const fullFile = 'public/' + window.location.href.split('/public/')[1] + '.json';
  let origin;
  if(window.location.origin === 'http://localhost:3000') {
    origin = 'localhost%3A3000';
  } else if(window.location.origin === 'https://staging-publishing.graphitedocs.com') {
    origin = 'staging-publishing.graphitedocs.com';
  } else {
    origin = 'publishing.graphitedocs.com';
  }
  axios.get(url + '/' + userToLoadFrom + '/' + origin + '/' + fullFile)
  .then((response) => {
     this.setState({
       title: response.data.title,
       content: response.data.content,
       author: response.data.author,
       createdDate: response.data.createdDate,
       postURL: response.data.url || response.data.title.replace(/\s+/, "-"),
       featuredImg: response.data.featureImg || "",
       publishPost: response.data.publishPost || false,
       status: response.data.status || "Draft",
       lastUpdated: response.data.lastUpdated
    })
  })
  .then(() => {
    this.loadPostHtmlPublic();
  })
  .then(() => {
    var data, template;

    data = {
      "title" : this.state.title,
      "content" : this.state.content,
      "author" : this.state.author,
      "published" : this.state.lastUpdated,
      "featuredImg" : this.state.featuredImg
    }
    template = window.Handlebars.compile(this.state.postHTML);
    window.$('#designed-post').html(template(data));
    window.$('#designed-post-content').html(this.state.content);
    })
    .then(() => {
      this.setState({ loading: false})
    })
   .catch(error => {
     console.log(error);
   });
}
