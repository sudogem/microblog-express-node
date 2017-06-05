var PostModel = require('../../models/post');
var i18n = require('i18n');

module.exports = function(app, includes) {
  // var middleware = includes.middleware;

  createPost = function(req, res) {
    console.log('[ROUTE_API_POST] createPost:',req.body);
    PostModel.create(req.body)
      .then(function(result) {
        console.log('[ROUTE_API_POST] createPost result:',result);
        res.status(200).send(result);
      })
      .catch(function(err) {
        console.log('[ROUTE_API_POST] createPost err:',err);
        res.status(404).send(err);
      });
  };

  getPost = function(req, res) {
    var id = req.params.postId;
    console.log('[ROUTE_API_POST] getPost:',id);
    PostModel.get(id)
      .then(function(result){
        console.log('[ROUTE_API_POST] getPost result.length:',result.length);
        res.status(200).send({posts: result});
      })
      .catch(function(err){
        console.log('[ROUTE_API_POST] getPost err:',err);
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
        console.log('[ROUTE_API_POST] updatePost result:',result);
        res.status(200).send({posts: result});
      })
      .catch(function(err){
        console.log('[ROUTE_API_POST] updatePost err:',err);
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
        console.log('[ROUTE_API_POST] deletePost result:',result);
        if (result === null) {
          return res.status(404).json({'success': false, 'msg': i18n.__('PostNotFound')});
        }
        res.status(200).send(result);
      })
      .catch(function(err){
        console.log('[ROUTE_API_POST] deletePost err:',err);
        res.status(404).send(err);
      });
  };

  app.post('/api/post', createPost);
  app.get('/api/post', getPost);
  app.put('/api/post', updatePost);
  app.delete('/api/post/:id', deletePost);
};
