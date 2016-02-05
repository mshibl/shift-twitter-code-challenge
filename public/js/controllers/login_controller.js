shiftSampleApp
	.controller('LoginCtrl', function(AuthService, $scope, $localStorage, $location, $http,$timeout){
		$scope.login = function(formValid,credentials){
			if(formValid){
				AuthService.login(credentials)
				 	.then(
				 		function(response){
							$location.path('/users/'+response);
				 		}, function(response){
				 			$scope.errorMessage = response
				 		})
			} else {
				console.log('form invalid')
			}
		}

		$scope.createAccount = function(formValid,credentials){
			if(formValid){
				AuthService.createAccount(credentials)
				 	.then(
				 		function(response){
					 		$localStorage.id = response;
							$location.path('/users/'+$localStorage.id);
				 		}, function(response){
				 			$scope.errorMessage = response
				 		})
			} else {
				console.log('form invalid')
			}
		}

		$scope.loginView = true;
	})