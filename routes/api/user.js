var UserModel = require('../../models/user');

module.exports = function(app, includes) {
  // var middleware = includes.middleware;

  createUser = function(req, res) {
    console.log('[ROUTE_API_USER] createUser:',req.body);
    UserModel.create(req.body)
      .then(function(result) {
        console.log('[ROUTE_API_USER] result:',result);
        res.status(200).send(result);
      })
      .catch(function(err) {
        console.log('[ROUTE_API_USER] err:',err);
        res.status(404).send(err);
      });
  };

  app.post('/api/user/create', createUser);
};
