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

		authService.createAccount = function(credentials){
			var deferred = $q.defer();
			$http.post('/users',credentials)
				.success(function(){
					deferred.resolve(credentials.id)
				});
				return deferred.promise
		}

		return authService;
	})