angular.module('foodly.barberProfile', [])

.controller('barberProfileController', function($scope, idTool, $http) {

  // Get user Id from the factory
  // var userId = idTool.getBarberId;
  var userId = '563d43e97fe0d837e59616e3';


  $scope.userInfo = function() {
    $http({
      method: 'GET',
      url: '/barbers/barberid?barberid=' + userId
      })
      .then(function(data) {
        console.log('DATA from mongo', data);
        $scope.data = data;
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  $scope.userInfo();


})