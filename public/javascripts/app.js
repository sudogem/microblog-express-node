'use strict';

angular.module('blog', [
  'blog.controllers',
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', { templateUrl: 'partials/index', controller: 'IndexController' }).
    when('/add', { templateUrl: 'partials/add_new_post', controller: 'AddNewPostController' }).
    otherwise({ redirectTo: '/' });

  }]);
