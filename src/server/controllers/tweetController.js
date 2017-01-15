// @flow
import Tweet from '../models/Tweet.model';
import ErrorResponseHandler from '../helpers/ErrorResponseHandler';
import GuardAgainstMissingParameter from '../guards/GuardAgainstMissingParameter';

const tweetParameters: Array<string> = [
  'hashTag',
  'secondHashTag',
  'plain',
  'text',
  'link',
  'shortUrl',
];

export function create(req: Object, res: Object) {
  try{
    (new GuardAgainstMissingParameter(req.body, tweetParameters)).guard();

    const tweet: Object = new Tweet(req.body);

    tweet.save((err, tweet) => {
      if (err) {
        (new ErrorResponseHandler(res, err)).writeResponse();
      }

      res.status(200).json(tweet);
    });
  } catch(e) {
    console.log('-----------------------');
    (new ErrorResponseHandler(res, e)).writeResponse();
  }
}

export function read(req: Object, res: Object) {
  try{
    Tweet.find(req.query, (err, tweets) => {
      if (err) {
        (new ErrorResponseHandler(res, err)).writeResponse();
      }

      // object of all the users
      res.status(200).json(tweets);
    });
  } catch(e) {
    (new ErrorResponseHandler(res, e)).writeResponse();
  }
}

export function update(req: Object, res: Object) {
  try{
    Tweet.findByIdAndUpdate(req.params.id, req.body, (err) => {
      if (err) {
        (new ErrorResponseHandler(res, err)).writeResponse();
      }

      // object of all the users
      Tweet.findById(req.params.id, (errFind, tweet) => {
        if (err) {
          (new ErrorResponseHandler(res, errFind)).writeResponse();
        }

        res.status(200).send(tweet);
      });
    });
  } catch(e) {
    (new ErrorResponseHandler(res, e)).writeResponse();
  }
}

export function remove(req: Object, res: Object) {
  try{
    Tweet.findByIdAndRemove(req.params.id, req.body, (err, tweet) => {
      if (err) {
        (new ErrorResponseHandler(res, err)).writeResponse();
      }

      res.status(200).send(tweet);
    });
  } catch(e) {
    (new ErrorResponseHandler(res, e)).writeResponse();
  }
}

export default {
  create,
  read,
  update,
  delete: remove,
};
