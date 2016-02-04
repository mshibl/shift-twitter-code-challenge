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
        })

    UserService.getRandomImage()
        .then(function(response){
            $scope.randomImage = response
        })

    UserService.usersSearch()
        .then(function(response){
            $scope.suggestedUsers = response
        })

    $scope.postTweet = function(tweet){
        UserService.postTweet(tweet)
    }

    $scope.followFriend = function(friendId){
        UserService.followFriend(friendId)
            .then(function(response){
                if(response == true){
                    $scope.friendsCount += 1
                }
            })
    }
  });
