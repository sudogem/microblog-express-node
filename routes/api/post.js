var PostModel = require('../../models/post');
var i18n = require('i18n');

module.exports = function(app, includes) {
  var middleware = includes.middleware;

  createPost = function(req, res) {
    console.log('[ROUTEAPIPOST] createPost:',req.body);
    PostModel.create(req.body)
      .then(function(result) {
        console.log('[ROUTEAPIPOST] createPost result:',result);
        res.status(200).send(result);
      })
      .catch(function(err) {
        console.log('[ROUTEAPIPOST] createPost err:',err);
        res.status(404).send(err);
      });
  };

  getPost = function(req, res) {
    var id = req.params.id;
    PostModel.get(id)
      .then(function(result){
        if(id) console.log('[ROUTEAPIPOST] id:',id);
        console.log('[ROUTEAPIPOST] getPost result:',result);
        // res.status(200).send({posts: result});
        res.json({
          isAuthorized: (req.authenticated) ? true : false,
          posts: result
        });
      })
      .catch(function(err){
        console.log('[ROUTEAPIPOST] getPost err:',err);
        res.status(404).send(err);
      });
  };

  updatePost = function(req, res) {
    var postId = req.body._id;
    if (!postId) {
      return res.status(404).json({'success': false, 'msg': i18n.__('PostIdRequired')});
    }
    PostModel.update(req.body)
      .then(function(result){
        console.log('[ROUTEAPIPOST] updatePost result:',result);
        res.status(200).send({posts: result});
      })
      .catch(function(err){
        console.log('[ROUTEAPIPOST] updatePost err:',err);
        res.status(404).send(err);
      });
  };

  deletePost = function(req, res) {
    var postId = req.params.id;
    if (!postId) {
      return res.status(404).json({'success': false, 'msg': i18n.__('PostIdRequired')});
    }
    PostModel.delete(postId)
      .then(function(result){
        console.log('[ROUTEAPIPOST] deletePost result:',result);
        if (result === null) {
          return res.status(404).json({'success': false, 'msg': i18n.__('PostNotFound')});
        }
        res.status(200).send(result);
      })
      .catch(function(err){
        console.log('[ROUTEAPIPOST] deletePost err:',err);
        res.status(404).send(err);
      });
  };

  app.post('/api/post', createPost);
  app.get('/api/post/:id?', middleware.isAuthenticated, getPost);
  app.put('/api/post', updatePost);
  app.delete('/api/post/:id', deletePost);
};
