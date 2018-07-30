import {
  getFile,
  putFile,
} from "blockstack";

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
       this.setState({ logo: JSON.parse(fileContents || '{}').link });
     } else {
       this.setState({ logo: ""})
     }
   })
    .catch(error => {
      console.log(error);
    });
}

export function loadAccount() {
  this.setState({ editing: false, count: 0 });
  getFile("account.json", {decrypt: true})
    .then((fileContents) => {
      if(fileContents){
        console.log(JSON.parse(fileContents || '{}'))
        this.setState({
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
      } else {
        this.setState({
          accountName: "",
          ownerBlockstackId: "",
          ownerEmail: "",
          accountId: "",
          signUpDate: "",
          trialPeriod: false,
          accountType: "",
          paymentDue: false,
          onboardinComplete: false,
          logo: "",
          newDomain: "",
          team: [],
          integrations: [],
          lastUpdated: ""
        });
      }
    })
    .then(() => {
      if(this.state.accountName === "" || this.state.accountName === undefined) {
        console.log("loading invite status");
        this.loadInviteStatus();
      }
    })
    .catch(error => {
      console.log(error);
    })
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
}

export function copyLink() {
  var copyText = document.getElementById("copy");
  copyText.select();
  document.execCommand("Copy");
  window.M.toast({html: "Link copied to clipboard"});
}
