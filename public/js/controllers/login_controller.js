shiftSampleApp
	.controller('LoginCtrl', function(AuthService, $scope, $sessionStorage, $location, $http,$timeout){
		$scope.login = function(credentials){
			 AuthService.login(credentials)
			 	.then(function(response){
			 		$sessionStorage.userId = response;
					$timeout($location.path('/profile'),6000);
			 	})
			}

		$scope.createAccount = function(credentials){
			console.log(credentials)
			AuthService.createAccount(credentials)
			 	.then(function(response){
			 		$sessionStorage.userId = response;
					$timeout($location.path('/profile'),8000);
			 	})
		}

		$scope.loginView = true;
	})