'use strict';

var app = angular.module('blog', [
  'blog.controllers',
  'flash.services',
  'ngRoute',
  'ngCookies',
]);

  app.run(['$rootScope', '$window', '$cookies', '$location',
    function($rootScope, $window, $cookies, $location) {
      var currentUser = $cookies.getObject('user');
      if (currentUser) {
        $rootScope.user = currentUser;
      }
      console.log('location=', $location);
      console.log('currentUser=', currentUser);

      // Prevent unauthenticated user from accessing protected route
      $rootScope.$on('$routeChangeStart', function(event, next, current) {
        console.log('routeChangeStart=', next);
        console.log('public=', !next.$$route.public);
        var allowed = true;
        if (!$rootScope.user) {
          if (!next.$$route.public) {
            allowed = false;
          }
        } else if (!$rootScope.user.admin && next.$$route.admin) {
          allowed = false;
        }

        if (!allowed) {
          event.preventDefault();
          $location.path('/login');
        }

      });
      $rootScope.$on('$routeChangeError', function(event, next, current) {
        $location.path('/');
      });
  }])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider.
        when('/', { templateUrl: 'partials/index', controller: 'IndexController', public: true}).
        when('/add', { templateUrl: 'partials/add_new_post', controller: 'AddNewPostController', public: false}).
        when('/edit_post/:id', { templateUrl: 'partials/edit_post', controller: 'EditPostController', public: false}).
        when('/delete_post/:id', { templateUrl: 'partials/delete_post', controller: 'DeletePostController', public: false}).
        when('/login', {
          controller: 'AuthController',
          templateUrl: 'api/v1/auth/loginform',
          public: true,
        });

      // remove hashes from location URL
      // $locationProvider.html5Mode(true);
  }]);
