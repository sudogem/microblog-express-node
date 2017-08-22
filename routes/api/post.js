var PostModel = require('../../models/post');
var i18n = require('i18n');

module.exports = function(app, includes) {
  var middleware = includes.middleware;

  createPost = function(req, res) {
    console.log('[routes/api/post.js] createPost():',req.body);
    PostModel.create(req.body)
      .then(function(result) {
        console.log('[routes/api/post.js] createPost() result:',result);
        var result = {success:true, post: result};
        res.status(200).json(result);
      })
      .catch(function(err) {
        console.log('[routes/api/post.js] createPost() err:',err.errors);
        var result = {success: false, error: err.errors};
        res.status(400).json(result);
      });
  };

  getPost = function(req, res) {
    var id = req.params.id;
    PostModel.get(id)
      .then(function(result){
        if(id) console.log('[routes/api/post.js] id:',id);
        console.log('[routes/api/post.js] getPost() result:',result);
        res.json({
          isAuthorized: (req.authenticated) ? true : false,
          posts: result
        });
      })
      .catch(function(err){
        console.log('[routes/api/post.js] getPost() err:',err);
        res.status(500).send(err);
      });
  };

  updatePost = function(req, res) {
    var postId = req.body._id;
    console.log('[routes/api/post.js] updatePost() req.body:',req.body);
    if (!postId) {
      return res.status(404).json({'success': false, 'msg': i18n.__('PostIdRequired')});
    }
    PostModel.update(req.body)
      .then(function(result){
        console.log('[routes/api/post.js] updatePost() result:',result);
        res.status(200).send({success: true, posts: result});
      })
      .catch(function(err){
        console.log('[routes/api/post.js] updatePost() err:',err);
        res.status(500).send(err);
      });
  };

  deletePost = function(req, res) {
    var postId = req.params.id;
    if (!postId) {
      return res.status(400).json({'success': false, 'msg': i18n.__('PostIdRequired')});
    }
    PostModel.delete(postId)
      .then(function(result){
        console.log('[routes/api/post.js] deletePost result:',result);
        if (result === null) {
          return res.status(404).json({'success': false, 'msg': i18n.__('PostNotFound')});
        }
        res.status(200).send(result);
      })
      .catch(function(err){
        console.log('[routes/api/post.js] deletePost err:',err);
        res.status(500).send(err);
      });
  };

  app.post('/api/post', middleware.isAuthenticated, createPost);
  app.get('/api/post/:id?', middleware.isAuthenticated, getPost);
  app.put('/api/post/:id?', middleware.isAuthenticated, updatePost);
  app.delete('/api/post/:id', middleware.isAuthenticated, deletePost);
};
