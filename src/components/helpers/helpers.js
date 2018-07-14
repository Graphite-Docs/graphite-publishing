import {
  getFile,
  putFile,
  loadUserData
} from "blockstack";

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
  getFile("account.json", {decrypt: true})
    .then((fileContents) => {
      console.log(JSON.parse(fileContents || '{}'))
      if(fileContents){
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
      this.state.team.length > 0 ? this.checkForLatest() : loadUserData();
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
