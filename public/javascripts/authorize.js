angular.module('app')
  .factory('authorize', ['$rootScope', function($rootScope){
   return {
     request: function(config){
       if ($rootScope.user) {
        console.log('authorization!! token=',$rootScope.user.token);
        config.headers['x-auth-token'] = $rootScope.user.token;
        config.headers['x-auth-email'] = 'test@mail.com';
      }
      return config;
    }
   };
  }]);
