shiftSampleApp
  .controller('UsersCtrl', function (UserService, $scope, $http,$sessionStorage) {

    UserService.getUserData()
        .success(function(userData){
            $scope.firstName = userData.first_name
            $scope.lastName = userData.last_name
            $scope.email = userData.email
            $scope.followersCount = userData.followers_count
            $scope.friendsCount = userData.friends_count
        })

    UserService.getUserTweets()
        .success(function(response){
            $scope.tweets = response
            console.log($scope.tweets)
        })

    $scope.postTweet = function(tweet){
        UserService.postTweet(tweet)
    }
  });
