'use strict';

var app = angular.module('app', [
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
        var currentUser = $cookies.getObject('user');
        console.log('routeChangeStart=', next);
        console.log('currentUser=', currentUser);
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
        when('/', { controller: 'IndexController', templateUrl: 'partials/index', public: true}).
        when('/add', { controller: 'AddNewPostController', templateUrl: 'partials/add_new_post', public: false}).
        when('/edit_post/:id', { controller: 'EditPostController', templateUrl: 'partials/edit_post', public: false}).
        when('/delete_post/:id', { controller: 'DeletePostController', templateUrl: 'partials/delete_post', public: false}).
        when('/login', { controller: 'AuthController.login', templateUrl: 'api/v1/auth/loginform', public: true}).
        when('/logout', { controller: 'AuthController.logout', template: ''});

      // remove hashes from location URL
      $locationProvider.html5Mode(true);
  }]);
