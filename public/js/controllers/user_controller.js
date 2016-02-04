shiftSampleApp
  .controller('UsersCtrl', function (UserService, $scope, $http,$sessionStorage) {

    UserService.getUserData()
        .success(function(res){
            $scope.firstName = res.first_name
            $scope.lastName = res.last_name
            $scope.email = res.email
            $scope.followersCount = res.followers_count
            $scope.friendsCount = res.friends_count
        })

    // UserService.getTweets()
    //     .success(function(res){
    //         $scope.tweets = res.tweets
    //     })

    // console.log($scope.userData);

    

    // UserService.getUserData();
    // $http.get('/users/'+7)
    //     .success(function(){
    //         console.log('done')
    //     })
    // $scope.getUserInfo = function(){
    //   console.log('this is working')
    //   // $http.get('/users/'+$sessionStorage.userId)
    //   //   .success(function(response){
    //   //     console.log(response)
    //   //   })
    // }
    // $scope.getUsers = function() {
    //   $http.get('/users').success(function(data) {
    //     $scope.users = data;
    //   });
    // };

    // $scope.createUser = function(user) {
    //   var params = {
    //     first_name: user.firstName,
    //     last_name: user.lastName,
    //     email: user.email,
    //     password: user.password
    //   };

    //   $http.post('/users', params).success(function(response) {
    //   });
    // };
  });
