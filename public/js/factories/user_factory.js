shiftSampleApp
	.factory('UserService', function($http,$sessionStorage,$q){
		var userService = {};

		userService.getUserData = function(){
		    return $http.get('/users/'+$sessionStorage.userId)
			};

		userService.getUserTweets = function(){
		    return $http.get('/users/'+$sessionStorage.userId+'/tweets')
			};

		userService.postTweet = function(tweet){
			var params = {text: tweet}
			$http.post('/users/'+$sessionStorage.userId+'/tweets',params)
		}

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