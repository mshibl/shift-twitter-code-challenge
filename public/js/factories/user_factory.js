shiftSampleApp
	.factory('UserService', function($http,$sessionStorage,$localStorage,$q,$location){
		var userService = {};


		userService.getUserData = function(){
			var deferred = $q.defer();
			$http.get('/users/'+$localStorage.id, {params: {'token': $localStorage.token}})
				.then(
					function(response){
						deferred.resolve(response.data)
					}, function(response){
						$location.path('/');
					})
				return deferred.promise
			};

		userService.getUserTweets = function(){
			var deferred = $q.defer();
		    $http.get('/users/'+$localStorage.id+'/tweets')
		    	.then(
					function(response){
						deferred.resolve(response)
					}, function(response){
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
			$http.get('/users/7/search/5')
				.success(function(res){
					deferred.resolve(res)
				})
			return deferred.promise;
		};

		userService.followFriend = function(friendId){
			var deferred = $q.defer();
			var params = {friendId: friendId}
			$http.post('/users/'+$sessionStorage.userId+'/follow',params)
				.success(function(){
					deferred.resolve(true)
				})
			return deferred.promise;
		};		

		return userService;
	})