var BasicStrategy   = require('passport-http').BasicStrategy;
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../settings');

var BasicStrategy   = require('passport-http').BasicStrategy;
module.exports = function(passport) {
  passport.use('api_login', new BasicStrategy(
    function(username, password, done) {
      console.log('user:',username);
      console.log('pass:',password);
      validateAuth(username, password, function(err, result) {
        /* istanbul ignore next */
        if (err) {
          return done(null, err);
        }

        authenticate({
          user: username,
          pass: password,
        }, done);
      });
    }
  ));

  var validateAuth = function(user, password, done) {
    return done(null, user);
  }

  var authenticate = function(user, done) {
    return done(null, createUserToken(user));
  };

  // create user jwt token
  var createUserToken = function(user) {
    var expires = moment().add(2, 'minutes').valueOf();
    var payload = {
      iss: user._id,
      exp: expires,
    };

    if (user['is_admin'] === true) {
      payload.admin = true;
    }

    var token = jwt.encode(payload, config.jwtTokenSecret);
    var email = user.email || '';
    email = email.toLowerCase().trim();

    var response = {
      token: token,
      expires: expires,
      user: email,
      name: user.name
    };

    if (user['first_login'] === true) {
      response.welcome = true;
    }

    if (user['is_admin'] === true) {
      response.admin = true;
    }
    console.log('createUserToken:',response);
    return response;
  };
};
