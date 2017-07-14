var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var posts = [];
  res.render('index', { title: 'AngularJS blog app', description: 'Built using AngularJS, Jade, ExpressJS. Deployed to Openshift'});
});

// lets render the jade file into HTML
router.get('/partials/:name', function(req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
});

module.exports = router;
