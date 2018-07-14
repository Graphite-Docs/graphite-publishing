import {
  getFile,
  loadUserData,
  putFile
} from 'blockstack';
import axios from 'axios';
import update from 'immutability-helper';
const uuidv4 = require('uuid/v4');
const { getPublicKeyFromPrivate } = require('blockstack');

export function handleTeammateName(e) {
  this.setState({ newTeammateName: e.target.value });
}

export function handleTeammateId(e) {
  this.setState({ newTeammateBlockstackId: e.target.value });
}

export function handleTeammateEmail(e) {
  this.setState({ newTeammateEmail: e.target.value });
}

export function handleTeammateRole(e) {
  this.setState({ newTeammateRole: e.target.value });
}

export function addTeammate() {
  if(this.state.newTeammateId !== "") {
    if(this.state.newTeammateName !== "" && this.state.newTeammateRole !== "") {
      const options = { username: this.state.newTeammateId, zoneFileLookupURL: "https://core.blockstack.org/v1/names", decrypt: false }
      getFile('key.json', options)
        .then((file) => {
          this.setState({ pubKey: JSON.parse(file)})
        })
          .then(() => {
            const today = new Date();
            const day = today.getDate();
            const month = today.getMonth() + 1;
            const year = today.getFullYear();
            const object = {};
            object.name = this.state.newTeammateName;
            object.email = this.state.newTeammateEmail;
            object.blockstackId = this.state.newTeammateId;
            object.role = this.state.newTeammateRole;
            object.id = uuidv4();
            object.added = month + "/" + day + "/" + year;
            object.key = this.state.pubKey;
            this.setState({ team: [...this.state.team, object] });
            window.M.toast({html: 'Teammate added'});
            setTimeout(this.saveInvite, 300);
          })
          .catch(error => {
            console.log(error)
            const today = new Date();
            const day = today.getDate();
            const month = today.getMonth() + 1;
            const year = today.getFullYear();
            const object = {};
            object.name = this.state.newTeammateName;
            object.email = this.state.newTeammateEmail;
            object.blockstackId = this.state.newTeammateId;
            object.role = this.state.newTeammateRole;
            object.id = uuidv4();
            object.added = month + "/" + day + "/" + year;
            object.key = "";
            this.setState({ team: [...this.state.team, object] });
            window.M.toast({html: 'Teammate added'});
            setTimeout(this.saveInvite, 300);
          });
    } else {
      let toastHTML = '<span style="color: #e53935;">Please check the name or role you entered.</span>';
      window.M.toast({html: toastHTML});
    }
  } else {
    if(this.state.newTeammateName !== "" && this.state.newTeammateRole !== "") {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const object = {};
      object.name = this.state.newTeammateName;
      object.email = this.state.newTeammateEmail;
      object.blockstackId = this.state.newTeammateId;
      object.role = this.state.newTeammateRole;
      object.id = uuidv4();
      object.added = month + "/" + day + "/" + year;
      object.key = "";
      object.inviteLink = 'https://publishing.graphitedocs.com/invites/?' + loadUserData().username + '?' + object.id;
      this.setState({ team: [...this.state.team, object], newTeammateId: object.id });
      window.M.toast({html: 'Teammate added'});
      setTimeout(this.saveInvite, 300);
    } else {
      let toastHTML = '<span style="color: #e53935;">Please check the name or role you entered.</span>';
      window.M.toast({html: toastHTML});
    }
  }
}

export function teammateToDelete(props) {
    let team = this.state.team;
    let result = window.$.grep(team, function(e){
      return e.id !== props;
    });
    this.setState({
      team: result,
    })
    window.M.toast({html: 'Teammate deleted'});
    setTimeout(this.accountDetails, 300);
}

export function updateTeammate(props) {
    let team = this.state.team;
    const thisMate= team.find((mate) => { return mate.id === props});
    let index = thisMate && thisMate.id;
    function findObjectIndex(mate) {
        return mate.id === index;
    }
    this.setState({teammateIndex: team.findIndex(findObjectIndex), newTeammateName: thisMate && thisMate.name, newTeammateId: thisMate && thisMate.blockstackId, newTeammateKey: thisMate && thisMate.key, id: thisMate && thisMate.id });
    setTimeout(this.updateRole, 300);
}

export function updateRole() {
    const object = {};
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const index = this.state.teammateIndex;
    object.name = this.state.newTeammateName;
    object.role = this.state.newTeammateRole;
    object.added = month + "/" + day + "/" + year;
    object.blockstackId = this.state.newTeammateBlockstackId;
    object.key = this.state.newTeammateKey;
    object.id = this.state.id;
    const updatedTeam = update(this.state.team, {$splice: [[index, 1, object]]});
    this.setState({ team: updatedTeam });
    window.M.toast({html: 'Teammate updated'});
    setTimeout(this.accountDetails, 300);
}

export function sendInvite() {

  let inviteLink = 'https://publishing.graphitedocs.com/invites/?' + loadUserData().username + '?' + this.state.newTeammateId;
  const object = {};
  object.from_email = "contact@graphitedocs.com";
  object.to_email = this.state.newTeammateEmail;
  object.subject = 'Join the ' + this.state.accountName + ' team';
  object.content = "<div style='text-align:center;'><div style='background:#282828;width:100%;height:auto;margin-bottom:40px;'><h3 style='color:#ffffff;'>" + this.state.accountName + "</h3></div><h3>You've been invited to join the " + this.state.accountName + " team!</h3><p>Accept the invite by clicking the below link:</p><p>" + inviteLink + "</p></div>"
  this.setState({ })
  if(this.state.newTeammateEmail) {
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
  inviteFile.accountName = this.state.accountName;
  putFile(this.state.newTeammateId + '.json', JSON.stringify(inviteFile), {encrypt: false})
    .then(() => {
      this.sendInvite();
    })
    .catch(error => {
      console.log(error);
    })
}
