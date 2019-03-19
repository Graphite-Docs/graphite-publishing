import {
  getFile,
  putFile,
  loadUserData
} from "blockstack";
import { setGlobal, getGlobal } from 'reactn';
import { loadMyPublishedPosts, deleteAllPosts } from './posts';
import  Publication  from '../models/publications';
import  Post  from '../models/posts';
import  PublicPost  from '../models/publicPosts';
import  Design  from '../models/design';

export function getDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const monthDayYear = month + "/" + day + "/" + year;
  return monthDayYear
}

export function loadLogo() {
  getFile("logo.json", {decrypt: true})
   .then((fileContents) => {
     if(JSON.parse(fileContents || '{}')) {
       setGlobal({ logo: JSON.parse(fileContents || '{}').link });
     } else {
       setGlobal({ logo: ""})
     }
   })
    .catch(error => {
      console.log(error);
    });
}

export async function loadOldAccount() {
  getFile("account.json", {decrypt: true})
    .then(async (fileContents) => {
      console.log(JSON.parse(fileContents))
      if(fileContents){
        await setGlobal({
          accountName: JSON.parse(fileContents || '{}').accountName,
          ownerBlockstackId: JSON.parse(fileContents || '{}').ownerBlockstackId,
          ownerEmail: JSON.parse(fileContents || '{}').ownerEmail,
          accountId: JSON.parse(fileContents || '{}').accountId,
          signUpDate: JSON.parse(fileContents || '{}').signUpDate,
          trialPeriod: JSON.parse(fileContents || '{}').trialPeriod,
          accountType: JSON.parse(fileContents || '{}').accountType,
          paymentDue: JSON.parse(fileContents || '{}').paymentDue,
          onboardingComplete: JSON.parse(fileContents || '{}').onboardingComplete,
          logo: JSON.parse(fileContents || '{}').logo,
          newDomain: JSON.parse(fileContents || '{}').newDomain,
          team: JSON.parse(fileContents || '{}').team || [],
          integrations: JSON.parse(fileContents || '{}').integrations || [],
          lastUpdated: JSON.parse(fileContents || '{}').lastUpdated
        })
        await migrateAccount();
        setGlobal({loading: false, initialLoad: false})
      } else {
        setGlobal({
          loading: false, initialLoad: false, migrated: true
        });
      }
})
}

export async function migrateAccount() {
  
  console.log("migrating account");
  const publication = new Publication({
    name: getGlobal().accountName,
    creator: loadUserData().username,
    creatorEmail: getGlobal().ownerEmail
  })
  console.log(publication)
  await publication.save();
  await migrateDesign();
  await migratePosts();
}

export function callback() {
  loadMyPublishedPosts();
  setGlobal({migrated: true})
}

export async function migrateDesign() {
  //Post HTML
  await getFile('postpagedesign.json', {decrypt: false})
    .then((fileContents) => {
      if(fileContents) {
        setGlobal({
          postHTML: JSON.parse(fileContents || '{}').postHTML,
        })
      } else {
        setGlobal({
          postHTML: "",
        })
      }
    })
    .catch(error => {
      console.log(error);
  })
  //Page HTML
  await getFile('mainpagedesign.json', {decrypt: false})
    .then((fileContents) => {
      if(fileContents) {
        setGlobal({
          pageHTML: JSON.parse(fileContents || '{}').pageHTML
        })
      } else {
        setGlobal({
          pageHTML: ""
        })
      }
    })
    .catch(error => {
      console.log(error);
  })

  const thisDesign = await new Design({
    publicationCreator: loadUserData().username,
    mainPage: getGlobal().pageHTML,
    postPage: getGlobal().postHTML
  })
  await thisDesign.save();
}

export async function migratePosts() {
  console.log("migrating posts")
  getFile('posts.json', {decrypt: true})
    .then(async (fileContents) => {
      if(fileContents) {
        let posts = JSON.parse(fileContents);
        if(posts.length > 0) {
          let postsMigrated = 0;
          await posts.forEach(async function(element) {
            //Fetch each individual post, return the data, then add it to Radiks
            await loadSingle(element.id)
            postsMigrated++;
            if(postsMigrated === posts.length) {
              callback();
            }
          });
        } else {
          setGlobal({ myPosts: [], posts: [], postLoadingDone: true, migrated: true });
        }
      } else {
        setGlobal({ myPosts: [], posts: [], postLoadingDone: true, migrated: true });
      }
    })
    .catch(error => {
      console.log(error);
})
}

export async function loadSingle(id) {
  const fullFile = `/posts/${id}.json`;
  await getFile(fullFile, {decrypt: true})
   .then(async (fileContents) => {
      const post = await new Post({
        author: loadUserData().username,
        title: JSON.parse(fileContents || '{}').title,
        content: JSON.parse(fileContents || '{}').content,
        status: JSON.parse(fileContents || '{}').status || "Draft",
        tags: [],
        lastUpdated: getDate(), 
        createdDate: JSON.parse(fileContents || '{}').createdDate,
        featureImg: JSON.parse(fileContents || '{}').featureImg
      })
      await post.save();
      if(JSON.parse(fileContents).status === "Published") {
        const publicPost = await new PublicPost({
          _id: `Public${id}`,
          title: JSON.parse(fileContents || '{}').title, 
          author: loadUserData().username,
          content: JSON.parse(fileContents || '{}').content,
          tags: [],
          link: `${window.location.origin}/sites/${loadUserData().username}/public/${id}`,
          lastUpdated: getDate(),
          publishedDate: getDate(),
          featureImg: JSON.parse(fileContents || '{}').featureImg
        })
        await publicPost.save();
      }
   })
    .catch(error => {
      console.log(error);
});
}

export async function loadAccount() {
  setGlobal({ editing: false, count: 0, initialLoad: true });
  const publications = await Publication.fetchList({ creator: loadUserData().username });
  console.log(publications);
  if(publications.length > 0) {
    setGlobal({onboardingComplete: true, loading: false, initialLoad: false})
    if(publications.length === 1) {
      let publication = await publications[0];
      await setGlobal({
        accountName: publication.attrs.name,
        ownerBlockstackId: publication.attrs.creator,
        ownerEmail: publication.attrs.creatorEmail,
        accountId: publication._id,
        signUpDate: publication.attrs.createdAt,
        onboardingComplete: true,
        logo: publication.attrs.logo,
        newDomain: publication.attrs.newDomain,
        migrated: true
      })
    } else {
      await setGlobal({ publications: publications, loading: false, initialLoad: false, onboardingComplete: true, multiBlog: true})
    }
    loadMyPublishedPosts();
  } else {
    setGlobal({loading: false, initialLoad: false, migrated: false})
    loadOldAccount();
  }
}

export function clearAccountData() {
  const object = {};
  putFile("account.json", JSON.stringify(object), {encrypt: true})
    .catch(error => {
      console.log(error);
    })
  putFile("newDomain.json", JSON.stringify(""), {encrypt: true})
    .catch(error => {
      console.log(error);
    })
  putFile("logo.json", JSON.stringify(""), {encrypt: true})
    .catch(error => {
      console.log(error);
    })

  deleteAllPosts();
}

export function copyLink() {
  var copyText = document.getElementById("copy");
  copyText.select();
  document.execCommand("Copy");
  window.M.toast({html: "Link copied to clipboard"});
}
