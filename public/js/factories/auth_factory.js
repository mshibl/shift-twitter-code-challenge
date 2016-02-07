shiftSampleApp
	.factory('AuthService', function(UserService,$http,$sessionStorage,$localStorage,$q){
		var authService = {};

		// authService.isLoggedIn = function(){
		// 	credentials =  $localStorage.currentUser ? {id: $localStorage.currentUser.id, token: $localStorage.currentUser.token} : {id: "", token: ""}
		// 	// credentials = {id: $localStorage.currentUser.id, token: $localStorage.currentUser.token}
		// 	console.log(credentials)
		// 	// credentials = {id: 1}
		// 	// console.log(credentials)
		// 	var deferred = $q.defer();
		// 	$http.post('/session_status',credentials)
		// 		.then(
		// 			function(){
		// 		// 		// console.log('yes')
		// 		// 		 true
		// 				deferred.resolve()

		// 			}, function(){
		// 		// 		// console.log('no')
		// 		// 		 false
		// 				deferred.reject()
		// 			})
		// 		// console.log(deferred.promise)
		// 		return deferred.promise
		// }

		authService.login = function(credentials){
			var deferred = $q.defer();
			$http.post('/login', credentials)
		      .then(
		      	function (response) {
		      		$localStorage.currentUser = response.data;
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
			      		$localStorage.currentUser = response.data;
			      		deferred.resolve(response.data.id)
			   		},function (response){
			   			console.log('create account failed in auth factory')
			    		deferred.reject(response.data)
			    	})
			      return deferred.promise
		}

		authService.logout = function(){
			var deferred = $q.defer()
			$http.delete('/users/'+$localStorage.currentUser.id+'/logout')
				.then(function(res){
					$localStorage.$reset()
					$sessionStorage.$reset()
					deferred.resolve(res)
				})
			return deferred.promise;
		};

		return authService;
	})