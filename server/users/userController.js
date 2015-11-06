var User = require('./userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');


exports.signin = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  var findUser = Q.nbind(User.findOne, User);
  findUser({username: username})
    .then(function (user) {
      if (!user) {
        next(new Error('User does not exist'));
      } else {
        return user.comparePasswords(password)
          .then(function(foundUser) {
            if (foundUser) {
              var token = jwt.encode(user, 'secret');
              res.json({token: token});
            } else {
              return next(new Error('No user'));
            }
          });
      }
    })
    .fail(function (error) {
      next(error);
    });
};

exports.signup = function(req, res, next) {
  var username  = req.body.username;
  var password  = req.body.password;
  var create;
  var newUser;

  var findOne = Q.nbind(User.findOne, User);

  // check to see if user already exists
  findOne({username: username})
    .then(function(user) {
      if (user) {
        next(new Error('User already exist!'));
      } else {
        // make a new user if not one
        create = Q.nbind(User.create, User);
        newUser = {
          username: username,
          password: password,
          meals: [],
          orders: []
        };
        return create(newUser);
      }
    })
    .then(function (user) {
      // create token to send back for auth
      var token = jwt.encode(user, 'secret');
      res.json({token: token});
    })
    .fail(function (error) {
      next(error);
    });
};

exports.checkAuth = function (req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) {
    next(new Error('No token'));
  } else {
    var user = jwt.decode(token, 'secret');
    var findUser = Q.nbind(User.findOne, User);
    findUser({username: user.username})
      .then(function (foundUser) {
        if (foundUser) {
          res.status(200).send();
        } else {
          res.status(401).send();
        }
      })
      .fail(function (error) {
        next(error);
      });
  }
};

exports.meals = function(req,res,next){
  //getting all meals using aggregation pipeline
  var aggr = Q.nbind(User.aggregate,User);

  aggr({$project:{meals:1}},{$unwind:"$meals"})
    .then(function(meals){
      res.json(meals)
    })
    .fail(function(err){
      next(err)
    });
};

exports.addMeal = function (req,res,next){
  var update;
  if (req.body.hasOwnProperty('orders')) { 
    var meal = [];
    var username = req.body.username;
    for(var i =0;i<req.body.orders.length;i++){
      title = req.body.orders[i].title,
      price = req.body.orders[0].price,
      description = req.body.orders[i].description, 
      ingredients = req.body.orders[i].ingredients
       meal.push({
        title: title,
        price: price,
        description: description,
        ingredients: ingredients
      });
    }
    field = "orders" 
   } else {
    var url = req.body.meals[0].url
    console.log('Url ' + req.body.meals[0].url);
    //then we have a meal (vendor)
    console.log("I'm a vendor meal")
    var username = req.body.username;
    var title = req.body.meals[0].title,
    price = req.body.meals[0].price,
    description = req.body.meals[0].description,
    ingredients = req.body.meals[0].ingredients,
    field = "meals"
  }
  
  var findOne = Q.nbind(User.findOne,User);
  var findUser = Q.nbind(User.findOne, User);
  
  //check if the username who submitted the request exists
  findUser({username: username})
    .then(function(user){
      if (!user){
        next(new Error('User does not exist'));
      } else {
        
        //for the verified username, finf the ._id, and push in order or meal
        update = Q.nbind(User.findByIdAndUpdate, User);

      var newMealitem = {
        title: title,
        price: price,
        description: description,
        ingredients: ingredients,
        url: url
      };
    
      //push the meal object into the respective array
      console.log('later user',field,newMealitem)
      if (field==="meals"){
              update(user._id,
          {$push: {"meals" : newMealitem}}) 
            } else {
                update(user._id,
          {orders : meal}) 
            }
      }
    })
    .then(function(user){
      console.log('has it been updated',user)
      res.json(user)

    })
    .fail(function (error) {
      next(error);
    });  
};
