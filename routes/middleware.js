// Place our middleware here
var config = require('../settings');
var jwt = require('jwt-simple');
var moment = require('moment');

exports.checkHeaderToken = function(req, res, next) {
  var token = req.headers['x-auth-token'];
  console.log('[routes/middleware.js] exports.checkHeaderToken() token:',token);
  console.log('[routes/middleware.js] exports.checkHeaderToken() token:',req.get('Authorization'));
  if (!token) {
    res.status(401).json({
      'success': false,
      'msg': 'Not authorized - No access token'
    });
    return;
  }
  try {
    var decoded = jwt.decode(token, config.jwtTokenSecret);
    console.log('[routes/middleware.js] exports.checkHeaderToken() iss:',decoded.iss);
    console.log('[routes/middleware.js] exports.checkHeaderToken() expiry:',moment(decoded.exp).format("DD MMM YYYY hh:mm a"));
    if (decoded.exp <= Date.now()) {
      return res.status(401).json({'error': 'Access token has expired'});
    }
    if (decoded.iss === 123456789) { //request from ui
      req.user = decoded;
      return next();
    } else {
      res.status(401).json({'error': 'Unauthorized - User is not valid'});
      return;
    }
    // users.get_one(decoded.iss, function(err, user) {
    // });
  } catch (e) {
    res.status(500).json({
      'success': false,
      'msg': 'Error during token decoding'
    });
    return;
  };
};

exports.isAuthenticated = function(req, res, next) {
  var token = req.headers['x-auth-token'];
  req.authenticated = false;
  if (!token) {
    return next();
  }
  if (token) {
    var decoded = jwt.decode(token, config.jwtTokenSecret);
    verifyUser(decoded, function(err, result) {
      if (err) {
        // res.status(401).json({
        //   'success': false,
        //   'msg': err
        // });
        // return;
        console.log('[routes/middleware.js] exports.isAuthenticated() isAuthenticated err:',err);
      }
      if (result) {
        req.user = decoded;
        req.authenticated = true;
      }
    });
    console.log('[routes/middleware.js] exports.isAuthenticated() req.authenticated:',req.authenticated);
    console.log('[routes/middleware.js] exports.isAuthenticated() expiry:',moment(decoded.exp).format("DD MMM YYYY hh:mm a"));
    return next();
  }
}

function verifyUser(decoded, cb) {
  if (decoded) {
    try {
      if (decoded.exp <= Date.now()) {
        return cb({'error': 'Access token has expired'});
      }
      if (decoded.iss === 123456789) { //request from ui
        // req.user = decoded;
        return cb(null, true);
      } else {
        return cb({'error': 'Unauthorized - User is not valid'});
      }
    } catch (e) {
      return cb({'error': e});
    }
  }
}
