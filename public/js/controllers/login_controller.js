shiftSampleApp
	.controller('loginCtrl', function(AuthService, $scope, $sessionStorage, $location, $http,$timeout){
		$scope.login = function(credentials){
			 AuthService.login(credentials)
			 	.then(function(response){
			 		console.log(response)
			 		$sessionStorage.userId = response;
					$timeout($location.path('/profile'),3000);
			 	})
			}
	})