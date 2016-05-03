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

db.collection('shops').find().toArray(function(e, results){


   if (e) return next(e);

   
        res.json(results);

   });


});


router.delete('/', function(req,res) {

var o_id = new mongo.ObjectID(req.query.id);

db.collection('shops').remove( { "_id" : o_id}  , function(err, results) {

var response = {

"ERROR":"Shop has now been deleted from our database",
"RESULTS":results,
"QUERY ERROR":err


};
        
        res.json(response);
        
     

   });


});


router.post('/', function(req,res) {


      db.collection('shops').insert([ {


        "name":req.query.shop_name, 
        "address":req.query.shop_address,
       
                       }

        ], function (err, result) {
 

 var response = {"ERROR":"A new shop has been added to your database"};
        
        res.json( response);

  });

});









module.exports = router;