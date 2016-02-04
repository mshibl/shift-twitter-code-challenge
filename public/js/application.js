var shiftSampleApp = angular.module('shiftSampleApp', ['ngRoute','ngStorage']);

shiftSampleApp.config(function($routeProvider, $locationProvider){
    $routeProvider
      .when('/',{
        templateUrl: '/js/templates/login.html',
        controller: 'loginCtrl'
      })
      .when('/users', {
        templateUrl: '/js/templates/users.html',
        controller: 'UsersCtrl'
      })
      .when('/users/:id',{
        templateUrl: '/js/templates/profile.html'
      })
      //add new angular routes below

      .otherwise({
        redirectTo: '/users'
      });

      // use the HTML5 History API
      $locationProvider.html5Mode(true);
  });

