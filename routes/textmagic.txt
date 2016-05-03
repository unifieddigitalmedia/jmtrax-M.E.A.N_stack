var TMClient = require('textmagic-rest-client');

var waterfall = require('async-waterfall');

var express = require('express');

var app = express();

var router = express.Router();

var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;

var mongo = require('mongodb');

var assert = require('assert');

var url = 'mongodb://localhost:27017/testdb';

var db = mongoose.createConnection(url);

var message;

router.get('/', function(req, res ) {

var c = new TMClient('jmtrax', '3511481');

c.Messages.send({text: "Welcome to JM Transfers"}, function(err, res){

    console.log('Messages.send()', err, res); 



  });




});


module.exports = router;