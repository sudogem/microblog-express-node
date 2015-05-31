
angular.module('blog.controllers', []).
controller('IndexController', function($scope, $http, flash) {
  console.log('IndexController');
  $http.get('/posts').
    success(function(data, status, headers, config) {
      $scope.total = data.posts.length;
      $scope.posts = data.posts;
      $scope.flash = flash;
    });
}).
controller('AddNewPostController', function($scope, $http, $location, flash) {
  console.log('AddNewPostController');
  $scope.form = {};

  $scope.submitPost = function() {
    $http.post('/posts', $scope.form).
      success(function(data, status, headers, config) {
        console.log(data);
        flash.setMessage(data.msg);
        $location.path('/');
      });
  }
}).
controller('EditPostController', function($scope, $routeParams, $http, $location, flash) {
  console.log('EditPostController');
  var id = $routeParams.id;
  console.log('id:', id);
  $scope.form = {};

  $http.get('/posts/'+id).
    success(function(data, status, headers, config) {
      console.log('data:', data);
      $scope.form = data.post;
    }).
    error(function(data, status, headers, config) {
      console.log('error:', data);
    });

  $scope.editPost = function() {
    console.log('edit post:', $scope.form);
    $http.put('/posts/'+id, $scope.form).
      success(function(data, status, headers, config) {
        console.log('data:', data);
        $scope.form = data.post;
        flash.setMessage(data.msg);
        $location.url('/');
      }).
      error(function(data, status, headers, config) {
        console.log('error:', data);
      });    
  }

}).
controller('DeletePostController', function($scope, $routeParams, $http, $location, flash) {
  console.log('DeletePostController');

  $scope.deletePost = function() {
    var id = $routeParams.id;    
    $http.delete('/posts/'+id).
      success(function(data, status, headers, config) {
      console.log('data:', data);
      flash.setMessage(data.msg);
      $location.url('/');
      });
  };

  $scope.home = function() {
    $location.url('/');
  };


});

