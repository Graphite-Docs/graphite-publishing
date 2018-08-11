import {
  getFile,
  loadUserData
} from 'blockstack';
import {
  getDate
} from './helpers';
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
     console.log(JSON.parse(fileContents || '{}'));
      this.setState({
        title: JSON.parse(fileContents || '{}').title,
        content: JSON.parse(fileContents || '{}').content,
        createdDate: JSON.parse(fileContents || '{}').createdDate,
        postURL: JSON.parse(fileContents || '{}').url || JSON.parse(fileContents || '{}').title.replace(/\s+/, "-"),
        featuredImg: JSON.parse(fileContents || '{}').featureImg || "",
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
    unsavedChanges: true,
  });
  // clearTimeout(this.timeout);
  // this.timeout = setTimeout(this.handleAutoAdd, 1500)
}

export function handlePostURL(e) {
  this.setState({ postURL: e.target.value });
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
       this.setState({featuredImg: object.link});
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
  object.status = "Draft";
  object.tags = [];
  object.wordcount = 0;
  object.forReview = false;
  object.needsEdits = false;
  object.createdDate = this.state.createdDate;
  object.lastUpdated = getDate();
  object.url = this.state.postURL.replace(/\s+/, "-");
  objectTwo.id = window.location.pathname.split('/post/')[1];
  objectTwo.author = loadUserData().username;
  objectTwo.title = this.state.title;
  objectTwo.content = this.state.content || "";
  objectTwo.status = this.state.status;
  objectTwo.shortDescription = "";
  objectTwo.tags = [];
  objectTwo.featureImg = this.state.featuredImg;
  objectTwo.url = this.state.postURL.replace(/\s+/, "-");
  objectTwo.wordcount = 0;
  objectTwo.forReview = false;
  objectTwo.needsEdits = false;
  objectTwo.createdDate = this.state.createdDate
  objectTwo.lastUpdated = getDate();
  const index = this.state.index;
  const updatedPost = update(this.state.myPosts, {$splice: [[index, 1, objectTwo]]});
  this.setState({singlePost: objectTwo, myPosts: updatedPost });
  setTimeout(this.savePostCollectionToTeam, 300);
}

export function handleContentChange(props) {
  this.setState({ content: props });
}
