angular.module('foodly.barberProfile', [])

.controller('barberProfileController', function($scope, idTool, $http) {

  // Get user Id from the factory
  // var barberId = '563d6f8c7761a384e4dd9602';
  var barberId = idTool.getBarberId();
  console.log("barberId Profile: ", barberId);


  var barberInfo = function() {
    $http({
      method: 'GET',
      url: '/barbers/barberid?barberid=' + barberId
      })
      .then(function(data) {
        console.log('DATA from mongo barber profile', data);
        $scope.barberInfos = data.data;
      })
      .catch(function(err) {
        console.log(err);
      });
  };
  // Call function to get Barber Infos
  barberInfo();


})