angular.module('utils.services', [])
  .factory('utils', ['$rootScope', '$location', '$http', function($rootScope, $location, $http) {
    return {
      backToHome: function(){
        $location.url('/');
      },
      isAuthenticated: function(){
        // Check if user is authorized to access the page.
        $http.get('/api/user/isauthenticated')
          .success(function(data, status, headers, config) {
            if(!data.isAuthorized){
              $rootScope.globalUser = false;
              $location.path('/login');
            }
          })
          .error(function(data, status, headers, config) {
            $scope.isAuthorized = false;
            $rootScope.globalUser = false;
            console.log('[AddNewPostController] error:', data);
          });
      }
    }
  }]);
