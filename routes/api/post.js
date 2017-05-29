var PostModel = require('../../models/post');

module.exports = function(app, includes) {
  // var middleware = includes.middleware;

  createPost = function(req, res) {
    console.log('[ROUTE_API_POST] createPost:',req.body);
    PostModel.create(req.body)
      .then(function(result) {
        console.log('[ROUTE_API_POST] result:',result);
        res.status(200).send(result);
      })
      .catch(function(err) {
        console.log('[ROUTE_API_POST] err:',err);
        res.status(404).send(err);
      });
  };

  app.post('/api/post/create', createPost);
};
