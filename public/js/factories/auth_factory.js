shiftSampleApp
	.factory('AuthService', function($http,$sessionStorage,$q){
		var authService = {};

		authService.login = function(credentials){
			var deferred = $q.defer();
			$http.post('/login', credentials)
		      .then(
		      function (response) {
		      		deferred.resolve(response.id)
		   		},function (response){
		    		deferred.reject(response.data)
		    	})
		      return deferred.promise
		}

		authService.createAccount = function(credentials){
			var deferred = $q.defer();
			$http.post('/users',credentials)
				.then(
			      function (response) {
			      		deferred.resolve(response.id)
			   		},function (response){
			   			console.log(response)
			    		deferred.reject(response.data)
			    	})
			      return deferred.promise
		}

		return authService;
	})