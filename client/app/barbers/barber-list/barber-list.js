angular.module('foodly.barbers', [])

.controller('barberListController', function($scope, $location, $window, Barbers, Order, Auth, Counter, idTool) {


	$scope.data = []; //meals available for purchase
	$scope.meal = {}; //meal to add
	$scope.order = {orders: []};
	$scope.count = Counter;

	//this code block is used to generate random reviews for our product demo -
	//unfortunately, more intuitive implementations will cause a digest overflow.
	$scope.randReviews = [];
	$scope.randStars = [];
	(function() {
		for(var i = 0; i < 25; i++) {
			$scope.randReviews[i] = Math.floor(Math.random() * 15) + 1;
			var max = 5, min = 4;
			$scope.randStars[i] = Math.floor(Math.random() * (max - min + 1)) + min;
		}
	})();

	var order = $window.localStorage.getItem('order') || JSON.stringify({orders: []})
	$window.localStorage.setItem('order', order);
	$scope.count =  Counter;

	$scope.fetchBarbers = function() {
		Barbers.getBarbers()
			.then(function(data) {
				console.log('DATA from fetchBarbers', data);
				$scope.data = data;
			})
			.catch(function(err) {
				console.log(err);
			});
	};
	$scope.fetchBarbers(); // fetch Barbers Data to populate barbers-list page

	$scope.setId = function(id) {
		idTool.setBarberId(id);
		console.log('getBarberId', idTool.getBarberId());
	}


	$scope.addMeal = function() {
		$scope.meal.url = angular.element( document.querySelector( '#preview' ) )[0].currentSrc
		Meals.addMeal({meals: [$scope.meal]})
			.then(function() {
				console.log($scope.meal.description, 'sent to server.');
				$location.path('/'); //added successfully
			})
			.catch(function(err) {
				console.log(err);
			});
	};

	$scope.checkOut = function(){
		if(Counter.number === 0){
			alert("Please order something before checking out")
		}else{
			$location.path('/order');
		}
	};



	//ng-click will activate this. order will
	//be retrieved from ng-model
	$scope.orderMeal = function(meal) {
		meal.meals.username = Auth.getUsername();
		var order = JSON.parse($window.localStorage.getItem("order"));
		console.log(meal);
		order.orders.push(meal.meals);
		$window.localStorage.setItem('order',JSON.stringify(order));
		Counter.number++;
	};

})

