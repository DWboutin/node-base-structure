// @flow
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tweetSchema: Object = new Schema({
  hashTag: { type: String, required: true },
  secondHashTag: { type: String, required: true },
  plain: { type: String, required: true },
  text: { type: String, required: true },
  link: { type: String, required: true },
  shortUrl: { type: String, required: true },
  created_at: Date,
  published_at: Date,
});

tweetSchema.pre('save', function(next) {
  const currentDate: Date = new Date();

  if (!this.created_at) {
    this.created_at = currentDate;
  }

  next();
});

const Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet;