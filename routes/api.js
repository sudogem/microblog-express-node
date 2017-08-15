
var Post = require('../models/post');
var moment = require('moment');
var _ = require('underscore');
var DEBUG = true;

// initialize our faux database
var data = {
  "posts": [
    { "id": 1,
      "title": "Lorem ipsum",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "created_at": new Date(moment.utc())
    },
    { "id": 2,
      "title": "HP Pavilion g6-1d46dx",
      "text": "The HP Pavilion g6-1d46dx was a decent mainstream laptop in its day, and you could replace it with something very similar. ",
      "created_at": new Date(moment.utc())
    },
    { "id": 3,
      "title": "A Google Docs scam",
      "text": "A Google Docs scam that appears to be widespread began landing in users’ inboxes on Wednesday in what seemed to be a sophisticated phishing or malware attack. The deceptive invitation to edit a Google Doc – the popular app used for writing and sharing files – appeared to be spreading rapidly, with a subject line stating a contact has shared a document on Google Docs with you”. If users click the Open in Docs” button in the email, it takes them to a legitimate Google sign-in screen that asks to continue in Google Docs.",
      "created_at": new Date(moment.utc())
    },
    { "id": 4,
      "title": "quote",
      "text": "REPEAT AFTER ME: ‘My current situation is not my final destination’",
      "created_at": new Date(moment.utc())
    }
  ]
};

var singledata = {
  "posts": [
    {
      "title": "Lorem ipsum",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ]
};

exports.posts = function(req, res) {
  console.log('------------------------------------------');
  console.log('[routes/api.js] exports.posts() req.authenticated:',req.authenticated);
  var posts = [];
  data.posts.forEach(function(post, i) {
    posts.push({
      id: i,
      title: post.title,
      text: post.text,
      created_at: post.created_at
    });
  });
  res.json({
    isAuthorized: (req.authenticated) ? true : false,
    posts: posts
  });
};

exports.edit_post = function(req, res) {
  // console.log('------------------------------------------');
  // console.log('CALL exports.edit_post');
  var id = req.params.id;
  // console.log('id:', id);
  var posts = [];
  if (data.posts.length > 0 && data.posts[id]) {
    console.log('data:', data.posts[id]);
    res.json({post: data.posts[id]});
  } else {
    res.json({msg:'Post not Found.'});
  }
};

exports.add_post = function(req, res) {
  // console.log('------------------------------------------');
  // console.log('CALL exports.add_post');
  var tmpdata = req.body;
  var succeed = true;
  console.log('params:', tmpdata);
  var p = new Post(tmpdata);

  if (tmpdata === undefined) {
    res.json({msg: 'Error: Missing fields.', success: false});
    succeed = false;
  }

  if (_.isEmpty(tmpdata.title)) {
    res.json({msg: 'Error: Title is required.', success: false});
    succeed = false;
  }

  if (_.isEmpty(tmpdata.text)) {
    res.json({msg: 'Error: Body is required.', success: false});
    succeed = false;
  }

  if (succeed) {
    var obj = {
      id: tmpdata.id,
      title: tmpdata.title,
      text: tmpdata.text,
      created_at: new Date(moment.utc())
    }
    data.posts.push(obj);
    res.json({msg: 'Successfully created post.'});
  }
};

exports.update_post = function(req, res) {
  // console.log('------------------------------------------');
  // console.log('CALL exports.update_post');
  // console.log('params:', req.body);
  var id = req.params.id;
  // console.log('id:', id);
  // console.log('before data:', data.posts[id]);
  var posts = [];

  if (data.posts[id] !== undefined) {
    data.posts[id] = req.body;
    // console.log('updated data:', data.posts[id]);
    res.json({msg: 'Successfully updated post.'});
  } else {
    res.json({msg: 'Post not Found.'});
  }
};

exports.delete_post = function(req, res) {
  // console.log('------------------------------------------');
  // console.log('CALL exports.delete_post');
  var id = req.params.id;
  data.posts.splice(id, 1);
  res.json({msg: 'Successfully deleted post.'});
};
