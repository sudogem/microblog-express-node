// Place our middleware here
var config = require('../settings');
var jwt = require('jwt-simple');

exports.checkHeaderToken = function(req, res, next) {
  var token = req.headers['x-auth-token'];
  console.log('checkHeaderToken token=',token);
  console.log('checkHeaderToken token=',req.get('Authorization'));
  if (!token) {
    res.status(401).json({
      'success': false,
      'msg': 'Not authorized - No access token'
    });
    return;
  }
  try {
    var decoded = jwt.decode(token, config.jwtTokenSecret);
    console.log('checkHeaderAuth iss:', decoded.iss);
    console.log('checkHeaderAuth iss:', typeof(decoded.iss) );
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
  console.log('\nexports.isAuthenticated token:',token);
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
        //   'msg': err.error
        // });
        // return;
        console.log('isAuthenticated e1:',err);
      }
      if (result) {
        req.user = decoded;
        req.authenticated = true;
      }
    });

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
