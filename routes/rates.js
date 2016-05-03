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



db.collection('rates').find().toArray(function(e, results){


   if (e) return next(e);

   
     
     res.json(results);



   });


});






router.post('/', function(req,res) {

db.collection('rates').remove({});

db.collection('rates').insert( [


{

        "GBP":req.query.gbp, 

        "NGN":req.query.ngn
       
        
}

  ], function (err, result) {
 

var response = {"ERROR":"A new rates have been added to your database"};
        
        res.json( response);


  });





});


module.exports = router;