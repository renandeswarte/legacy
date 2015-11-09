angular.module('foodly.header', [])

.controller('headerController', function($scope, $window, $location, Order, Counter) {

  $scope.init = $window.localStorage.getItem('order') || JSON.stringify({orders: []})

  $window.localStorage.setItem('order', $scope.init);

  $scope.headerCart = {
    'display': false
  }
  $scope.headerCart.cart;

});