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
  function($scope, $window, $location, Order, Counter, Auth) {



    $scope.stripeCallback = function(code, result) {
        if (result.error) {
            window.alert('Payment failed. Error: ' + result.error.message);
        } else {
            console.log('Token success! Token: ' + result.id);
            Order.stripeTokenSubmit(result.id)
            .then(function(response) {
              console.log('Payment completed successfully.', response);
              $location.path('/');  // TODO: redirect to payment success page/modal
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

      // var $scope.token = Order.getToken();  // Braintree production
      // sandbox
      // $scope.token = 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI5YmU0NGVhMTM3MTEwYThmNmYyYTMyNWQ1NWRkMDlkYTljNDMzYjY4NDIxMGY2YWI2ZTJhOTFiMTEwOTQ4OGFkfGNyZWF0ZWRfYXQ9MjAxNS0xMS0wNlQyMzoxODo1Ny43NTQ0NTUzOTMrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIn0sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsInRocmVlRFNlY3VyZSI6eyJsb29rdXBVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi90aHJlZV9kX3NlY3VyZS9sb29rdXAifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJjb2luYmFzZUVuYWJsZWQiOmZhbHNlLCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0=';

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

    $scope.checkOrder = function() {  // redirect if not logged in
      if ($scope.orders.orders.length === 0) {
        $location.path("/");
      }
    };

    $scope.getTotal = function() {
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
        $location.path('/')
      }
      Counter.number--
    }
    // $scope.checkOrder(); // redirect if not logged in
  }
]);
