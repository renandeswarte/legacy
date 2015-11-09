angular.module('instacutz.order', [
  'angularPayments',
  'instacutz.auth'
])

// .config(['$window', function($window) {
//   $window.Stripe.setPublishableKey('pk_test_kL2LKwSIme8Q6KzTiLQ2ZPHz');
// }])

.controller('OrderController', [
  '$scope',
  '$window',
  '$location',
  'Order',
  'Counter',
  'Auth',
  'Email',
  function($scope, $window, $location, Order, Counter, Auth, Email) {
    // Parse order inside local storage first
    $scope.orderRequest = JSON.parse($window.localStorage.getItem("order"));

      $scope.requestStyle = $scope.orderRequest.orders[0].styleName;
      $scope.requestStylePic = $scope.orderRequest.orders[0].stylePicture
      $scope.requestPrice = $scope.orderRequest.orders[0].stylePrice;
      $scope.requestBarber = $scope.orderRequest.orders[0].barberName;
      $scope.requestBarberPic = $scope.orderRequest.orders[0].picture;


    $scope.stripeCallback = function(code, result) {
      if (result.error) {
        window.alert('Payment failed. Error: ' + result.error.message);
      } else {
        console.log('Token success! Token: ' + result.id);
        Order.stripeTokenSubmit(result.id)
          .then(function(response) {
            console.log('Payment completed successfully.', response);

            var email = $("#email").val();
            var subject = 'Your InstaCutz Confirmation';
            Email.successEmail(email, subject, $scope.requestStyle, $scope.requestBarber, $scope.requestPrice)
            .then(function(res) {
              console.log('data: ', res);
              if (res.data == 'success') {
                console.log('Order confirmation email has been sent.');
              } else if (res.data == 'error') {
                console.log('Email status: server error.');
              } else {
                console.log('Email status: unknown error.');
              }
            });

            $('#myModal').modal('toggle');
            // $location.path('/'); // TODO: redirect to payment success page/modal
          }, function(error) {
            console.log('Failed, error: ', error);
          });
      }
    };

    $scope.captureSignUpDetails = function() {
      console.log($scope.user);
    };

    $scope.submitOrder = function() {
      console.log('submitOrder has been called');
      var orders = $scope.orders;
      orders.username = Auth.getUsername();
      Order.submitOrder(orders)
        .then(function() {
          $window.localStorage.setItem('order', JSON.stringify({
            orders: []
          }))
          Counter.number = 0;
          $('#myModal').modal('toggle')
          $location.path("/");
        });
    };

    $scope.orders = JSON.parse($window.localStorage.getItem('order'));

    $scope.checkOrder = function() { // redirect if not logged in
      if ($scope.orders.orders.length === 0) {
        $location.path("/");
      }
    };

    $scope.getTotal = function() {
      //TODO : Add Tip Functionality on this
      var total = 0;
      for (var i = 0; i < $scope.orders.orders.length; i++) {
        if ($scope.orders.orders[i].price) {
          total += $scope.orders.orders[i].price
        }
      }
      return total;
    }

    $scope.getCartContents = function() {
      var cartContents = "";
      for (var i = 0; i < $scope.orders.orders.length; i++) {
        if ($scope.orders.orders[i].title) {
          cartContents += ("\n" + $scope.orders.orders[i].title + ": $" + $scope.orders.orders[i].price);
        }
      }
      return cartContents;
    }

    $scope.RemoveItem = function(array, index) {
        var order = JSON.parse($window.localStorage.getItem("order"));
        console.log(order);
        array.splice(index, 1);
        order.orders.splice(index, 1);
        $window.localStorage.setItem("order", JSON.stringify(order));
        if (order.orders.length === 0) {
          $location.path('/barbers')
        }
        Counter.number--
      }
      // $scope.checkOrder(); // redirect if not logged in
  }
]);
