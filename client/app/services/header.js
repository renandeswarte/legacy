angular.module('instacutz.header', [])

.controller('headerController', [
  '$scope',
  '$window',
  '$location',
  'Order',
  'Counter',
  function($scope, $window, $location, Order, Counter) {

    $scope.init = $window.localStorage.getItem('order') || JSON.stringify({orders: []})

    $window.localStorage.setItem('order', $scope.init);

    $scope.headerCart = {
      'display': false
    }
    $scope.headerCart.cart;

}]);
