angular.module('utils.services', [])
  .factory('utils', ['$rootScope', '$location', function($rootScope, $location) {
    return {
      backToHome: function(){
        $location.url('/');
      }
    }
  }]);
