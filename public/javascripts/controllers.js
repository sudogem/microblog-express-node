
angular.module('blog.controllers', []).
controller('IndexController', function($scope, $http, flash) {
  console.log('IndexController');
  $scope.activeTab = 'home';
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
  $scope.activeTab = 'add';
  $scope.submitPost = function() {
    $http.post('/posts', $scope.form).
      success(function(data, status, headers, config) {
        console.log('AddNewPostController submitPost:', data);
        if (data && data.success == false) {
          $scope.form.error = data.msg;
          $scope.form.formError = true;
        } else {
          flash.setMessage(data.msg);
          $location.path('/');
        }
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
  var id = $routeParams.id;
  $http.get('/posts/'+id).
    success(function(data, status, headers, config){
      $scope.post = data.post;
      console.log($scope.post);
    }).
    error(function(data, status, headers, config) {
      console.log('error:', data);
    });

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

}).
controller('AuthController', ['$scope', '$rootScope', '$http', '$location', '$cookies',
  function($scope, $rootScope, $http, $location, $cookies) {
    console.log('AuthController');
    $scope.data = {
      username: '',
      password: ''
    };
    $scope.doLogin = function() {
      console.log('doLogin', $scope.data);
      var endpoint = 'http://localhost:4010';
      $http.post(endpoint + '/api/v1/ui/auth', {
        username: $scope.data.username,
        password: $scope.data.password
      })
      .success(function(data, status, headers, config) {
        $scope.loading = false;
        if (data.token) {
          $location.path('/');
          $rootScope.user = data;
          console.log('success:', data);
          $cookies.putObject('user', data);
        } else {
          $scope.errors = ['Invalid login credentials'];
        }
      })
      .error(function(data, status, headers, config) {
        $scope.loading = false;
        if (data && data.errors) {
          $scope.errors = data.errors;
        } else {
          $scope.errors = ['Unknown error occurred'];
        }
      });
    }
  }]);
