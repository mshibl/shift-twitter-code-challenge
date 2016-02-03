shiftSampleApp
  .controller('UsersCtrl', function ($scope, $http) {
    // Incorporate factories and services if possible
    $scope.getUsers = function() {
      $http.get('/users').success(function(data) {
        $scope.users = data;
      });
    };

    $scope.createUser = function(user) {
      var params = {
        first_name: user.firstName,
        last_name: user.lastName
      };

      $http.post('/users', params).success(function(response) {
      });
    };
  });
