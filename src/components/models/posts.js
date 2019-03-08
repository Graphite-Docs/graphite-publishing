import { Model } from 'radiks';

export default class Post extends Model {
  static className = 'Post';

  static schema = {
    author: String, 
    title: String,
    status: String,
    tags: Array,
    wordCount: Number,
    lastUpdated: String,
    publicLink: String
  }
}
