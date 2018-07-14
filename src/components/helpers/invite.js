import {
  getFile
} from 'blockstack'

export function loadInvite() {
  let mainLink = window.location.href;
  let userToLoadFrom = mainLink.split('?')[1];
  let fileRoot = mainLink.split('?')[2];
  const options = { username: userToLoadFrom, zoneFileLookupURL: "https://core.blockstack.org/v1/names", decrypt: false}
  getFile(fileRoot + '.json', options)
    .then((fileContents) => {
      console.log(JSON.parse(fileContents || '{}'))
    })
    .catch(error => {
      console.log(error);
    })
}
