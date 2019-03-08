import {
  getFile,
  loadUserData
} from 'blockstack';
import { setGlobal, getGlobal } from 'reactn';
import {
  getDate
} from './helpers';
import axios from 'axios';
import update from 'immutability-helper';

export function loadPost() {
    setGlobal({postLoading: true})
    let posts = getGlobal().myPosts;
    const thisPost = posts.find((post) => { return post.id === window.location.pathname.split('/post/')[1]});
    let index = thisPost && thisPost.id;
    function findObjectIndex(post) {
        return post.id === index;
    }
    setGlobal({index: posts.findIndex(findObjectIndex)})
    setTimeout(this.loadSingle, 200);
}

export function loadSingle() {
  const fullFile = '/posts/' + window.location.pathname.split('/post/')[1] + '.json';

  getFile(fullFile, {decrypt: true})
   .then((fileContents) => {
      setGlobal({
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
     setGlobal({postLoading: false})
     let markupStr = getGlobal().content;
     if(markupStr !=="") {
       window.$('.summernote').summernote('code', markupStr);
     }
   })
    .catch(error => {
      console.log(error);
    });
}

export function handleTitleChange(e) {
  setGlobal({
    title: e.target.value,
    editing: true,
  });
  // clearTimeout(this.timeout);
  // this.timeout = setTimeout(this.handleAutoAdd, 1500)
}

export function handlePostURL(e) {
  setGlobal({ postURL: e.target.value });
}

export function onSwitchClick(e) {
  const target = e.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  setGlobal({ publishPost: value })
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
       setGlobal({featuredImg: object.link, editing: true});
     }
   };
   reader.readAsDataURL(file);
}

export function handleSavePost() {
  var paras = document.getElementsByTagName("p");
    for (var i=0; i < paras.length; i++) {
      var item = paras[i];
      item.style.color = '#000';
    }
  setGlobal({ loading: true });
  const object = {};
  const objectTwo = {};
  object.id = window.location.pathname.split('/post/')[1];
  object.author = loadUserData().username;
  object.title = getGlobal().title;
  object.tags = [];
  object.wordcount = 0;
  object.forReview = false;
  object.needsEdits = false;
  object.createdDate = getGlobal().createdDate;
  object.lastUpdated = getDate();
  object.url = getGlobal().postURL.replace(/\s+/, "-");
  object.link = window.location.origin + '/sites/' + getGlobal().ownerBlockstackId + '/public/' + window.location.pathname.split('/post/')[1];
  object.featureImg = getGlobal().featuredImg;
  if(getGlobal().publishPost === true) {
    object.status = "Published";
    objectTwo.status = "Published";
    setGlobal({ status: "Published" });
  } else {
    object.status = "Draft";
    objectTwo.status = "Draft";
    setGlobal({ status: "Draft" });
  }
  object.publishPost = getGlobal().publishPost;
  objectTwo.id = window.location.pathname.split('/post/')[1];
  objectTwo.link = window.location.origin + '/sites/' + getGlobal().ownerBlockstackId + '/public/' + window.location.pathname.split('/post/')[1];
  objectTwo.author = loadUserData().username;
  objectTwo.title = getGlobal().title;
  objectTwo.content = getGlobal().content || "";
  objectTwo.shortDescription = "";
  objectTwo.tags = [];
  objectTwo.featureImg = getGlobal().featuredImg;
  objectTwo.url = getGlobal().postURL.replace(/\s+/, "-");
  objectTwo.wordcount = 0;
  objectTwo.forReview = false;
  objectTwo.needsEdits = false;
  objectTwo.createdDate = getGlobal().createdDate
  objectTwo.publishPost = getGlobal().publishPost;
  objectTwo.lastUpdated = getDate();
  const index = getGlobal().index;
  const updatedPost = update(getGlobal().myPosts, {$splice: [[index, 1, object]]});
  setGlobal({singlePost: objectTwo, myPosts: updatedPost });
  setTimeout(this.savePostsCollection, 300);
}

export function handleContentChange(props) {
  setGlobal({ content: props, editing: true });
}

export function loadSinglePublic() {
  setGlobal({ loading: true });
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
     setGlobal({
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
      "title" : getGlobal().title,
      "content" : getGlobal().content,
      "author" : getGlobal().author,
      "published" : getGlobal().lastUpdated,
      "featuredImg" : getGlobal().featuredImg
    }
    template = window.Handlebars.compile(getGlobal().postHTML);
    window.$('#designed-post').html(template(data));
    window.$('#designed-post-content').html(getGlobal().content);
    })
    .then(() => {
      setGlobal({ loading: false})
    })
   .catch(error => {
     console.log(error);
   });
}
