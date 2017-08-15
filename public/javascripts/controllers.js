
angular.module('blog.controllers', []).
controller('IndexController', function($rootScope, $scope, $http, $cookies, flash, utils) {
  $scope.activeTab = 'home';
  $scope.isAuthorized = false;
  // console.log('IndexController utils:', utils);
  var currentUser = $cookies.getObject('user');
  var token = '';
  if ($rootScope.globalUser || (currentUser && currentUser.token)) {
    // $scope.isAuthorized = true;
    token = currentUser.token; // TODO: need to verify the token here..
  }

  $http.get('/posts')
    .success(function(data, status, headers, config) {
      console.log('IndexController isAuthorized:',data);
      $scope.total = data.posts.length;
      $scope.posts = data.posts;
      $scope.flash = flash;
      $scope.isAuthorized = data.isAuthorized;
      if(!data.isAuthorized){
        $rootScope.globalUser = false;
      }
    })
    .error(function(data, status, headers, config) {
      $scope.isAuthorized = false;
      console.log('IndexController error:', data);
    });
}).
controller('AddNewPostController', function($rootScope, $scope, $http, $location, flash, utils) {
  // console.log('AddNewPostController utils',utils);
  $scope.form = {};
  $scope.activeTab = 'add';

  // Check if user is authorized to access the page.
  $http.get('/user')
    .success(function(data, status, headers, config) {
      if(!data.isAuthorized){
        $rootScope.globalUser = false;
        $location.path('/login');
      }
    })
    .error(function(data, status, headers, config) {
      $scope.isAuthorized = false;
      $rootScope.globalUser = false;
      console.log('AddNewPostController error:', data);
    });

  $scope.submitPost = function() {
    $http.post('/posts', $scope.form)
      .success(function(data, status, headers, config) {
        console.log('AddNewPostController submitPost:', data);
        if (data && data.success == false) {
          $scope.form.error = data.msg;
          $scope.form.formError = true;
        } else {
          flash.setMessage(data.msg);
          $location.path('/');
        }
      })
      .error(function(data, status, headers, config) {
        console.log('[AddNewPostController] err data:',data);
        console.log('[AddNewPostController] err status:',status);
      });
  }

  $scope.doCancel = function() {
    utils.backToHome();
  };
}).
controller('EditPostController', function($scope, $routeParams, $http, $location, flash, utils) {
  var id = $routeParams.id;
  console.log('id:', id);
  $scope.form = {};

  $http.get('/posts/'+id).
    success(function(data, status, headers, config) {
      console.log('[EditPostController] post data:', data);
      $scope.form = data.post;
    })
    .error(function(data, status, headers, config) {
      $scope.isAuthorized = false;
      // console.log('error:', data);
    });

  $scope.editPost = function() {
    console.log('edit post:', $scope.form);
    $http.put('/posts/'+id, $scope.form).
      success(function(data, status, headers, config) {
        console.log('[EditPostController] data:', data);
        $scope.form = data.post;
        flash.setMessage(data.msg);
        $location.url('/');
      })
      .error(function(data, status, headers, config) {
        console.log('[EditPostController] error:', data);
      });
  }

  $scope.doCancel = function() {
    utils.backToHome();
  };
}).
controller('DeletePostController', function($scope, $routeParams, $http, $location, flash, utils) {
  console.log('DeletePostController');
  var id = $routeParams.id;
  $http.get('/posts/'+id).
    success(function(data, status, headers, config){
      $scope.post = data.post;
      console.log($scope.post);
    })
    .error(function(data, status, headers, config) {
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

  $scope.doCancel = function() {
    utils.backToHome();
  };
}).
controller('AuthController.login', ['$scope', '$rootScope', '$http', '$location', '$cookies', 'flash',
  function($scope, $rootScope, $http, $location, $cookies, flash) {
    $scope.data = {
      username: '',
      password: ''
    };

    $scope.doLogin = function() {
      console.log('AuthController.login', $scope.data);
      // var endpoint = 'http://localhost:4010';
      var endpoint = 'http://angularblogexpressrev1-sudogem.rhcloud.com';
      $http.post(endpoint + '/api/v1/ui/auth', {
        username: $scope.data.username,
        password: $scope.data.password
      })
      .success(function(data, status, headers, config) {
        $scope.loading = false;
        if (data.token) {
          $location.path('/');
          $rootScope.globalUser = data;
          console.log('success:', data);
          $cookies.putObject('user', data);
        } else {
          $scope.errors = data.msg;
          // flash.setMessage(data.msg);
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

  }]).
controller('AuthController.logout', ['$rootScope', '$scope', '$http', '$location', '$cookies', 'flash',
  function($rootScope, $scope, $http, $location, $cookies, flash){
    console.log('AuthController.logout');
    // var endpoint = 'http://localhost:4010';
    var endpoint = 'http://angularblogexpressrev1-sudogem.rhcloud.com';
    $http.get(endpoint + '/api/v1/auth/logout')
    .success(function(data, status, headers, config) {
      flash.setMessage({msg: 'Successfully logout.'});
    })
    .error(function(data, status, headers, config) {
      if (data && data.errors) {
        $scope.errors = data.errors;
      } else {
        $scope.errors = ['Unknown error occurred'];
      }
    });
    $rootScope.globalUser = null;
    $cookies.remove('user');
    $location.path('/');
}]);
