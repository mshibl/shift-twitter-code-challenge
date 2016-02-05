shiftSampleApp
	.factory('AuthService', function(UserService,$http,$sessionStorage,$localStorage,$q){
		var authService = {};

		authService.login = function(credentials){
			var deferred = $q.defer();
			$http.post('/login', credentials)
		      .then(
		      	function (response) {
		      		$localStorage.firstName = response.data.first_name
		      		$localStorage.lastName = response.data.last_name
		      		$localStorage.token = response.data.token;
		      		$localStorage.id = response.data.user_id;
		      		$localStorage.followers = response.data.followers_count;
		      		$localStorage.friends = response.data.friends_count;
		      		// $localStorage.userImage = UserService.getRandomImage()
		      		// .then(function(res){$localStorage.userImage = res})
		      		deferred.resolve(response.data)
		   		},function (response){
		   			console.log('login failed in auth factory')
		    		deferred.reject(response.data)
		    	})
		      return deferred.promise
		}

		authService.createAccount = function(credentials){
			var deferred = $q.defer();
			$http.post('/users',credentials)
				.then(
			      function (response) {
			      		$localStorage.token = response.data.token;
		      			$localStorage.id = response.data.user_id;
			      		deferred.resolve(response.data.user_id)
			   		},function (response){
			   			console.log('create account failed in auth factory')
			    		deferred.reject(response.data)
			    	})
			      return deferred.promise
		}

		return authService;
	})