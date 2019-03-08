import {
  putFile,
  loadUserData
} from "blockstack";
import { setGlobal, getGlobal } from 'reactn';
import { getMonthDayYear } from './timestamp';
import axios from 'axios';
import  Publication  from '../models/publications';
import { growl } from "./growl";
import { loadAccount } from './helpers';
let fileName, saveObject, encryptionObject;

export function handleAccountName(e) {
  setGlobal({ accountName: e.target.value, onboardingSeen: true });
}

export function handleEmail(e) {
  setGlobal({ ownerEmail: e.target.value, onboardingSeen: true });
}

export async function signUp() {
  let re = /\S+@\S+\.\S+/;
  if(re.test(getGlobal().ownerEmail) === true && getGlobal().accountName !== ""){
    setGlobal({ loading: true });
    const publication = await new Publication({
      name: getGlobal().accountName,
      creator: loadUserData().username,
      creatorEmail: getGlobal().ownerEmail
    })
    await publication.save();
    loadAccount();
  } else {
    growl({timeout: 3000, message: "Please enter an account name and a valid email address", error: true})
  }

  // let re = /\S+@\S+\.\S+/;
  // if(re.test(getGlobal().ownerEmail) === true){
  //   const objectTwo = {};
  //   objectTwo.isOwner = true;
  //   objectTwo.id = uuidv4();
  //   objectTwo.blockstackId = loadUserData().username;
  //   objectTwo.key = getPublicKeyFromPrivate(loadUserData().appPrivateKey);
  //   objectTwo.role = "Owner";
  //   objectTwo.name = loadUserData().username;
  //   objectTwo.inviteAccepted = true;
  //   const object = {};
  //   object.accountName = getGlobal().accountName;
  //   object.ownerEmail = getGlobal().ownerEmail;
  //   object.ownerBlockstackId = loadUserData().username;
  //   object.accountId = uuidv4();
  //   object.signUpDate = getMonthDayYear();
  //   object.onboardingComplete = true;
  //   object.trialPeriod = true;
  //   object.accountType = ""
  //   object.paymentDue = false;
  //   object.team = [...getGlobal().team, objectTwo ]
  //   setGlobal({
  //     accountDetails: object, accountId: object.accountId
  //   });
  //   setTimeout(this.saveAccountSignUp, 300)
  // } else {
  //   window.M.toast({html: '<span style="color: #e53935;">Please enter a valid email address.</span>'})
  // }

}

export function saveAccountSignUp() {
  fileName = 'account.json';
  saveObject = JSON.stringify(getGlobal().accountDetails);
  encryptionObject = {encrypt: true};
  putFile(fileName, saveObject, encryptionObject)
    .then(() => {
      console.log("Account created!")
    })
    .then(() => {
      this.postMain();
    })
    .catch(error => {
      console.log(error)
    })
}

export function postMain() {
  const object = {};
  object.from_email = "contact@graphitedocs.com";
  object.to_email = "justin@graphitedocs.com";
  object.subject = "New User Sign-Up";
  object.content = "<div style='text-align:center;'><div style='background:#282828;width:100%;height:auto;margin-bottom:40px;'><img src='https://marketing-image-production.s3.amazonaws.com/uploads/08a4eed801f7b523a9aba68dfe5c929856b3ae747a5261dea27f13dda12d7af6a04a76d33ab97337014df0900ac88c20d77208bb641f993232f4bb03b9799a35.png' style='height:50px;padding:10px;'></div><h3>A new user has signed up!</h1><p>User Email: <strong>" + getGlobal().ownerEmail + "</strong></p><p>User ID: <strong>" + loadUserData().username + "</strong></p><p>Account Name: <strong>" + getGlobal().accountName + "</strong></p><p>Account ID: <strong>" + getGlobal().accountId + "</strong></p></div>"
  axios.post("https://wt-3fc6875d06541ef8d0e9ab2dfcf85d23-0.sandbox.auth0-extend.com/account-sign-up", object)
    .then(function (response) {
      console.log(response);
      setTimeout(window.location.replace('/'), 300)
    })
    .catch(function (error) {
      console.log(error);
      // setTimeout(window.location.replace('/'), 300)
    });
  // setTimeout(this.loadDb, 300);
}

export function loadDb() {
  // const object = {};
  // object.accountName = getGlobal().accountName;
  // object.accountId = getGlobal().accountId;
  // object.email = getGlobal().ownerEmail;
  // object.trial = true;
  // axios.post("https://wt-3fc6875d06541ef8d0e9ab2dfcf85d23-0.sandbox.auth0-extend.com/express-with-mongo-db", object)
  //   .then(function (response) {
  //     console.log(response);
  //     // setTimeout(window.location.replace('/'), 300)
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //     // setTimeout(window.location.replace('/'), 300)
  //   });
}

export function checkDate() {
  setGlobal({ gettingDate: true });
  getMonthDayYear() > getGlobal().signUpDate ? setGlobal({payment: true, trialEnded: true}) : setGlobal({payment: false})
}
