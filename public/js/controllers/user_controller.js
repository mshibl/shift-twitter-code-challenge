shiftSampleApp
  .controller('UsersCtrl', function (UserService, AuthService, $routeParams, $scope, $http,$localStorage,$sessionStorage,$q,$location) {
    
    var id = $routeParams.id
    if($localStorage.currentUser){
        $scope.currentUser = $localStorage.currentUser;
        $scope.tweetPermission = (id == $scope.currentUser.id)
    }

    UserService.getUserData(id)
        .then(function(userData){
                console.log('user data loaded')
                console.log(userData)
                $scope.showUser = userData
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
                $scope.showUser.friends.push(response)
                //     $scope.suggestedUsers
                    var index = $scope.suggestedUsers.indexOf(friend);
                    $scope.suggestedUsers.splice(index, 1);
                // }
            })
    }

    $scope.logout = function(){
        AuthService.logout()
            .then(function(response){
                $location.path('/');
            })
    }

    $scope.goHome = function(){
        $location.path('/users/'+$localStorage.currentUser.id);
    }

  });
