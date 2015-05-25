
/* NOT RECOMMENDED
function IndexController($scope, $http) {

}

function AddNewPostController($scope, $http, $location) {
  console.log('AddNewPostController');
  $scope.form = {};
  $scope.submitPost = function() {
    $http.post('/api/post', $scope.form)
         .success(function(data) {
            $location.path('/');
         });

  }
}*/

angular.module('blog.controllers', []).
controller('IndexController', function($scope, $http) {
  console.log('IndexController');
  $http.get('/api/posts').
    success(function(data, status, headers, config) {
      console.log(data)
      $scope.total = data.posts.length;
      $scope.posts = data.posts;
    });

}).
controller('AddNewPostController', function($scope) {
  console.log('AddNewPostController');

});

 