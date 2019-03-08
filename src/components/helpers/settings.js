import {
  getFile,
  putFile
} from "blockstack";
import { setGlobal, getGlobal } from 'reactn';
import { getMonthDayYear } from './timestamp';

export function loadDomain() {
  getFile("newDomain.json", {decrypt: true})
    .then((fileContents) => {
      if(fileContents) {
        setGlobal({newDomain: JSON.parse(fileContents || '{}')});
        setTimeout(this.accountDetails, 300)
      } else {
        setGlobal({newDomain: ""});
        setTimeout(this.accountDetails, 300)
      }
    })
    .catch(error => {
      console.log(error);
    })
}

export function handleNewDomain(e) {
  setGlobal({ editing: true, newDomain: e.target.value });
}

export function accountDetails() {
  if(getGlobal().checking === false) {
    const object = {};
    if(getGlobal().newAccountName !== "") {
      object.accountName = getGlobal().newAccountName;
    } else {
      object.accountName = getGlobal().accountName;
    }
    object.ownerEmail = getGlobal().ownerEmail;
    object.ownerBlockstackId = getGlobal().ownerBlockstackId;
    object.accountId = getGlobal().accountId;
    object.signUpDate = getGlobal().signUpDate;
    object.paymentDue = getGlobal().paymentDue;
    object.onboardingComplete = getGlobal().onboardingComplete;
    object.accountType = getGlobal().accountType;
    object.trialPeriod = getGlobal().trialPeriod;
    object.logo = getGlobal().logo;
    object.newDomain = getGlobal().newDomain;
    object.team = getGlobal().team;
    object.integrations = getGlobal().integrations;
    object.lastUpdated = getMonthDayYear();
    setGlobal({accountDetails: object});
    setTimeout(this.saveAccount, 300)
  } else {
    setTimeout(this.accountDetails, 1000);
  }
}

export function saveAccount() {
  setGlobal({ newTeammateId: "", newTeammateName: "", newTeammateEmail: "", newTeammateRole: "" })
  let fileName = 'account.json';
  let saveObject = JSON.stringify(getGlobal().accountDetails);
  let encryptionObject = {encrypt: true};
  putFile(fileName, saveObject, encryptionObject)
    .then(() => {
      this.saveToTeam();
    })
    .catch(error => {
      console.log(error)
    })
}

export function handleDrop(files) {
  setGlobal({ editing: true });
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
       setGlobal({logo: object.link});
       setGlobal({ loading: "", show: "hide"})
       setTimeout(this.accountDetails, 300)
     }
   };
   reader.readAsDataURL(file);
}

export function saveLogo() {
  putFile("logo.json", JSON.stringify(getGlobal().logo), {encrypt:true})
    .then(() => {
      this.accountDetails();
    })
    .catch(e => {
      console.log("e");
      console.log(e);
    });
}

export function removeLogo() {
  setGlobal({ editing: true, logo: "" });
  setTimeout(this.accountDetails, 300);
}

export function clearDomainName() {
  setGlobal({ editing: false, newDomain: "" });
}

export function removeDomain() {
  setGlobal({ editing: true });
  putFile("newDomain.json", JSON.stringify(""), {encrypt: true})
    .then(() => {
      this.loadDomain();
    })
    .catch(error => {
      console.log(error);
    })
}

export function newAccountName(e) {
  setGlobal({ editing: true, newAccountName: e.target.value});
}

export function clearAccountName() {
  setGlobal({ editing: false, newAccountName: "" });
}
