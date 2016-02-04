shiftSampleApp
	.factory('UserService', function($http,$sessionStorage){
		var userService = {};

		userService.getUserData = function(){
		    return $http
		    	.get('/users/'+1)
    		    .success(function(userData){
    		    	return userData
        		})
			};

		userService.getUserTweets = function(){
		    return $http
		    	.get('/users/'+1+'/tweets')
    		    .success(function(tweets){
    		    	return tweets
        		})
			};

		userService.postTweet = function(tweet){
			var params = {text: tweet}
			$http
				.post('/users/'+1+'/tweets',params)
		}


		return userService;
	})