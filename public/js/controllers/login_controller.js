shiftSampleApp
	.controller('LoginCtrl', function(AuthService, $scope, $sessionStorage, $location, $http,$timeout){
		$scope.login = function(formValid,credentials){
			if(formValid){
				AuthService.login(credentials)
				 	.then(
				 		function(response){
					 		$sessionStorage.userId = response;
							$location.path('/profile');
				 		}, function(response){
				 			$scope.errorMessage = response
				 		})
			} else {
				console.log('form invalid')
			}
		}

		$scope.createAccount = function(formValid,credentials){
			if(formValid){
				console.log(credentials)
				AuthService.createAccount(credentials)
				 	.then(
				 		function(response){
					 		$sessionStorage.userId = response;
							$location.path('/profile');
				 		}, function(response){
				 			$scope.errorMessage = response
				 		})
			} else {
				console.log('form invalid')
			}
		}

		$scope.loginView = true;
	})