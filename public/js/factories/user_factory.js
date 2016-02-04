shiftSampleApp
	.factory('UserService', function($http,$sessionStorage){
		var userService = {};

		userService.getUserData = function(){
		    return $http.get('/users/'+1)
			};

		userService.getUserTweets = function(){
		    return $http.get('/users/'+1+'/tweets')
			};

		userService.postTweet = function(tweet){
			var params = {text: tweet}
			$http.post('/users/'+1+'/tweets',params)
		}

		userService.getRandomImage = function(){
			return $http.get('https://randomuser.me/api/')
			};


		return userService;
	})