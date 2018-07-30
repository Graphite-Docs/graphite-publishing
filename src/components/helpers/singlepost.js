import {
  getFile,
  loadUserData
} from 'blockstack';
import {
  getDate
} from './helpers';

let id = window.location.pathname.split('/post/')[1];

export function loadPost() {
    let posts = this.state.myPosts;
    const thisPost = posts.find((post) => { return post.id === id});
    let index = thisPost && thisPost.id;
    function findObjectIndex(post) {
        return post.id === index;
    }
    this.setState({index: posts.findIndex(findObjectIndex)})
    setTimeout(this.loadSingle, 300);
}

export function loadSingle() {
  const fullFile = '/posts/' + id + '.json'

  getFile(fullFile, {decrypt: true})
   .then((fileContents) => {
     console.log(JSON.parse(fileContents || '{}'));
      this.setState({
        title: JSON.parse(fileContents || '{}').title,
        content: JSON.parse(fileContents || '{}').content,
        createdDate: JSON.parse(fileContents || '{}').createdDate
     })
   })
   .then(() => {
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
    unsavedChanges: true,
  });
  // clearTimeout(this.timeout);
  // this.timeout = setTimeout(this.handleAutoAdd, 1500)
}

export function handleSavePost() {
  const object = {};
  const objectTwo = {};
  object.id = id;
  object.author = loadUserData().username;
  object.title = this.state.title;
  object.status = "Draft";
  object.tags = [];
  object.wordcount = 0;
  object.forReview = false;
  object.needsEdits = false;
  object.createdDate = getDate();
  object.lastUpdated = getDate();
  objectTwo.id = object.id;
  objectTwo.author = loadUserData().username;
  objectTwo.title = this.state.title;
  objectTwo.content = this.state.content || "";
  objectTwo.status = "Draft";
  objectTwo.shortDescription = "";
  objectTwo.tags = [];
  objectTwo.featureImg = ""
  objectTwo.wordcount = 0;
  objectTwo.forReview = false;
  objectTwo.needsEdits = false;
  objectTwo.createdDate = this.state.createdDate
  objectTwo.lastUpdated = getDate();
  console.log(objectTwo);
}

export function handleContentChange(props) {
  this.setState({ content: props });
}
