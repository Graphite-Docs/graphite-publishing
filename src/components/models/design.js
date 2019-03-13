import { Model } from 'radiks';

export default class Design extends Model {
  static className = 'Design';

  static schema = {
    publicationCreator: {
      decrypted: true,
      type: String
    },
    mainPage: {
        decrypted: true, 
        type: String
    }, 
    postPage: {
        decrypted: true, 
        type: String
    }
  }
}
