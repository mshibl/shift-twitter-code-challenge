var shiftSampleApp = angular.module('shiftSampleApp', ['ngRoute']);

shiftSampleApp.config(function($routeProvider, $locationProvider){
    $routeProvider
      .when('/users', {
        templateUrl: '/js/templates/users.html',
        controller: 'UsersCtrl',
      })
      //add new angular routes below

      .otherwise({
        redirectTo: '/users'
      });

      // use the HTML5 History API
      $locationProvider.html5Mode(true);
  });

