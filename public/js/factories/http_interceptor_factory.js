shiftSampleApp
	.factory('HttpInterceptor', function($q,$localStorage){
		return {
			request: function(config){
				// console.log('http request intercepted')
				// console.log(config)
				return config
			},

			response: function(result){
				// console.log('http response intercepted')
				// console.log(result)
				return result
			},

			responseError: function(rejection){
				// console.log('http response error intercepted')
				// console.log(rejection)
				return $q.reject(rejection);
			}
		}
	})