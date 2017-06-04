var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = require('bluebird');
var moment = require('moment');

var postSchema = {
  title: {
    type: String,
    required: [true, 'Post Title is required.'],
  },
  body: {
    type: String,
    required: [true, 'Post Body is required.'],
  },
  created_at: {
    type: Date,
    default: new Date(moment.utc())
  },
  updated_at: {
    type: Date,
    default: new Date(moment.utc())
  }
}

var PostSchema = new Schema(postSchema);
var Post = mongoose.model('posts', PostSchema);

var post = {
  create: function(postData) {
    return new Promise(function(resolve, reject) {
      // return Post.create(postData); // invalid calling
      Post.create(postData)
        .then(function(result) {
          resolve(result);
        })
        .catch(function(err){
          return reject(err);
        });
    });
  },
  get: function(postId) {
    return new Promise(function(resolve, reject) {
      if (postId) {
        Post.findOne({_id: postId}).exec()
          .then(function(result) {
            resolve(result);
          })
          .catch(function(err){
            return reject(err);
          });
      } else {
        Post.find().exec()
        .then(function(result){
          resolve(result);
        })
        .catch(function(err){
          reject({'error':err});
        });
      }
    });
  }
};

module.exports = post;
