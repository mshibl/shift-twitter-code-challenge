shiftSampleApp
	.factory('AuthService', function(UserService,$http,$sessionStorage,$localStorage,$q){
		var authService = {};

		authService.login = function(credentials){
			var deferred = $q.defer();
			$http.post('/login', credentials)
		      .then(
		      	function (response) {
		      		$localStorage.currentUser = response.data;
		      		// console.log(response.data.followers)
		      		// console.log(response.data.friends)
		      		// $localStorage.token = response.data.token;
		      		// $localStorage.id = response.data.user_id;
		      		// $sessionStorage.firstName = response.data.first_name
		      		// $sessionStorage.lastName = response.data.last_name
		      		// $sessionStorage.profileImage = response.data.image
		      		// $sessionStorage.followers = response.data.followers_count;
		      		// $sessionStorage.friends = response.data.friends_count;
		      		// deferred.resolve(response.data)
		      		// console.log(response.data)
		      		deferred.resolve(response.data.id)
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