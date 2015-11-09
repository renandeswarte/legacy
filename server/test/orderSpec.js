var request = require('supertest');
var express = require('express');
var app = require('../server');


//Test whether orders API is sending data
setTimeout(function() {
	request(app)
	.get('/api/users/customer/get/meals')
	.end(function(err, res) {
		if(err){
			console.log("I failed");
		}
	console.log(res.body);

	});
},6000);
