import { Model } from 'radiks';

export default class Post extends Model {
  static className = 'Post';

  static schema = {
    author: {
      decrypted: true, 
      type: String
    },  
    title: String,
    status: String,
    tags: Array,
    wordCount: Number,
    lastUpdated: String,
    publicLink: String,
    publishedDate: String,
    deleted: {
      decrypted: true, 
      type: Boolean
    }
  }
}
