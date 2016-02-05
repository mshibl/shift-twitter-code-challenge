shiftSampleApp
	.factory('UserService', function($http,$sessionStorage,$localStorage,$q,$location){
		var userService = {};

		userService.getUserData = function(id){
			var deferred = $q.defer();
			$http.get('/users/'+id, {params: {'requesterId': $localStorage.id,'token': $localStorage.token}})
				.then(
					function(response){
						deferred.resolve(response.data)
					}, function(response){
						console.log('failed while getting user data')
						$location.path('/');
					})
				return deferred.promise
			};

		userService.getUserTweets = function(id){
			var deferred = $q.defer();
		    $http.get('/users/'+id+'/tweets')
		    	.then(
					function(response){
						deferred.resolve(response)
					}, function(response){
						console.log('failed while getting tweets')
						$location.path('/');
					})
				return deferred.promise
			};

		userService.postTweet = function(tweet){
			var params = {text: tweet}
			var deferred = $q.defer();
			$http.post('/users/'+$localStorage.id+'/tweets',params)
				.then(
					function(response){
						deferred.resolve(response.data)
					})
			return deferred.promise
			};

		userService.getRandomImage = function(){
			var deferred = $q.defer();
			$http.get('https://randomuser.me/api/')
				.success(function(response){
					deferred.resolve(response.results[0].user.picture.medium)
				})
			return deferred.promise;
		};

		userService.usersSearch = function(){
			var deferred = $q.defer();
			$http.get('/users/'+$localStorage.id+'/search/5')
				.success(function(res){
					deferred.resolve(res)
				})
			return deferred.promise;
		};

		userService.followFriend = function(friendId){
			var deferred = $q.defer();
			var params = {friendId: friendId}
			$http.post('/users/'+$localStorage.id+'/follow',params)
				.success(function(){
					deferred.resolve(true)
				})
			return deferred.promise;
		};

		userService.logout = function(){
			var deferred = $q.defer()
			$http.delete('/users/'+$localStorage.id+'/logout')
				.then(function(res){
					$localStorage.$reset()
					$sessionStorage.$reset()
					deferred.resolve(res)
				})
			return deferred.promise;
		};

		return userService;
	})