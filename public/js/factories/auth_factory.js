shiftSampleApp
	.factory('AuthService', function($http,$sessionStorage,$localStorage,$q){
		var authService = {};

		authService.login = function(credentials){
			var deferred = $q.defer();
			$http.post('/login', credentials)
		      .then(
		      	function (response) {
		      		console.log(response)
		      		$localStorage.token = response.data.token;
		      		$localStorage.id = response.data.user_id;
		      		deferred.resolve(response.data.user_id)
		   		},function (response){
		   			console.log("factory failed response:" + response)
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