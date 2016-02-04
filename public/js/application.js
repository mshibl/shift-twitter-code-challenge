var shiftSampleApp = angular.module('shiftSampleApp', ['ngRoute','ngStorage']);

shiftSampleApp.config(function($routeProvider, $locationProvider){
    $routeProvider
      .when('/',{
        templateUrl: '/js/templates/login.html',
        controller: 'loginCtrl'
      })
      // .when('/users', {
      //   templateUrl: '/js/templates/users.html',
      //   controller: 'UsersCtrl'
      // })
      .when('/profile',{
        templateUrl: '/js/templates/profile.html',
        controller: 'UsersCtrl'
      })

      .otherwise({
        redirectTo: '/users'
      });

      // use the HTML5 History API
      $locationProvider.html5Mode(true);
  });

