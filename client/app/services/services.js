angular.module('instacutz.services', [])

.factory('idTool', [
  function() {
    var barberId = "";
    var hairstyleName = "";

    // Barber and Style Id setters
    var setBarberId = function(id) {
      barberId = id;
    };
    var setHairstyleName = function(name) {
      hairstyleName = name;
    }

    // Barber and Style Id getters
    var getBarberId = function() {
      return barberId;
    };
    var getHairstyleName = function() {
      return hairstyleName;
    };

    return {
      setBarberId: setBarberId,
      setHairstyleName: setHairstyleName,
      getBarberId: getBarberId,
      getHairstyleName: getHairstyleName
    };

}])

.factory('Barbers', [
  '$http',
  function($http) {

    var getBarbers = function() {
      return $http({
          method: 'GET',
          url: '/barbers/get/barbers'
        })
        .then(function(resp) {
          return resp.data;
        });
    };

    return {
      getBarbers: getBarbers
    }

}])

.factory('Styles', [
  '$http',
  function($http) {

    var getStyles = function() {
      return $http({
          method: 'GET',
          url: '/hairstyles/get/styles'
        })
        .then(function(resp) {
          return resp.data;
        });
    };

    return {
      getStyles: getStyles
    }

}])

.factory('Ratings', [
  '$http',
  function($http) {

    var updateRating = function(ratingPair) {
      return $http({
        method: 'POST',
        url: '/api/users/customer/post/ratings',
        data: ratingPair
      });
    };

    return {
      updateRating: updateRating
    };

}])

.factory('Email', [
  '$http',
  '$window',
  function($http, $window) {

    var successEmail = function(email, subject, style, barber, price) {
      console.log(email, subject, style, barber, price);
      return $http({
        method: 'POST',
        url: '/send',
        data: {
          to: email,
          subject: subject,
          text: 'This is your InstaCutz confirmation. \n You have an appointment with ' + barber + ' for a ' + style + ' haircut. \n Your total is $' + price + '.\n \n Thank you for using InstaCutz!'
        }
      });
    };

    return {
      successEmail: successEmail
    };

}])

.factory('Auth', [
  '$http',
  '$location',
  '$window',
  function($http, $location, $window) {

    var loginorout = "Sign in";
    var signup = function(user) {
      return $http({
          method: 'POST',
          url: '/api/users/customer/post/signup',
          data: user
        })
        .then(function(resp) {
          return resp.data.token;
        });
    };

    var signin = function(user) {
      return $http({
          method: 'POST',
          url: '/api/users/customer/post/signin',
          data: user
        })
        .then(function(resp) {
          return resp.data;
        });
    };

    var signout = function() {
      $window.localStorage.removeItem('com.semicolon');
      $window.localStorage.removeItem('com.semicolon.name');
      $window.localStorage.removeItem('com.semicolon.date')
      $location.path('/signin');
    };

    var isAuth = function() {
      if (!window.localStorage.getItem('com.semicolon')) {
        return false;
      }
      loginorout = "Logout"
      if (new Date() - Date.parse($window.localStorage.getItem('com.semicolon.date')) > 1800000) {
        $window.localStorage.removeItem('com.semicolon');
        $window.localStorage.removeItem('com.semicolon.name');
        $window.localStorage.removeItem('com.semicolon.date');
        return false;
      } else {
        $window.localStorage.setItem('com.semicolon.date', new Date());
        return true;
      }
    };

    var getUsername = function() {
      var username = $window.localStorage.getItem('com.semicolon.name') || "guest";
      return username;
    };


    return {
      signup: signup,
      signin: signin,
      signout: signout,
      isAuth: isAuth,
      getUsername: getUsername,
      loginorout: loginorout
    };

}])

.factory('Meals', [
  '$http',
  function($http) {

    var getMeals = function() {
      return $http({
          method: 'GET',
          url: '/api/users/customer/get/meals'
        })
        .then(function(resp) {
          return resp.data;
        });
    };

    var addMeal = function(meal) {
      return $http({
        method: 'POST',
        url: '/api/users/customer/post/meals',
        data: meal
      });
    };

    return {
      getMeals: getMeals,
      addMeal: addMeal
    };

}])

.factory('Order', [
  '$http',
  function($http) {
    //This data is for experimental purposes only. Needs to be put in via meals html to work
    var mealToOrder = {
      orders: []
    };

    var cartOrder = function(meal) {
      mealToOrder = meal;
    };


    var emailObject = function(mealToOrder) {
      return {
        to: "order.orders[0].email", // vendor email address
        subject: "New order: order.orders[0].description",
        text: "You have received a new order for  order.orders[0].description +  for a price of + order.orders[0].price + to be delivered to + user.address"
      }
    };

    var stripeTokenSubmit = function(token) {
      var data = {
        stripeToken: token
      };
      return new Promise(function(resolve, reject) {
        resolve($http({
          method: 'POST',
          url: '/payment/charge',
          data: data
        }));
      });
    };

    var submitOrder = function(mealToOrder) {
      console.log("Meal to order: ", mealToOrder)
      return $http({
        method: 'POST',
        url: '/api/users/customer/post/orders',
        data: mealToOrder
      });

    };

    var getMealOrder = function() {
      return mealToOrder;
    };

    return {
      cartOrder: cartOrder,
      submitOrder: submitOrder,
      getMealOrder: getMealOrder,
      stripeTokenSubmit: stripeTokenSubmit
    };

}])

.factory('Counter', [
  function() {
    var count = {
      'number': 0
    };

    return count;
}])

.factory('Counter', [
  '$window',
  function($window) {
    var number = $window.localStorage.getItem('order') || 0;
    if (typeof number !== "number") {
      number = JSON.parse(number).orders.length;
    }

    return {
      number: number
    }
}])
