angular.module('instacutz.auth', [])

.controller('AuthController', [
  '$scope',
  '$window',
  '$location',
  'Auth',
  function($scope, $window, $location, Auth) {

  $scope.user = {}; //this is attached to ng-model in the view
  $scope.failedAttempt = false;
  $scope.failedLogin = false;
  $scope.signedIn = false;
  $scope.Loginorout = Auth;

  $scope.consoleTheUser = function() {
    console.log('this is the current user: ', $scope.user);
  };

  $scope.signup = function() {
    console.log('currently signing up: ', $scope.user);
    Auth.signup($scope.user)
      .then(function(token) {
        $window.localStorage.setItem('com.semicolon', token);
        $window.localStorage.setItem('com.semicolon.name', $scope.user.username);
        $window.localStorage.setItem('com.semicolon.date', new Date());
        $location.path('/order');
      })
      .catch(function(err) {
        $scope.failedAttempt = true;
        console.log(err);
      });
  };

  $scope.signin = function() {
    console.log('signin is called');
    Auth.signin($scope.user)
      .then(function(respData) {
        $scope.user = respData.user;
        $scope.signedIn = true;
        console.log('user: ', $scope.user);
        $window.localStorage.setItem('com.semicolon', respData.token);
        $window.localStorage.setItem('com.semicolon.name', $scope.user.username);
        $window.localStorage.setItem('com.semicolon.date', new Date());
        Auth.loginorout = "Logout"
        // $location.path('/order');
      })
      .catch(function(err) {
        $scope.failedLogin = true;
        console.log(err);

      });
  };

  $scope.signout = function() {
    if (Auth.loginorout === "Logout") {
      Auth.signout();
    } else {
      $location.path("/signin");
    }
  };

  $scope.getUsername = function() {
    return Auth.getUsername();
  };

}])

// get meals db.users.find()
// users.insert({username:'bob',password:'hashword',salt:'NaCl',meals:[{title:'phad thai',price:'12'},{title:'chicken rice',price:'10’},{title:'chicken rice',price:'10’},{title:'chicken rice',price:'10'}],orders:{}})
// coll.insert({username:’bob',password:'hashword',salt:'NaCl',meals:[{title:'phad thai',price:'12'},{title:'chicken rice',price:'10’},{title:'chicken rice',price:'10’},{title:'chicken rice',price:'10'}],orders:{}})
