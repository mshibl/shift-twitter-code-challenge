var shiftSampleApp = angular.module('shiftSampleApp', ['ngRoute','routeStyles','ngStorage']);

shiftSampleApp.config(function($routeProvider, $locationProvider){
    $routeProvider
      .when('/',{
        templateUrl: '/js/templates/login.html',
        controller: 'LoginCtrl',
        css: ['/css/style.css','/css/form-elements.css','http://bit.ly/1nIhRvh']
      })
      .when('/profile',{
        templateUrl: '/js/templates/profile.html',
        controller: 'UsersCtrl',
        css: '/css/profile.css'
      })

      .otherwise({
        redirectTo: '/'
      });

      // use the HTML5 History API
      $locationProvider.html5Mode(true);
  });

