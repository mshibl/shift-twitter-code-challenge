shiftSampleApp
	.controller('loginCtrl', function(AuthService, $scope, $sessionStorage, $location){
		$scope.login = function(credentials){
			AuthService.login(credentials)
			$location.path('/users/'+$sessionStorage.userID)
		}
	})