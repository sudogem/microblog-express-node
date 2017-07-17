angular.module('app')
  .factory('unauthorize', ['$location', '$q', function($location, $q){
   return {
     responseError: function(response) {
       var deferred = $q.defer();

       if (response.status == 403) {
         $location.path('/login');
       }

       deferred.reject(response);
       return deferred.promise;
     }
   };
  }]);
