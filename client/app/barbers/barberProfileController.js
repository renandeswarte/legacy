angular.module('foodly.barberProfile', [])

.controller('barberProfileController', function($scope, $location, Order, Auth, Counter, idTool, $http, $window) {

  $scope.data = []; //meals available for purchase
  $scope.barber = {}; //meal to add
  $scope.order = {orders: []};
  $scope.count = Counter;
  $scope.styleSelected = undefined;
  $scope.orderRequire = false;
  $scope.maximizePicture = {};

  var order = $window.localStorage.getItem('order') || JSON.stringify({orders: []})
  $window.localStorage.setItem('order', order);
  $scope.count =  Counter;

  // Get user Id from the factory
  // var barberId = '563d6f8c7761a384e4dd9602';
  var barberId = idTool.getBarberId();

  var barberInfo = function() {
    $http({
      method: 'GET',
      url: '/barbers/barberid?barberid=' + barberId
      })
      .then(function(data) {
        // console.log('DATA from mongo barber profile', data);
        $scope.barberInfos = data.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  };
  // Call function to get Barber Infos
  barberInfo();

  // Pickup the style selected
  $scope.styleSelection = function(style) {
    $scope.styleSelected = style;
    $scope.orderRequire = false;
    $('.style-select').removeClass('selected');
    $('.style-select.' + style).addClass('selected');
  }

    //ng-click will activate this. order will
  //be retrieved from ng-model
  $scope.orderBarber = function(barber) {
    if ($scope.styleSelected === undefined) {
      $scope.orderRequire = true;
      return;
    }
    // barber.username = Auth.getUsername();
    barber.barberId = barberId;
    barber.barberName = $scope.barberInfos.name;
    barber.picture = $scope.barberInfos.portrait;
    barber.styleName = $scope.styleSelected;
    barber.stylePicture = "https://s3-us-west-1.amazonaws.com/haircut-on-demand/styles/" + $scope.styleSelected + ".jpg";
    barber.stylePrice = 30;

    var order = JSON.parse($window.localStorage.getItem("order"));
    console.log(barber);
    order.orders[0] = barber;
    $window.localStorage.setItem('order',JSON.stringify(order));
    Counter.number = 1;
  };

  $scope.checkOut = function(){
    if(Counter.number === 0){
      alert("Please order something before checking out")
    } else{
      $location.path('/order');
    }
  };

  $scope.maximize = function(picture, name) {
    $scope.maximizePicture.picture = picture;
    $scope.maximizePicture.name = name;
  }

})