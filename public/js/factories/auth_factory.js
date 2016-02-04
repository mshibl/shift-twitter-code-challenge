shiftSampleApp
	.factory('AuthService', function($http,$sessionStorage,$q){
		var authService = {};

		authService.login = function(credentials){
			var deferred = $q.defer();
			$http.post('/login', credentials)
		      .success(function (response) {
		      	deferred.resolve(response.id)
		    });
		      return deferred.promise
		}
		return authService;
	})