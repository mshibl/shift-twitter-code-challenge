shiftSampleApp
	.controller('loginCtrl', function(AuthService, $scope, $sessionStorage, $location, $http){
		$scope.login = function(credentials){
			AuthService.login(credentials)
			// $location.path('/users/'+$sessionStorage.userID)
			$location.path('/main')
		}
	})