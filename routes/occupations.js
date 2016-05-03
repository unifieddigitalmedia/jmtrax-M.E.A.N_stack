var waterfall = require('async-waterfall');

var express = require('express');

var app = express();

var router = express.Router();

var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;

var assert = require('assert');

var url = 'mongodb://localhost:27017/testdb';

var db = mongoose.createConnection(url);

var mongo = require('mongodb');

router.get('/', function(req, res ) {



db.collection('occupations').find().toArray(function(e, results){


   if (e) return next(e);

   
     
     res.json(results);



   });


});












module.exports = router;