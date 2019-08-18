import {
  putFile,
  getFile,
  loadUserData
} from 'blockstack';
import { setGlobal, getGlobal } from 'reactn';
import axios from 'axios';
import  Design  from '../models/design';
import { loadAccount } from './helpers';
import { growl } from './growl';
import { loadPublicSitePosts } from './posts';
let link;
let html;

export function setTheme(name) {
  if(name === 'card') {
    setGlobal({ pageHTML: "<div>\n<nav>\n<div class='nav-wrapper'>\n<h3><a href='#' className='brand-logo'>Your Name or Image</a></h3>\n</div>\n</nav>\n<div class='row'>\n{{#posts}}\n<div class='col s6 m4'>\n<div class='card small'>\n<div class='card-image'>\n{{#if featureImg}}\n<img src={{{featureImg}}} />\n{{/if}}\n<span style='color:#000;' class='card-title'>\n{{title}}\n</span>\n</div>\n<div class='card-content'>\n<p>Published: {{lastUpdated}}</p>\n<p>By: {{author}}</p>\n</div>\n<div class='card-action'>\n<a style='color: #000' href={{link}}>Read It</a>\n</div>\n</div>\n</div>\n{{/posts}}\n</div>\n</div>" })
  } else if(name === 'clean') {
    setGlobal({ pageHTML: "<div><nav style='text-align: center;'>\n<div class='nav-wrapper'>\n<h1><a href='#' style='text-align: center;'>YOUR SITE NAME</a></h1>\n<p style='text-align: center'>The best words on the internet</p>\n</div>\n</nav>\n<div style='max-width: 75%;margin: auto;margin-bottom: 25px;margin-top:50px;padding-top:25px;'>\n{{#posts}}\n<h3>{{title}}</h3>\n{{#if featureImg}}\n<img style='max-width:50%;margin:auto;' src={{{featureImg}}} alt={{title}} />\n{{/if}}\n<h5>{{author}}</h5>\n<h5>{{lastUpdated}}</h5>\n<a style='color:#fff' href={{link}}><button class='btn black'>Read More</button></a>\n<hr />\n{{/posts}}\n</div>\n</div>" })
  } else if(name === 'night') {
    setGlobal({ pageHTML: "<div style='background: #282828;color:#eee;padding-bottom:45px;'>\n<div style='background: #000;width:100%;padding:10px;'>\n<h1>Your Site Name</h1>\n</div>\n<div style='margin:auto;margin-top: 65px; max-width: 85%;margin-bottom:45px;'>\n{{#posts}}\n<div style='margin-top:25px;'>\n</div>\n<p>{{lastUpdated}}</p>\n<h3>{{title}}</h3>\n{{#if featureImg}}\n<img src={{{featureImg}}} style='max-width:50%;margin:auto;' alt={{title}} />\n{{/if}}\n<p>Written by {{author}}</p>\n<a href={{link}} style='color:#000'><button style='color:#000;background: #eee;' class='btn'>Read</button></a>\n{{/posts}}\n</div>\n</div>\n</div>" })
  }
}

export function setPostTheme(name) {
  if(name === 'card') {
    setGlobal({
      postHTML: "<div>\n<nav>\n<div class='nav-wrapper'>\n<h3 style='margin-left:10px;'><a href='#' className='brand-logo'>Your Name or Image</a></h3>\n</div>\n</nav>\n<div style='padding:15px;margin:auto;margin-top:45px;max-width:85%;' class='card'>\n<h3>{{title}}</h3>\n<p>{{author}}</p>\n<p>{{published}}</p>\n<div id='designed-post-content'></div>\n</div>\n</div>"
    })
  } else if(name === 'clean') {
    setGlobal({
      postHTML: "<div>\n<nav style='text-align: center;'>\n<div class='nav-wrapper'>\n<h1><a href='#' style='text-align: center;'>YOUR SITE NAME</a></h1>\n</div>\n</nav>\n<div style='max-width: 75%;margin: auto;margin-bottom: 25px'>\n<h3>{{title}}</h3>\n<p>By {{author}}</p>\n<div id='designed-post-content'></div>\n</div>\n</div>"
    })
  } else if(name === 'night') {
    setGlobal({
      postHTML: "<div style='background: #282828;color:#eee;padding-bottom:45px;'>\n<div style='background: #000;width:100%;padding:10px;'>\n<h1>Your Site Name</h1>\n</div>\n<div style='margin:auto;margin-top: 65px; max-width: 85%;margin-bottom:45px;'>\n<h3 style='text-align:center;'>{{title}}</h3>\n<p style='text-align:center;'> Published on {{published}} by {{author}}</p>\n<div id='designed-post-content'></div>\n</div>\n</div>"
    })
  }
}

export function handleCodeChanges(value) {
  const object = {};
  object.accountId = getGlobal().accountId;
  object.accountName = getGlobal().accountName;
  object.pageHTML = value;
  setGlobal({ pageHTML: value, mainPage: object, editing: true });
}

export function handlePostCodeChanges(value) {
  const object = {};
  object.accountId = getGlobal().accountId;
  object.postHTML = value;
  setGlobal({ postHTML: value, postPage: object, editing: true });
}

export async function saveMainHtml() {
  //first check if there is an existing record
  const design = await Design.fetchList({ publicationCreator: loadUserData().username });
  console.log(design)
  if(design.length > 0) {
    console.log("updating existing design")
    let thisDesign = design[0];
    //Update record
    const newPublicAttrs = {
      publicationCreator: loadUserData().username,
      mainPage: getGlobal().pageHTML,
      postPage: getGlobal().postHTML
    }
    await thisDesign.update(newPublicAttrs)
    await thisDesign.save();
    growl({message: "Design updated", timeout: 3000})
  } else {
    console.log("no existing design")
    //Create new record
    const thisDesign = await new Design({
      publicationCreator: loadUserData().username,
      mainPage: getGlobal().pageHTML,
      postPage: getGlobal().postHTML
    })
    await thisDesign.save();
    growl({message: "Design updated", timeout: 3000})
  }

  // const object = {};
  // object.accountId = getGlobal().accountId;
  // object.accountName = getGlobal().accountName;
  // object.pageHTML = getGlobal().pageHTML;
  // setGlobal({ mainPage: object }, () => {
  //   setGlobal({ loading: true });
  //   putFile('mainpagedesign.json', JSON.stringify(getGlobal().mainPage), {encrypt: false})
  //     .then(() => {
  //       this.loadPublicPostsCollection();
  //       setGlobal({ loading: false, editing: false });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // });
}

export async function publicLoadMainHtml() {
  setGlobal({ loading: true })
  const design = await Design.fetchList({ publicationCreator: window.location.href.split('sites/')[1].split('/')[0] }, {decrypt: false});
  if(design.length > 0) {
    await setGlobal({
      pageHTML: design[0].attrs.mainPage, 
      postHTML: design[0].attrs.postPage, 
      loading: false
    })
    loadPublicSitePosts();
  } else {
    await setGlobal({
      pageHTML: `<style>@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");</style><div style="max-width:75%;margin:auto;text-align:center;">\n<h1 style="margin-bottom:25px;padding: 15px;">Your Blog Title (Don't forget to update this on the Design page</h1>\n{{#posts}}\n<div style="padding:15px;margin:20px;" class="card">\n<h3>{{title}}</h3>\n<p>A post by {{author}}</p>\n<p>Published {{lastUpdated}}</p>\n<a style="color: #000" href={{link}}><button style="color:#000" class="btn black">Read it</button></a>\n</div>\n{{/posts}}\n</div>`,
      postHTML: `<style>@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");</style><div style='max-width:80%;margin: auto;margin-top: 45px;'>\n<h3 style='text-align:center;'>{{title}}</h3>\n<h5>Published: {{published}}</h5>\n{{#if featureImg}}\n<img class='responsive-img' src={{{featureImg}}} alt='post feature'/>\n{{/if}}\n<div>\n<div style="font-size: 18px;" id="designed-post-content"></div>\n</div>\n</div>`, 
      loading: false
    })
    loadPublicSitePosts();
  }
}

export async function loadMainHtml() {
  await loadAccount()
  setGlobal({ loading: true })
  const design = await Design.fetchList({ publicationCreator: loadUserData().username });
  console.log(design)
  if(design.length > 0) {
    setGlobal({
      pageHTML: design[0].attrs.mainPage, 
      postHTML: design[0].attrs.postPage, 
      loading: false
    })
  } else {
    console.log(getGlobal().accountName)
    setGlobal({
      pageHTML: `<div style="max-width:75%;margin:auto;text-align:center;">\n<h1>${getGlobal().accountName}</h1>\n{{#posts}}\n<div style="padding:15px;margin:20px;" class="card">\n<h3>{{title}}</h3>\n<p>A post by {{author}}</p>\n<p>Published {{lastUpdated}}</p>\n<a style="color: #000" href={{link}}><button style="color:#000" class="btn black">Read it</button></a>\n</div>\n{{/posts}}\n</div>`,
      postHTML: `<div style='max-width:80%;margin: auto;'>\n<h3 style='text-align:center;'>{{title}}</h3>\n<h5>Published: {{published}}</h5>\n{{#if featureImg}}\n<img class='responsive-img' src={{{featureImg}}} alt='post feature'/>\n{{/if}}\n<div>\n<div id='designed-post-content'></div>\n</div>\n</div>`, 
      loading: false
    })
  }
}

export function loadMainHtmlPublic() {
  const userToLoadFrom = window.location.href.split('/')[4].split('?')[0];
  const url ='https://gaia-gateway.com/';
  if(window.location.origin === 'http://localhost:3000'){
    axios.get(url + userToLoadFrom + '/localhost%3A3000/mainpagedesign.json')
    .then((response) => {
      setGlobal({ pageHTML: response.data.pageHTML });
    })
    .then(() => {
      if(getGlobal().pageHTML === undefined || getGlobal().pageHTML === "") {
        setGlobal({
          pageHTML: "<div style='max-width:75%;margin:auto;text-align:center;'>\n<h1>Your Publication Name</h1>\n{{#posts}}\n<div style='padding:15px;margin:20px;' class='card'>\n<h3>{{title}}</h3>\n<p>A post by {{author}}</p>\n<p>Published {{lastUpdated}}</p>\n<a href={{link}}><button class='btn'>Read it</button></a>\n</div>\n{{/posts}}\n</div>"
        })
      }
    })
    .catch(error => {
      console.log(error);
    })
  } else if (window.location.origin === 'https://publishing.graphitedocs.com') {
    axios.get('https://gaia-gateway.com/' + userToLoadFrom + '/publishing.graphitedocs.com/mainpagedesign.json')
    .then((response) => {
      setGlobal({ pageHTML: response.data.pageHTML });
    })
    .then(() => {
      if(getGlobal().pageHTML === undefined || getGlobal().pageHTML === "") {
        setGlobal({
          pageHTML: "<div style='max-width:75%;margin:auto;text-align:center;'>\n<h1>Your Publication Name</h1>\n{{#posts}}\n<div style='padding:15px;margin:20px;' class='card'>\n<h3>{{title}}</h3>\n<p>A post by {{author}}</p>\n<p>Published {{lastUpdated}}</p>\n<a href={{link}}><button class='btn'>Read it</button></a>\n</div>\n{{/posts}}\n</div>"
        })
      }
    })
    .catch(error => {
      console.log(error);
    })
  } else {
    axios.get('https://gaia-gateway.com/' + userToLoadFrom + '/staging-publishing.graphitedocs.com/mainpagedesign.json')
    .then((response) => {
      setGlobal({ pageHTML: response.data.pageHTML });
    })
    .then(() => {
      if(getGlobal().pageHTML === undefined || getGlobal().pageHTML === "") {
        setGlobal({
          pageHTML: "<div style='max-width:75%;margin:auto;text-align:center;'>\n<h1>Your Publication Name</h1>\n{{#posts}}\n<div style='padding:15px;margin:20px;' class='card'>\n<h3>{{title}}</h3>\n<p>A post by {{author}}</p>\n<p>Published {{lastUpdated}}</p>\n<a href={{link}}><button class='btn'>Read it</button></a>\n</div>\n{{/posts}}\n</div>"
        })
      }
    })
    .catch(error => {
      console.log(error);
    })
  }
}

export function loadFile() {
  axios.get(link + 'mainpagedesign.json')
    .then((response) => {
      html = response.data;
      console.log(html);
      setGlobal({ pageHTML: html.pageHTML})
    })
    .catch(error => {
      console.log(error);
    });
}

export function savePostHtml() {
  const object = {};
  object.accountId = getGlobal().accountId;
  object.postHTML = getGlobal().postHTML;
  setGlobal({ postHTML: getGlobal().postHTML, postPage: object, editing: true }, () => {
    setGlobal({ loading: true });
    putFile('postpagedesign.json', JSON.stringify(getGlobal().postPage), {encrypt: false})
      .then(() => {
        this.loadPublicPostsCollection();
        setGlobal({ loading: false, editing: false });
      })
      .catch(error => {
        console.log(error);
      })
  });
}

export function loadPostHtml() {
  getFile('postpagedesign.json', {decrypt: false})
    .then((fileContents) => {
      setGlobal({
        postHTML: JSON.parse(fileContents || '{}').postHTML,
      })
    })
    .then(() => {
      console.log(getGlobal().postHTML)
      if(getGlobal().postHTML === undefined || getGlobal().postHTML === "") {
        setGlobal({
          postHTML: "<div style='max-width:80%;margin: auto;'>\n<h3 style='text-align:center;'>{{title}}</h3>\n<h5>Published: {{published}}</h5>\n{{#if featureImg}}\n<img class='responsive-img' src={{{featureImg}}} alt='post feature'/>\n{{/if}}\n<div>\n<div id='designed-post-content'></div>\n</div>\n</div>"
        })
      }
    })
    .catch(error => {
      console.log(error);
    })
}

export function loadPostHtmlPublic() {
  const userToLoadFrom = window.location.href.split('/sites/')[1].split('/')[0];
  const url = 'https://gaia-gateway.com/';
  let origin;
  if(window.location.origin === 'http://localhost:3000') {
    origin = '/localhost%3A3000';
  } else if(window.location.origin === 'https://staging-publishing.graphitedocs.com') {
    origin = '/staging-publishing.graphitedocs.com';
  } else {
    origin = '/publishing.graphitedocs.com';
  }
  axios.get(url + userToLoadFrom + origin + '/postpagedesign.json')
  .then((response) => {
    setGlobal({
      postHTML: response.data.postHTML,
    })
  })
  .then(() => {
    if(getGlobal().postHTML === undefined) {
      setGlobal({
        postHTML: "<div style='max-width:80%;margin: auto;'>\n<h3 style='text-align:center;'>{{title}}</h3>\n<div>\n<h5>Published: {{published}}</h5>\n<div id='designed-post-content'></div>\n</div>\n</div>"
      })
    }
  })
  .catch(error => {
    console.log(error);
  })
}
