var api_login = require('./api_login');
// var connections = require('./connections');
// var User = require('../users/users.model');

module.exports = function(passport){
  api_login(passport);
  // connections(passport);
};
