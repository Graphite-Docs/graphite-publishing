import {
  loadUserData,
  putFile,
  getFile
} from 'blockstack';
const { getPublicKeyFromPrivate } = require('blockstack');
const { encryptECIES } = require('blockstack/lib/encryption');
const { decryptECIES } = require('blockstack/lib/encryption');

export function checkForLatest() {
  this.setState({ checking: true });
  console.log("Polling teammates...")
    if(this.state.editing === false) {
      const { team, count } = this.state;
      console.log("Team length greater than count?");
      console.log(team.length > count);
      if(team.length > count) {
        let user = team[count].blockstackId;
        const options = { username: user, zoneFileLookupURL: "https://core.blockstack.org/v1/names", decrypt: false };
        const privateKey = loadUserData().appPrivateKey;
        if(loadUserData().username !== user) {
          console.log('Checking file from: ' + team[count].name);
          const file = getPublicKeyFromPrivate(loadUserData().appPrivateKey) + '.json';
          getFile(file, options)
            .then((fileContents) => {
              if(fileContents){
                console.log('Newer file? ' + JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).lastUpdated > this.state.lastUpdated);
                if(JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).lastUpdated > this.state.lastUpdated) {
                  console.log('Setting teammate with the most recent file: ' + user);
                  this.setState({
                    teamMateMostRecent: user,
                    count: this.state.count + 1
                  });
                  setTimeout(this.checkForLatest, 300);
                } else {
                  this.setState({ count: this.state.count + 1 });
                  setTimeout(this.checkForLatest, 300);
                }
              } else {
                console.log('No file found');
                this.setState({ count: this.state.count + 1 });
                setTimeout(this.checkForLatest, 300);
              }
            })
            .catch(error => {
              console.log(error);
              this.setState({ count: this.state.count + 1 });
              setTimeout(this.checkForLatest, 300);
            })
        } else {
          console.log("Teammate to be loaded is logged in user");
          this.setState({ count: this.state.count + 1 });
          setTimeout(this.checkForLatest, 300);
        }
      } else {
        if(this.state.inviter === "" || this.state.inviter === undefined) {
          let teamIds = this.state.team.map(a => a.blockstackId);
          console.log(teamIds)
          if(teamIds.includes(loadUserData().username)) {
            this.setLoadedFile();
          } else {
            this.loadInviteStatus();
          }
        } else {
          console.log("All done.")
          this.setLoadedFile();
        }
      }

    } else {
      setTimeout(this.checkForLatest, 1000);
    }
}

export function setLoadedFile() {
  const { teamMateMostRecent } = this.state;
  this.setState({ count: 0 });
  if(teamMateMostRecent !== "") {
    console.log('There is a more recent file from: ' + teamMateMostRecent);
    let user = teamMateMostRecent;
    const options = { username: user, zoneFileLookupURL: "https://core.blockstack.org/v1/names", decrypt: false };
    const privateKey = loadUserData().appPrivateKey;
    const file = getPublicKeyFromPrivate(loadUserData().appPrivateKey) + '.json';
    getFile(file, options)
      .then((fileContents) => {
        if(fileContents){
          this.setState({
            accountName: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).accountName,
            ownerBlockstackId: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).ownerBlockstackId,
            ownerEmail: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).ownerEmail,
            accountId: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).accountId,
            signUpDate: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).signUpDate,
            trialPeriod: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).trialPeriod,
            accountType: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).accountType,
            paymentDue: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).paymentDue,
            onboardingComplete: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).onboardingComplete,
            logo: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).logo,
            newDomain: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).newDomain,
            team: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).team || [],
            integrations: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).integrations || [],
            lastUpdated: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).lastUpdated,
            checking: false,
          })
          setTimeout(this.accountDetails, 300);
        } else {
          console.log('No file found');
        }
      })
      .catch(error => {
        console.log(error);
      })
  } else {
    this.setState({ checking: false })
    setTimeout(this.accountDetails, 300)
  }
}

export function saveToTeam() {
  const { team, count } = this.state;
    if(team.length > count) {
      let user = team[count].name;
      let pubKey = team[count].key;
      console.log('Saving to ' + user);
      if(loadUserData().username !== user) {
        if(pubKey) {
          console.log("Here's the public key: ");
          console.log(team[count].key);
          const data = this.state.accountDetails;
          const encryptedData = JSON.stringify(encryptECIES(pubKey, JSON.stringify(data)));
          const file = pubKey + '.json';
          console.log(file);
          putFile(file, encryptedData, {encrypt: false})
            .then(() => {
              console.log("Shared encrypted file ");
              this.setState({ count: count + 1 });
              setTimeout(this.saveToTeam, 300)
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          console.log("No key yet");
          this.setState({ count: count + 1 });
          setTimeout(this.saveToTeam, 300)
        }
      } else {
        console.log("Teammate is logged in user");
        this.setState({ count: count + 1 });
        setTimeout(this.saveToTeam, 300)
      }
    } else {
      console.log("Everyone synced.");
      this.setState({ count: 0, newTeammateId: "", newTeammateKey: "", newTeammateName: "", newTeammateRole: "", newTeammateEmail: "", newTeammateBlockstackId: "" });
      setTimeout(this.loadAccount, 500);
    }
}

export function loadBasicInviteInfo() {
  let privateKey = loadUserData().appPrivateKey;
  let file = getPublicKeyFromPrivate(loadUserData().appPrivateKey) + '.json';
  const options = { username: this.state.inviter, zoneFileLookupURL: "https://core.blockstack.org/v1/names", decrypt: false}
  getFile(file, options)
    .then((fileContents) => {
      console.log(this.state.inviter);
      console.log(JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))))
      this.setState({
        accountName: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).accountName,
        ownerBlockstackId: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).ownerBlockstackId,
        ownerEmail: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).ownerEmail,
        accountId: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).accountId,
        signUpDate: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).signUpDate,
        trialPeriod: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).trialPeriod,
        accountType: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).accountType,
        paymentDue: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).paymentDue,
        onboardingComplete: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).onboardingComplete,
        logo: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).logo,
        newDomain: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).newDomain,
        team: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).team || [],
        integrations: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).integrations || [],
        lastUpdated: JSON.parse(decryptECIES(privateKey, JSON.parse(fileContents))).lastUpdated
      })
    })
    .then(() => {
      if(this.state.team.length > 0) {
        console.log(this.state.team.length);
        this.checkForLatest();
      } else {
        console.log("End of team sync")
      }
    })
    .catch(error => {
      console.log(error);
    })
}
