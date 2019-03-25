import { Model } from 'radiks';

export default class PublicPost extends Model {
  static className = 'PublicPost';

  static schema = {
    author: {
      decrypted: true, 
      type: String
    },  
    title: {
        decrypted: true, 
        type: String
    },
    tags: {
        decrypted: true, 
        type: String
    },
    lastUpdated: {
        decrypted: true,
        type: String
    },
    publishedDate: {
        decrypted: true,
        type: String
    },
    convergence: {
      decrypted: true, 
      type: Boolean
    },
    deleted: {
      decrypted: true, 
      type: Boolean
    }
  }
}
