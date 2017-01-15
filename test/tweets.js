//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../src/server';
import Tweet from '../src/server/models/Tweet.model';

const should = chai.should();

chai.use(chaiHttp);

describe('Tweets', () => {
  let createdId;
  // Before each test we empty the database
  beforeEach((done) => {
    Tweet.remove({}, (err) => {
      done();
    });
  });

  describe('/GET /tweets/find', () => {
    it('it should GET all tweets, but no results', (done) => {
      chai.request(server)
        .get('/tweets/find')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST /tweets/create', () => {
    it('it should create a new tweet', (done) => {
      const tweet = {
        hashTag: '#hashTag',
        secondHashTag: '#hashTag2',
        plain: 'Hash Tag',
        text: 'Hash Tag #hashTag http://goo.gl #hashTag2',
        link: 'http://google.com',
        shortUrl: 'http://goo.gl',
      }

      chai.request(server)
        .post('/tweets/create')
        .send(tweet)
        .end((err, res) => {
          createdId = res.body._id;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('created_at');
          done();
        });
    });
  });

  describe('/PUT /tweets/update/:id', () => {
    it('it should update the newly created hashtag', (done) => {
      const tweet = new Tweet({
        hashTag: '#hashTagUpdate',
        secondHashTag: '#hashTag2',
        plain: 'Hash Tag',
        text: 'Hash Tag #hashTag http://goo.gl #hashTag2',
        link: 'http://google.com',
        shortUrl: 'http://goo.gl',
      });

      tweet.save((err, tweetRes) => {
        chai.request(server)
          .put(`/tweets/update/${tweetRes._id}`)
          .send({hashTag: '#hashTagUpdateModified'})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('created_at');
            res.body.should.have.property('hashTag').eql('#hashTagUpdateModified');
            done();
          });
      });
    });
  });

  describe('/POST /tweets/delete/:id', () => {
    it('it should update the newly created hashtag', (done) => {
      const tweet = new Tweet({
        hashTag: '#hashTagDelete',
        secondHashTag: '#hashTag2',
        plain: 'Hash Tag',
        text: 'Hash Tag #hashTag http://goo.gl #hashTag2',
        link: 'http://google.com',
        shortUrl: 'http://goo.gl',
      });

      tweet.save((err, tweetRes) => {
        chai.request(server)
          .post(`/tweets/delete/${tweetRes._id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('_id').eql(tweetRes._id.toString());
            done();
          });
      });
    });
  });
});

