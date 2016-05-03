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


router.get('/', function(req,res) {


var o_id = new mongo.ObjectID(req.query.id);

var transactions_array = [];

db.collection('transfers').find( 

  {


    "_id": o_id
   

   }

   ).toArray(function(e, results){


   if (e) return next(e);



  /*results.forEach(function(entry) {
    

    if(entry.senderdetails.transactions !== undefined)
    {

      entry.senderdetails.transactions.forEach(function(entry) {
    

    transactions_array.push(entry);


     });

    }


      });
    */



   



     res.json(results);



   });






	});





module.exports = router;