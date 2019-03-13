import { Model } from 'radiks';

export default class Publication extends Model {
  static className = 'Publication';

  static schema = {
    name: String,
    creator: {
        decrypted: true, 
        type: String
    }, 
    creatorEmail: String, 
    logo: Object
  }
}
