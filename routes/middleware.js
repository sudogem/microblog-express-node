// Place our middleware here
var config = require('../settings');
var jwt = require('jwt-simple');

exports.checkHeaderToken = function(req, res, next) {
  // var token = req.headers['x-auth-token'];
  // var token = req.get('Authorization');
  var token = req.headers;

  // console.log('checkHeaderToken token=', token);
  console.log('token:',JSON.stringify(req.headers, null,1));
  return next();
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
    if (decoded.exp <= Date.now()) {
      return res.status(401).json({'error': 'Access token has expired'});
    }

    // if () {
    //
    // }
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
