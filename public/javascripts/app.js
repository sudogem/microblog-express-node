'use strict';

var app = angular.module('blog', [
  'blog.controllers',
  'flash.services',
  'ngRoute',
  'ngCookies',
]);

  app.run(['$rootScope', '$window', '$cookies', '$location', function($rootScope, $window, $cookies, $location) {
    var currentUser = $cookies.getObject('user');
    if (currentUser) {
      $rootScope.user = currentUser;
    }
    console.log('c=', $location);
  }])
  .config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/', { templateUrl: 'partials/index', controller: 'IndexController' }).
    when('/add', { templateUrl: 'partials/add_new_post', controller: 'AddNewPostController' }).
    when('/edit_post/:id', { templateUrl: 'partials/edit_post', controller: 'EditPostController' }).
    when('/delete_post/:id', { templateUrl: 'partials/delete_post', controller: 'DeletePostController' }).
    otherwise({ redirectTo: '/' });
  }]);
