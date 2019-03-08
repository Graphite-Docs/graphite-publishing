import {
  loadUserData,
  putFile
} from 'blockstack';
import { setGlobal, getGlobal } from 'reactn';
import axios from 'axios';
import update from 'immutability-helper';
const uuidv4 = require('uuid/v4');
const { getPublicKeyFromPrivate } = require('blockstack');

export function handleTeammateName(e) {
  setGlobal({ editing: true, newTeammateName: e.target.value });
}

export function handleTeammateId(e) {
  setGlobal({ newTeammateBlockstackId: e.target.value });
}

export function handleTeammateEmail(e) {
  setGlobal({ editing: true, newTeammateEmail: e.target.value });
}

export function handleTeammateRole(e) {
  setGlobal({ editing: true, newTeammateRole: e.target.value });
}

export function clearNewTeammate() {
  setGlobal({ editing: false, newTeammateName: "", newTeammateEmail: ""});
}

export function addTeammate() {
  if(getGlobal().newTeammateName !== "" && getGlobal().newTeammateRole !== "" && getGlobal().newTeammateEmail !== "") {
    let re = /\S+@\S+\.\S+/;
    if(re.test(getGlobal().newTeammateEmail) === true) {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const object = {};
      object.name = getGlobal().newTeammateName;
      object.email = getGlobal().newTeammateEmail;
      object.blockstackId = getGlobal().newTeammateId;
      object.role = getGlobal().newTeammateRole;
      object.id = uuidv4();
      object.added = month + "/" + day + "/" + year;
      object.key = "";
      object.inviteAccepted = false;
      object.inviteLink = 'https://publishing.graphitedocs.com/invites/?' + loadUserData().username + '?' + object.id;
      setGlobal({ team: [...getGlobal().team, object], newTeammateId: object.id });
      window.M.toast({html: 'Teammate added'});
      setTimeout(this.saveInvite, 300);
    } else {
      window.M.toast({html: '<span style="color: #e53935;">Please enter a valid email address.</span>'});
    }
  } else {
    let toastHTML = '<span style="color: #e53935;">Please make sure you have entered the required information.</span>';
    window.M.toast({html: toastHTML});
  }
}

export function teammateToDelete(props) {
    let team = getGlobal().team;
    let result = window.$.grep(team, function(e){
      return e.id !== props;
    });
    setGlobal({
      team: result,
    })
    window.M.toast({html: 'Teammate deleted'});
    setTimeout(this.accountDetails, 300);
}

export function updateTeammate(props) {
    let team = getGlobal().team;
    const thisMate= team.find((mate) => { return mate.id === props});
    let index = thisMate && thisMate.id;
    function findObjectIndex(mate) {
        return mate.id === index;
    }
    setGlobal({
      teammateIndex: team.findIndex(findObjectIndex),
      newTeammateName: thisMate && thisMate.name,
      inviteAccepted: thisMate && thisMate.inviteAccepted,
      newTeammateEmail: thisMate && thisMate.email,
      inviteDate: thisMate && thisMate.added,
      newTeammateBlockstackId: thisMate && thisMate.blockstackId,
      newTeammateKey: thisMate && thisMate.key,
      newTeammateId: thisMate && thisMate.id,
      inviter: thisMate && thisMate.inviter
    });
    setTimeout(this.updateRole, 300);
}

export function updateRole() {
    const object = {};
    const index = getGlobal().teammateIndex;
    object.name = getGlobal().newTeammateName;
    object.role = getGlobal().newTeammateRole;
    object.inviteAccepted = getGlobal().inviteAccepted;
    object.email = getGlobal().newTeammateEmail;
    object.added = getGlobal().inviteDate;
    object.blockstackId = getGlobal().newTeammateBlockstackId;
    object.key = getGlobal().newTeammateKey;
    object.id = getGlobal().newTeammateId;
    object.inviter = getGlobal().inviter;
    const updatedTeam = update(getGlobal().team, {$splice: [[index, 1, object]]});
    setGlobal({ team: updatedTeam });
    window.M.toast({html: 'Teammate updated'});
    setTimeout(this.accountDetails, 300);
}

export function sendInvite() {

  let inviteLink = 'https://publishing.graphitedocs.com/invites/?' + loadUserData().username + '?' + getGlobal().newTeammateId;
  const object = {};
  object.from_email = "contact@graphitedocs.com";
  object.to_email = getGlobal().newTeammateEmail;
  object.subject = 'Join the ' + getGlobal().accountName + ' team';
  object.name = getGlobal().newTeammateName;
  object.content = "<div style='text-align:center;'><div style='background:#282828;width:100%;height:auto;margin-bottom:40px;'><h3 style='color:#ffffff;'>" + getGlobal().accountName + "</h3></div><h3>You've been invited to join the " + getGlobal().accountName + " team!</h3><p>Accept the invite by clicking the below link:</p><br><a href=" + inviteLink + ">" + inviteLink + "</a></div>"
  if(getGlobal().newTeammateEmail) {
    axios.post("https://wt-3fc6875d06541ef8d0e9ab2dfcf85d23-0.sandbox.auth0-extend.com/teammate-invite", object)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      setTimeout(this.accountDetails, 500);
  } else {
    window.M.toast({html: 'Since the teammate does not have an email, but sure to send the invite link.'})
    setTimeout(this.accountDetails, 500);
  }
}

export function saveInvite() {
  const inviteFile = {};
  inviteFile.inviter = loadUserData().username;
  inviteFile.inviterKey = getPublicKeyFromPrivate(loadUserData().appPrivateKey);
  inviteFile.inviteDate = Date.now();
  inviteFile.accountName = getGlobal().accountName;
  if(loadUserData().username === getGlobal().ownerBlockstackId) {
    inviteFile.inviterEmail = getGlobal().ownerEmail;
  } else {
    let index = getGlobal().team.findIndex(x => x.blockstackId === loadUserData().username);
    inviteFile.inviterEmail = getGlobal().team[index].email;
  }
  inviteFile.inviteeName = getGlobal().newTeammateName;
  inviteFile.inviteeEmail = getGlobal().newTeammateEmail;
  inviteFile.inviteeBlockstackId = getGlobal().newTeammateBlockstackId;
  inviteFile.inviteeRole = getGlobal().newTeammateRole;
  inviteFile.inviteeId = getGlobal().newTeammateId;
  inviteFile.inviteeKey = "";
  inviteFile.inviteAccepted = false;
  putFile(getGlobal().newTeammateId + '.json', JSON.stringify(inviteFile), {encrypt: false})
    .then(() => {
      this.sendInvite();
    })
    .catch(error => {
      console.log(error);
    })
}
