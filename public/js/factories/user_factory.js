shiftSampleApp
	.factory('UserService', function($http,$sessionStorage){
		var userService = {};

		userService.getUserData = function(){
		    return $http
		    	.get('/users/'+1)
    		    .success(function(res){
    		    	return res
        		})
			};

		userService.getUserTweets = function(){
		    return $http
		    	.get('/users/'+1)
    		    .success(function(res){
    		    	// console.log(res)
    		    	return res
        		})
			};



		return userService;
	})