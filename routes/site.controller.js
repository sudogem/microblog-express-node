var express = require('express');
var router = express.Router();
var app = express();
var btoa = require('btoa');
var rest = require('restler');
var extend = require('util')._extend;

/**
 * Site controllers for routes that doesn't fit to other components
 */
module.exports = function(passport){
  /* GET home page. */
  router.get('/', function(req, res, next) {
    var posts = [];

    res.render('index', {
      isAuthorized: false,
      title: 'AngularJS blog app',
      description: 'Built using AngularJS, Jade, ExpressJS. Deployed to Openshift'
    });
  });

  // lets render the jade file into HTML
  router.get('/partials/:name', function(req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
  });

  router.get('/api/v1/auth/loginform', function(req, res, next) {
    var posts = [];
    console.log('render login form...');
    res.render('login');
  });

  /* Api auth */
  router.post('/api/v1/auth', passport.authenticate('api_login', {session: false}),
    function(req, res){
      
      res.json(req.user);
    });
  /* Handle auth for browser */
  router.post('/api/v1/ui/auth', function(req, res) {
    var authdata = btoa(req.body.username + ':' + req.body.password);
    var host = req.headers.host;
    var protocol = (req.secure) ? 'https://' : 'http://';
    var auth_url = protocol + host + '/api/v1/auth';
    console.log(' ');
    console.log('===================================================================');
    console.log('Checking authentication status...');
    console.log('Date:', new Date());
    console.log('Host:', host);
    console.log('is_SSL? ', req.secure);
    console.log('AUTH_URL:', auth_url);
    console.log('env:', app.get('env'));
    rest.post(auth_url, {
      headers: {'Authorization': 'Basic ' + authdata}
    }).on('complete', function(data) {
      data = extend(data, { env: app.get('env') });
      res.json(data);
    });
  });

  router.get('/api/v1/auth/logout', passport.authenticate('api_login', {session: false}),
    function(req, res){

      res.json(req.user);
    });
  return router;
};