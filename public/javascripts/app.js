
angular.module('blog', ['blog.filters', 'blog.services', 'blog.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', { templateUrl: 'partials/index', controller: IndexController }).
      when('/add_new_post', { templateUrl: 'partials/add_new_post', controller: AddNewPostController } ).
      otherwise({redirectTo: '/' });
    $locationProvider.html5Mode(true);
  }]);