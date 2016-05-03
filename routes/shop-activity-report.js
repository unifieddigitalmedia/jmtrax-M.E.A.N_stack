var waterfall = require('async-waterfall');

var express = require('express');

var app = express();

var router = express.Router();

var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;

var assert = require('assert');

var url = 'mongodb://localhost:27017/testdb';

var db = mongoose.createConnection(url);

router.get('/', function(req, res ) {

var receipients_array = [];

if(req.query.shop !== 'undefined' )

{


 db.collection('transfers').find( 

  { "shop":req.query.shop } 

   ).toArray(function(e, results){


   if (e) return next(e);


  


     res.json(results);



   });




}


});



module.exports = router;