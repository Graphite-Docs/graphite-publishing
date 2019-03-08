import {
  getFile,
  putFile,
} from "blockstack";
import { setGlobal } from 'reactn';
import { loadMyPublishedPosts, deleteAllPosts } from './posts';
import  Publication  from '../models/publications';
import { loadUserData } from "blockstack/lib/auth/authApp";

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

export async function loadAccount() {
  setGlobal({ editing: false, count: 0, initialLoad: true });
  const publications = await Publication.fetchList({ creator: loadUserData().username });
  console.log(publications);
  publications.length > 0 ? setGlobal({onboardingComplete: true, loading: false, initialLoad: false}) : setGlobal({loading: false, initialLoad: false})
  if(publications.length === 1) {
    let publication = await publications[0];
    console.log(publication);
    await setGlobal({
      accountName: publication.attrs.name,
      ownerBlockstackId: publication.attrs.creator,
      ownerEmail: publication.attrs.creatorEmail,
      accountId: publication._id,
      signUpDate: publication.attrs.createdAt,
      onboardingComplete: true,
      logo: publication.attrs.logo,
      newDomain: publication.attrs.newDomain
    })
  } else {
    await setGlobal({ publications: publications, loading: false, initialLoad: false, onboardingComplete: true, multiBlog: true})
  }
  loadMyPublishedPosts();
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
