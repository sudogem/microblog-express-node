
angular.module('blog.controllers', []).
controller('IndexController', function($scope, $http, flash) {
  console.info('[IndexController]');
  $http.get('/api/post').
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
  console.info('EditPostController');
  var id = $routeParams.id;
  console.info('id:', id);
  $scope.form = {};

  $http.get('/api/post/'+id).
    success(function(data, status, headers, config) {
      console.info('data:', data);
      $scope.form = data.post;
    }).
    error(function(data, status, headers, config) {
      console.info('error:', data);
    });

  $scope.editPost = function() {
    console.info('edit post:', $scope.form);
    $http.put('/posts/'+id, $scope.form).
      success(function(data, status, headers, config) {
        console.info('data:', data);
        $scope.form = data.post;
        flash.setMessage(data.msg);
        $location.url('/');
      }).
      error(function(data, status, headers, config) {
        console.info('error:', data);
      });    
  }

}).
controller('DeletePostController', function($scope, $routeParams, $http, $location, flash) {
  console.info('DeletePostController');

  $scope.deletePost = function() {
    var id = $routeParams.id;    
    $http.delete('/posts/'+id).
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

