// initialize our faux database
var data = {
  "posts": [
    {
      "title": "Lorem ipsum",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "title": "Sed egestas",
      "text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus."
    },
    {
      "title": "Sed",
      "text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus."
    },
    {
      "title": "quote",
      "text": "REPEAT AFTER ME: ‘My current situation is not my final destination’"
    }
  ]
};

exports.posts = function(req, res) {
  console.log('------------------------------------------');
  console.log('CALL exports.posts');
  var posts = [];
  data.posts.forEach(function(post, i) {
    posts.push({
      id: i,
      title: post.title,
      text: post.text.substr(0, 50) + '...'
    });
  });
  res.json({
    posts: posts
  });
};

exports.edit_post = function(req, res) {
  console.log('------------------------------------------');
  console.log('CALL exports.edit_post');
  var id = req.params.id;
  console.log('id:', id);
  var posts = [];
  if (data.posts.length > 0 && data.posts[id]) {
    console.log('data:', data.posts[id]);
    res.json({post: data.posts[id]});
  } else {
    res.json({msg:'Post not Found.'}); 
  }
};

exports.add_post = function(req, res) {
  console.log('------------------------------------------');
  console.log('CALL exports.add_post');
  console.log('params:', req.body);
  data.posts.push(req.body);
  res.json({msg: 'Successfully created post.'});
};

exports.update_post = function(req, res) {
  console.log('------------------------------------------');
  console.log('CALL exports.update_post');
  console.log('params:', req.body);
  var id = req.params.id;
  console.log('id:', id);
  console.log('before data:', data.posts[id]);
  var posts = [];
  if (id) {
    data.posts[id] = req.body;
    console.log('updated data:', data.posts[id]);
    res.json({msg: 'Successfully updated post.'});
  } else {
    res.json({msg: 'Post not Found.'}); 
  }
};

exports.delete_post = function(req, res) {
  console.log('------------------------------------------');
  console.log('CALL exports.delete_post');
  var id = req.params.id;
  data.posts.splice(id, 1);
  res.json({msg: 'Successfully deleted post.'});
};