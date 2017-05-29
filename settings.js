module.exports = {
	mongoDbURL: process.env.mongoDbURL || 'mongodb://localhost/microblog-express-node-db'
};

// var loggers = require('./middleware/logger');
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

if (module.exports.mongoDbURL && module.exports.mongoDbURL != '') {
  var mongoOptions = {
    'server': {
      'socketOptions': {
        'keepAlive': 300000,
        'connectTimeoutMS': 60000
      }
    },
    'replset': {
      'socketOptions': {
        'keepAlive': 300000,
        'connectTimeoutMS' : 60000
      }
    }
  };
  mongoose.connect(module.exports.mongoDbURL, mongoOptions);
  // loggers.get('init').info('Connecting to mongoDB');
  console.log('Connecting to mongoDB:', module.exports.mongoDbURL);
  module.exports.mongoose = mongoose;
}
else {
  // Stub-out so we don't get errors
  module.exports.mongoose = {
    model: function() {},
    schema: ''
  };
}
