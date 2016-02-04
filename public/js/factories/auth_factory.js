shiftSampleApp
	.factory('AuthService', function($http,$sessionStorage){
		var authService = {};

		authService.login = function(credentials){
			return $http
		      .post('/login', credentials)
		      .then(function (response) {
		      	$sessionStorage.userID = response.data.id
		    });
		}

		return authService;
	})