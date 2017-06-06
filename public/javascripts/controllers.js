
const postEndpointBaseURL = '/api/post/';

angular.module('blog.controllers', []).
controller('IndexController', function($scope, $http, flash) {
  $http.get(postEndpointBaseURL).
    success(function(data, status, headers, config) {
      console.info('[IndexController] data:', data);
      $scope.total = data.posts.length;
      $scope.posts = data.posts;
      $scope.flash = flash;
    });
}).
controller('AddNewPostController', function($scope, $http, $location, flash) {
  console.info('AddNewPostController');
  $scope.form = {};

  $scope.submitPost = function() {
    $http.post('/api/post', $scope.form).
      success(function(data, status, headers, config) {
        console.info(data);
        flash.setMessage(data.msg);
        $location.path('/');
      });
  }
}).
controller('EditPostController', function($scope, $routeParams, $http, $location, flash) {
  var id = $routeParams.id;
  console.info('[EditPostController] id:',id);
  $scope.form = {};

  $http.get(postEndpointBaseURL + id).
    success(function(data, status, headers, config) {
      console.info('[EditPostController] data:', data.posts);
      $scope.form = data.posts;
    }).
    error(function(data, status, headers, config) {
      console.info('[EditPostController] error:', data);
    });

  $scope.editPost = function() {
    console.info('edit post:', $scope.form);
    $http.put(postEndpointBaseURL, $scope.form).
      success(function(data, status, headers, config) {
        console.info('[EditPostController] data:', data);
        $scope.form = data.post;
        flash.setMessage(data.msg);
        $location.url('/');
      }).
      error(function(data, status, headers, config) {
        console.info('[EditPostController] editPost error:', data);
      });    
  }

}).
controller('DeletePostController', function($scope, $routeParams, $http, $location, flash) {
  console.info('DeletePostController');

  $scope.deletePost = function() {
    var id = $routeParams.id;    
    $http.delete(postEndpointBaseURL + id).
      success(function(data, status, headers, config) {
      console.info('data:', data);
      flash.setMessage(data.msg);
      $location.url('/');
      });
  };

  $scope.home = function() {
    $location.url('/');
  };
});
