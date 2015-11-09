angular.module('instacutz.auth', [])

.controller('AuthController', [
  '$scope',
  '$window',
  '$location',
  'Auth',
  'Order',
  function($scope, $window, $location, Auth, Order) {

    $scope.user = {}; //this is attached to ng-model in the view
    $scope.failedAttempt = false;
    $scope.failedLogin = false;
    $scope.signedIn = false;
    $scope.Loginorout = Auth;

    // $scope.stripeCallback = function(code, result) {
    //   if (result.error) {
    //     window.alert('Payment failed. Error: ' + result.error.message);
    //   } else {
    //     console.log('Token success! Token: ' + result.id);
    //     Order.stripeTokenSubmit(result.id)
    //       .then(function(response) {
    //         console.log('Payment completed successfully.', response);
    //         $location.path('/'); // TODO: redirect to payment success page/modal
    //       }, function(error) {
    //         console.log('Failed, error: ', error);
    //       });
    //   }
    // };

    $scope.consoleTheUser = function() {
      console.log('this is the current user: ', $scope.user);
    };

    $scope.returnSignin = function() {
      $scope.$apply();
      return $scope.signedIn;
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
          console.log('signedIn: ', $scope.signedIn);
          $window.localStorage.setItem('com.semicolon', respData.token);
          $window.localStorage.setItem('com.semicolon.name', $scope.user.username);
          $window.localStorage.setItem('com.semicolon.date', new Date());
          Auth.loginorout = "Logout";
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

  }
])

// get meals db.users.find()
// users.insert({username:'bob',password:'hashword',salt:'NaCl',meals:[{title:'phad thai',price:'12'},{title:'chicken rice',price:'10’},{title:'chicken rice',price:'10’},{title:'chicken rice',price:'10'}],orders:{}})
// coll.insert({username:’bob',password:'hashword',salt:'NaCl',meals:[{title:'phad thai',price:'12'},{title:'chicken rice',price:'10’},{title:'chicken rice',price:'10’},{title:'chicken rice',price:'10'}],orders:{}})
