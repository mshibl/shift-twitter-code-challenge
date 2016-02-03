var shiftSampleApp = angular.module('shiftSampleApp', ['ngRoute']);

shiftSampleApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/users', {
        templateUrl: '/js/templates/users.html',
        controller: 'UsersCtrl',
      })
      //add new angular routes below

      .otherwise({
        redirectTo: '/users'
      });
  }]);

