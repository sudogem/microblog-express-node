var PostModel = require('../../models/post');

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
      .catch( /* istanbul ignore next */ function(err){
        console.log('[ROUTE_API_POST] getPost err:',err);
        res.status(404).send(err);
      });
  };

  updatePost = function(req, res) {

  };

  app.post('/api/post', createPost);
  app.get('/api/post', getPost);
  // app.update('/api/post', getPost);
};
