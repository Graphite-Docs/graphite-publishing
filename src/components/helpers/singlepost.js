import {
  loadUserData
} from 'blockstack';
import { setGlobal, getGlobal } from 'reactn';
import {
  getDate
} from './helpers';
import  Post  from '../models/posts';
import  PublicPost  from '../models/publicPosts';
import { loadMyPublishedPosts } from './posts';
var timer = null;

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

export async function loadSingle() {
  setGlobal({ loading: true })
  const single = await Post.fetchList({ _id: window.location.href.split('posts/')[1] });
  console.log(single);
  if(single.length > 0) {
    let thisPost = single[0].attrs;
    console.log(thisPost.status)
    setGlobal({
      title: thisPost.title || "",
      content: thisPost.content || "",
      createdDate: thisPost.createdAt || "",
      postURL: thisPost.url || "",
      featuredImg: thisPost.featureImg || "",
      publishPost: thisPost.publishPost || false,
      status: thisPost.status || "Draft", 
      convergence: thisPost.convergence
    }, () => {
      if(getGlobal().status === 'Published') {
        setGlobal({
          publishPost: true, 
          loading: false
        })
      }
      let markupStr = getGlobal().content;
      if(markupStr !=="") {
       window.$('.summernote').summernote('code', markupStr);
      }
    })
  } 
}

export async function handleTitleChange(e) {
      window.$('#title-input').keydown(function(){
        clearTimeout(timer); 
        timer = setTimeout(handleSavePost, 1000)
      });
      
  await setGlobal({
    title: e.target.value,
    editing: true,
  });
}

export function handlePostURL(e) {
  setGlobal({ postURL: e.target.value });
}

export function onSwitchClick(e) {
  setGlobal({publishPost: !getGlobal().publishPost})
}

export function onConvergenceClick(e) {
  setGlobal({convergence: !getGlobal().convergence})
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

export function bigTest() {
  console.log("Saving")
}

export async function handleSavePost() {
  setGlobal({ save: "Saving..." })
  const single = await Post.fetchList({ _id: window.location.href.split('posts/')[1] });
  let post = single[0];
  const newAttributes = {
    title: getGlobal().title, 
    content: getGlobal().content,
    tags: getGlobal().tags,
    lastUpdated: getDate(),
    featureImg: getGlobal().featuredImg,
    status:  getGlobal().publishPost ? "Published" : "Draft", 
    convergence: getGlobal().convergence
  }
  await post.update(newAttributes)
  await post.save();
  await setGlobal({
    status: getGlobal().publishPost ? "Published" : "Draft", 
    save: "Save"
  })
  
  if(getGlobal().status === "Published") {
    const publicPosts = await PublicPost.fetchList({ _id: `Public${window.location.href.split('posts/')[1]}` })
    console.log(publicPosts)
    if(publicPosts.length > 0) {
      let thisPublic = publicPosts[0];
      const newPublicAttrs = {
        title: getGlobal().title, 
        author: loadUserData().username,
        content: getGlobal().content,
        tags: getGlobal().tags,
        link: `${window.location.origin}/sites/${loadUserData().username}/public/${window.location.href.split('posts/')[1]}`,
        lastUpdated: getDate(),
        publishedDate: getDate(),
        featureImg: getGlobal().featuredImg,
        convergence: getGlobal().convergence
      }
      await thisPublic.update(newPublicAttrs)
      await thisPublic.save();
    } else {
      const publicPost = await new PublicPost({
        _id: `Public${window.location.href.split('posts/')[1]}`,
        title: getGlobal().title, 
        author: loadUserData().username,
        content: getGlobal().content,
        tags: getGlobal().tags,
        link: `${window.location.origin}/sites/${loadUserData().username}/public/${window.location.href.split('posts/')[1]}`,
        lastUpdated: getDate(),
        publishedDate: getDate(),
        featureImg: getGlobal().featuredImg,
        convergence: getGlobal().convergence
      })
      await publicPost.save();
      console.log(publicPost)
    }
  } else {
    console.log("not public")
  }
  loadMyPublishedPosts()
}

export async function handleContentChange(props) {
  setGlobal({ content: props, editing: true }, () => {
    clearTimeout(timer); 
    timer = setTimeout(handleSavePost, 1000)
  });
}

export async function loadSinglePublic() {
  setGlobal({ loading: true });
  const posts = await PublicPost.fetchList({ _id: `Public${window.location.href.split('public/')[1]}` }, {decrypt: false});
  
  let post = posts[0];
  console.log(post);
  await setGlobal({
    title: post.attrs.title,
    content: post.attrs.content,
    author: post.attrs.author,
    createdDate: post.attrs.createdDate,
    featuredImg: post.attrs.featureImg || "",
    lastUpdated: post.attrs.lastUpdated
  })
  var data, template;

  data = {
      "title" : getGlobal().title,
      "content" : getGlobal().content,
      "author" : getGlobal().author,
      "published" : getGlobal().lastUpdated,
      "featuredImg" : getGlobal().featuredImg
  }
  console.log(data)
  template = await window.Handlebars.compile(getGlobal().postHTML);
  await window.$('#designed-post').html(template(data));
  await window.$('#designed-post-content').html(data.content);
  setGlobal({ loading: false });
}
