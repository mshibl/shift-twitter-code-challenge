shiftSampleApp
  .controller('UsersCtrl', function (UserService, $routeParams, $scope, $http,$localStorage,$sessionStorage,$q,$location) {
    var id = $routeParams.id
    $scope.tweetPermission = (id == $localStorage.id)
    $scope.userFirstName = $sessionStorage.firstName
    $scope.userLastName = $sessionStorage.lastName
    $scope.userFollowersCount = $sessionStorage.followers
    $scope.userFriendsCount = $sessionStorage.friends
    UserService.getRandomImage()
        .then(function(res){
            $scope.userImage = res
        })

    UserService.getUserData(id)
        .then(function(userData){
                $scope.firstName = userData.first_name
                $scope.lastName = userData.last_name
                $scope.email = userData.email
                $scope.followersCount = userData.followers_count
                $scope.friendsCount = userData.friends_count
            })

    UserService.getUserTweets(id)
        .then(function(response){
            $scope.tweets = response.data
        })

    if(!$scope.tweetPermission){
        UserService.getRandomImage()
        .then(function(response){
            $scope.targetUserImage = response
        })
    }

    UserService.usersSearch()
        .then(function(response){
            $scope.suggestedUsers = response
        })

    $scope.postTweet = function(tweet){
        UserService.postTweet(tweet)
            .then(function(res){
                $scope.tweets.push(res)
            })
    }

    $scope.followFriend = function(friend){
        UserService.followFriend(friend.id)
            .then(function(response){
                if(response == true){
                    $scope.friendsCount += 1
                    $scope.suggestedUsers
                    var index = $scope.suggestedUsers.indexOf(friend);
                    $scope.suggestedUsers.splice(index, 1);
                }
            })
    }

    $scope.logout = function(){
        UserService.logout()
            .then(function(response){
                $location.path('/');
            })
    }

    $scope.goHome = function(){
        $location.path('/users/'+$localStorage.id);
    }

  });
