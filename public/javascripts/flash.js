angular.module('flash.services', []).
  factory('flash', function($rootScope) {
    var queue = [];
    var currentMessage = "";

    $rootScope.$on("$routeChangeSuccess", function() {
      currentMessage = queue.shift() || "";
    });

    return {
      setMessage: function(message) {
        console.log('setMessage:', message);
        queue.push(message);
      },
      getMessage: function() {
        console.log('getMessage:', currentMessage);
        return currentMessage;
      }
    };
  });

