import {
  loadUserData,
  putFile,
  getFile
} from 'blockstack';
import {
  getGlobal, setGlobal
} from 'reactn';
import {
  getDate
} from './helpers';
import  Post  from '../models/posts';
import  PublicPost  from '../models/publicPosts';
const { getPublicKeyFromPrivate } = require('blockstack');
const { encryptECIES } = require('blockstack/lib/encryption');
const { decryptECIES } = require('blockstack/lib/encryption');

export async function newPost() {
  setGlobal({loading: true})
  const post = await new Post({
    author: loadUserData().username,
    title: "Untitled",
    content: "",
    status: "Draft",
    tags: [],
    wordcount: 0,
    lastUpdated: getDate()
  })
  await post.save();
  window.location.replace(`${window.location.origin}/posts/${post._id}`)
  // setTimeout(this.savePostCollectionToTeam, 300);
}

export function savePostCollectionToTeam() {
  const { team, count } = getGlobal();
    if(team.length > count) {
      let user = team[count].name;
      let pubKey = team[count].key;
      if(getGlobal().logging === true) {
        console.log('Saving to ' + user);
      }
      if(loadUserData().username !== user) {
        if(pubKey) {
          if(getGlobal().logging === true) {
            console.log("Here's the public key: ");
            console.log(team[count].key);
          }
          const data = getGlobal().myPosts;
          const encryptedData = JSON.stringify(encryptECIES(pubKey, JSON.stringify(data)));
          const file = pubKey + '?publishedPostscollection.json';
          if(getGlobal().logging === true) {
            console.log(file);
          }
          putFile(file, encryptedData, {encrypt: false})
            .then(() => {
              if(getGlobal().logging === true) {
                console.log("Shared encrypted file ");
              }
              setGlobal({ count: count + 1 });
              setTimeout(this.savePostCollectionToTeam, 300)
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          if(getGlobal().logging === true) {
            console.log("No key yet");
          }
          setGlobal({ count: count + 1 });
          setTimeout(this.savePostCollectionToTeam, 300)
        }
      } else {
        if(getGlobal().logging === true) {
          console.log("Teammate is logged in user");
        }
        setGlobal({ count: count + 1 });
        setTimeout(this.savePostCollectionToTeam, 300)
      }
    } else {
      if(getGlobal().logging === true) {
        console.log("Everyone synced.");
      }
      setGlobal({ count: 0, newTeammateId: "", newTeammateKey: "", newTeammateName: "", newTeammateRole: "", newTeammateEmail: "", newTeammateBlockstackId: "" });
      setTimeout(this.saveSinglePostToTeam, 500);
    }
}

export function saveSinglePostToTeam() {
  const { team, count } = getGlobal();
    if(team.length > count) {
      let user = team[count].name;
      let pubKey = team[count].key;
      if(getGlobal().logging === true) {
        console.log('Saving to ' + user);
      }
      if(loadUserData().username !== user) {
        if(pubKey) {
          if(getGlobal().logging === true) {
            console.log("Here's the public key: ");
            console.log(team[count].key);
          }
          const data = getGlobal().singlePost;
          const encryptedData = JSON.stringify(encryptECIES(pubKey, JSON.stringify(data)));
          const file = getGlobal().team[getGlobal().count].blockstackId + '?' + pubKey + '?' + getGlobal().tempDocId + '.json';
          if(getGlobal().logging === true) {
            console.log(file);
          }
          putFile(file, encryptedData, {encrypt: false})
            .then(() => {
              if(getGlobal().logging === true) {
                console.log("Shared encrypted file ");
              }
              setGlobal({ count: count + 1 });
              setTimeout(this.saveSinglePostToTeam, 300)
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          if(getGlobal().logging === true) {
            console.log("No key yet");
          }
          setGlobal({ count: count + 1 });
          setTimeout(this.saveSinglePostToTeam, 300)
        }
      } else {
        if(getGlobal().logging === true) {
          console.log("Teammate is logged in user");
        }
        setGlobal({ count: count + 1 });
        setTimeout(this.saveSinglePostToTeam, 300)
      }
    } else {
      if(getGlobal().logging === true) {
        console.log("Everyone synced.");
      }
      setGlobal({ count: 0, newTeammateId: "", newTeammateKey: "", newTeammateName: "", newTeammateRole: "", newTeammateEmail: "", newTeammateBlockstackId: "" });
      setTimeout(this.savePostsCollection, 300);
    }
}

export function savePostsCollection() {
  setGlobal({ editing: false });
  putFile("posts.json", JSON.stringify(getGlobal().myPosts), {encrypt:true})
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
  if(getGlobal().tempDocId !== "") {
    file = getGlobal().tempDocId;
  } else {
    file = window.location.pathname.split('/post/')[1];
  }
  const fullFile = '/posts/' + file + '.json'
  putFile(fullFile, JSON.stringify(getGlobal().singlePost), {encrypt:true})
    .then(() => {
      console.log("Saved!");
      setGlobal({ loading: false });
      if(getGlobal().redirect) {
        window.location.replace('/post/' + getGlobal().tempDocId)
      } else {
        this.savePublicPostsCollection()
      }

      // if(getGlobal().status === "Published") {
      //  this.savePublicPostsCollection()
      // }

    })
    .catch(e => {
      console.log("e");
      console.log(e);
    });
}

export function savePublicPostsCollection() {
  const { myPosts } = getGlobal();
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
  if(getGlobal().tempDocId !== "") {
    file = getGlobal().tempDocId;
  } else {
    file = window.location.pathname.split('/post/')[1];
  }
  const fullFile = 'public/' + file + '.json'
  if(getGlobal().status === "Published") {
    putFile(fullFile, JSON.stringify(getGlobal().singlePost), {encrypt:false})
      .then(() => {
        console.log("Saved!");
        setGlobal({ loading: false });
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
        setGlobal({ loading: false });
      })
      .catch(e => {
        console.log("e");
        console.log(e);
      });
  }

}

export async function loadPostPreview() {
    await loadMyPublishedPosts();
    if(getGlobal().posts.length > 0) {
      let posts = getGlobal().posts.filter(a => a.attrs.status === "Published");
      var data, template;
      let postCount = posts.length;
      let randomPostIndex = Math.floor(Math.random() * postCount) + 0 ;
      let randomPost = posts[randomPostIndex];
      console.log(randomPost)
      const single = await Post.fetchList({ _id: randomPost._id });
      if(single.length > 0) {
        let thisPost = single[0].attrs;
        console.log(thisPost.status)
        data = await {
          title: thisPost.title,
          content: thisPost.content,
          author: thisPost.author,
          published: thisPost.lastUpdated ,
          postURL: thisPost.url,
          featuredImg: thisPost.featureImg
        }
      }

        template = window.Handlebars.compile(getGlobal().postHTML);
        window.$('#designed-post').html(template(data));
        window.$('#designed-post-content').html(data.content);
        document.getElementById('dimmer').style.display = 'block';
        document.getElementById('designed-post-modal').style.display = 'block';
  }
} 

export async function loadPublicSitePosts() {
  // setGlobal({ loading: true })
  var data,
    template;
  const posts = await PublicPost.fetchList({ author: window.location.href.split('sites/')[1].split('#')[0] }, {decrypt: false});
  console.log(posts)
  await setGlobal({ publicPosts: posts.filter(a => a.attrs.deleted !== true) });
  let filteredPosts = getGlobal().publicPosts.map(x => x.attrs);
  data = {
    "posts" : filteredPosts.sort((a,b) => (new Date(a.publishedDate).getTime() > new Date(b.publishedDate).getTime()) ? 1 : ((new Date(b.publishedDate).getTime() > new Date(a.publishedDate).getTime()) ? -1 : 0))
  }
  template = window.Handlebars.compile(getGlobal().pageHTML);
  window.$('#designed-page').html(template(data));
  // setGlobal({ loading: false });
}

export async function loadPublicPostsCollection() {
  await loadMyPublishedPosts();
  let posts = await getGlobal().posts;
  document.getElementById('dimmer').style.display = 'block';
  document.getElementById('designed-page-modal').style.display = 'block';
  var data,
    template;
  
  let filteredPosts = posts.map(x => x.attrs);
  console.log(filteredPosts)
  data = {
    "posts" : filteredPosts.filter(a => a.deleted !==true)
  }
    // source = document.getElementById("handlebars-template").innerHTML;
    template = window.Handlebars.compile(getGlobal().pageHTML);
    window.$('#designed-page').html(template(data));
  // if(window.location.pathname === '/design') {
  //   userToLoadFrom = getGlobal().ownerBlockstackId;
  //   const options = { username: userToLoadFrom, zoneFileLookupURL: "https://core.blockstack.org/v1/names", decrypt: false, verify: false}
  //   getFile('publicposts.json', options)
  //     .then((fileContents) => {
  //       console.log(JSON.parse(fileContents || '{}'))
  //       setGlobal({ publicPosts: JSON.parse(fileContents || '{}').slice(0).reverse() });
  //     })
  //     .then(() => {
  //         var data,
  //          template;
  //         let posts = getGlobal().publicPosts;
  //         data = {
  //           "posts" : posts
  //         }
  //          // source = document.getElementById("handlebars-template").innerHTML;
  //          template = window.Handlebars.compile(getGlobal().pageHTML);
  //          window.$('#designed-page').html(template(data));
  //     })
  //     .then(() => {
  //       let publicPosts = getGlobal().publicPosts;
  //       if(publicPosts.length > 0) {
  //         var data, template;
  //         let postCount = publicPosts.length;
  //         let randomPostIndex = Math.floor(Math.random() * postCount) + 0 ;
  //         let randomPost = publicPosts[randomPostIndex];
  //         const fullFile = '/posts/' + randomPost.id + '.json';
  //         getFile(fullFile, {decrypt: true})
  //           .then((fileContents) => {
  //             data = {
  //               "title" : JSON.parse(fileContents).title || "",
  //               "content" : JSON.parse(fileContents).content || "",
  //               "author" : JSON.parse(fileContents).author || "",
  //               "published" : JSON.parse(fileContents).lastUpdated || "",
  //               "featuredImg" : JSON.parse(fileContents).featureImg || "",
  //               "link" : window.location.origin + '/public/' + getGlobal().ownerBlockstackId + '/posts/' + JSON.parse(fileContents).id
  //             }
  //           })
  //           .then(() => {
  //             template = window.Handlebars.compile(getGlobal().postHTML);
  //             window.$('#designed-post').html(template(data));
  //             window.$('#designed-post-content').html(data.content);
  //           })
  //           .catch(error => {
  //             console.log(error);
  //           })

  //       }

  //     })
  // } else {
  //   userToLoadFrom = window.location.href.split('/')[4].split('?')[0]
  //   const url ='https://gaia-gateway.com/';
  //   if(window.location.origin === 'http://localhost:3000' || window.location.origin === 'http://192.168.1.194:3000'){
  //     console.log("bingo");
  //     axios.get(url + userToLoadFrom + '/localhost%3A3000/publicposts.json')
  //     .then((response) => {
  //       setGlobal({ publicPosts: response.data.slice(0).reverse() });
  //     })
  //     .then(() => {
  //       var data,
  //        template;
  //       let posts = getGlobal().publicPosts;
  //       data = {
  //         "posts" : posts
  //       }
  //        // source = document.getElementById("handlebars-template").innerHTML;
  //        template = window.Handlebars.compile(getGlobal().pageHTML);
  //        window.$('#designed-page').html(template(data));
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  //   } else if (window.location.origin === 'https://staging-publishing.graphitedocs.com') {
  //     axios.get('https://gaia-gateway.com/' + userToLoadFrom + '/staging-publishing.graphitedocs.com/publicposts.json')
  //     .then((response) => {
  //       setGlobal({ publicPosts: response.data.slice(0).reverse() });
  //     })
  //     .then(() => {
  //       var data,
  //        template;
  //       let posts = getGlobal().publicPosts;
  //       data = {
  //         "posts" : posts
  //       }
  //        // source = document.getElementById("handlebars-template").innerHTML;
  //        template = window.Handlebars.compile(getGlobal().pageHTML);
  //        window.$('#designed-page').html(template(data));
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  //   } else if (window.location.origin === 'https://publishing.graphitedocs.com') {
  //     axios.get('https://gaia-gateway.com/' + userToLoadFrom + '/publishing.graphitedocs.com/publicposts.json')
  //     .then((response) => {
  //       setGlobal({ publicPosts: response.data.slice(0).reverse() });
  //     })
  //     .then(() => {
  //       var data,
  //        template;
  //       let posts = getGlobal().publicPosts;
  //       data = {
  //         "posts" : posts
  //       }
  //        // source = document.getElementById("handlebars-template").innerHTML;
  //        template = window.Handlebars.compile(getGlobal().pageHTML);
  //        window.$('#designed-page').html(template(data));
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  //   } else {
  //     axios.get('https://gaia-gateway.com/' + userToLoadFrom + '/staging-publishing.graphitedocs.com/publicposts.json')
  //     .then((response) => {
  //       setGlobal({ publicPosts: response.data.slice(0).reverse() });
  //     })
  //     .then(() => {
  //       var data,
  //        template;
  //       let posts = getGlobal().publicPosts;
  //       data = {
  //         "posts" : posts
  //       }
  //        // source = document.getElementById("handlebars-template").innerHTML;
  //        template = window.Handlebars.compile(getGlobal().pageHTML);
  //        window.$('#designed-page').html(template(data));
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  //   }
  // }

}

export async function loadMyPublishedPosts() {
  const posts = await Post.fetchList({ author: loadUserData().username });
  console.log(posts);
  if(posts.length > 0) {
    await setGlobal({ myPosts: posts.filter(a => a.attrs.deleted !==true), filteredPosts: posts.filter(a => a.attrs.deleted !==true), loading: false, posts: posts, postLoadingDone: true, migrate: false })
    // var data,
    // template;
    // let posts = getGlobal().publicPosts;
    // data = {
    //   "posts" : posts
    // }
    //   // source = document.getElementById("handlebars-template").innerHTML;
    //   template = window.Handlebars.compile(getGlobal().pageHTML);
    //   window.$('#designed-page').html(template(data));
  }
}

export function loadPublishedPosts() {
  console.log(getGlobal().count < getGlobal().team.length)
    if(getGlobal().count < getGlobal().team.length) {
      console.log(getGlobal().team[getGlobal().count].blockstackId);
      const file = getPublicKeyFromPrivate(loadUserData().appPrivateKey) + '?publishedPostscollection.json';
      const privateKey = loadUserData().appPrivateKey;
      const options = { username: getGlobal().team[getGlobal().count].blockstackId, zoneFileLookupURL: "https://core.blockstack.org/v1/names", decrypt: false}
        getFile(file, options)
         .then((fileContents) => {
           if(fileContents) {
             console.log("found a file: ");
             console.log(JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))))
             setGlobal({ posts: getGlobal().posts.concat(JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents)))) })
             setGlobal({count: getGlobal().count + 1});
           } else {
             setGlobal({count: getGlobal().count + 1});
           }
         })
          .then(() => {
            this.loadPublishedPosts();
          })
          .catch(error => {
            console.log(error);
            setGlobal({count: getGlobal().count + 1});
            this.loadPublishedPosts();
          });
    } else {
      console.log("All published files loaded");
      setGlobal({ count: 0, postLoadingDone: true });
    }
  }

  export function deleteAllPosts() {
    console.log("see ya")
    setGlobal({ myPosts: [] });
    setTimeout(this.savePostCollectionToTeam, 300);
  }

  export async function loadPostToDelete(props) {
    setGlobal({loading: true})
    const posts = await Post.fetchList({ _id: props._id }, {decrypt: false});
    console.log(posts)
    let post = posts[0];
    const newAttributes = {
      title: "", 
      content: "",
      tags: [],
      lastUpdated: "",
      featureImg: "",
      status:  "",
      deleted: true
    }
    await post.update(newAttributes)
    await post.save();
    console.log(post);
    if(props.attrs.status === 'Published') {
      const publicPosts = await PublicPost.fetchList({ _id: `Public${props._id}` }, {decrypt: false});
      console.log(publicPosts)
      if(publicPosts.length > 0) {
        let publicPost = publicPosts[0];
        const newAttributes = {
          title: "", 
          content: "",
          tags: [],
          lastUpdated: "",
          featureImg: "",
          status:  "",
          deleted: true
        }
        await publicPost.update(newAttributes)
        await publicPost.save();
        console.log(publicPost)
      }
    }
    loadMyPublishedPosts();
    // let posts = getGlobal().myPosts;
    // const thisPost = posts.find((post) => { return post.id === props.id });
    // let index = thisPost && thisPost.id;
    // function findObjectIndex(post) {
    //     return post.id === index;
    // }
    // setGlobal({index: posts.findIndex(findObjectIndex), tempDocId: props.id });
    // setTimeout(this.deletePost);
  }

  export function deletePost() {
    setGlobal({loading: true })
    const fullFile = '/posts/' + getGlobal().tempDocId + '.json';
    const object = {};

    putFile(fullFile, JSON.stringify(object), {encrypt: true})
      .then(() => {
        let updatedArray = window.$.grep(getGlobal().myPosts, function(e){
             return e.id !== getGlobal().tempDocId;
        });
        setGlobal({singlePost: {}, myPosts: updatedArray, posts: updatedArray, filteredPosts: updatedArray });
        // window.$('#deleteModal').modal('close')
        document.getElementsByClassName("modal")[0].style.display = "none";
        setTimeout(this.saveUpdatePostCollection, 300);
      })
      .catch(error => {
        console.log(error);
      })

  }

  export function saveUpdatePostCollection() {
    putFile("posts.json", JSON.stringify(getGlobal().myPosts), {encrypt:true})
      .then(() => {
        this.saveUpdatedPublicPostsCollection();
      })
      .catch(e => {
        console.log("e");
        console.log(e);
      });
  }

  export function saveUpdatedPublicPostsCollection() {
    const { myPosts } = getGlobal();
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
    var updatedList = getGlobal().myPosts;
    updatedList = updatedList.filter(function(item){
      return item.attrs.title.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    setGlobal({filteredPosts: updatedList});
  }
