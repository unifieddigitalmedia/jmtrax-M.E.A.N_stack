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

if(req.query.firstname !== 'undefined' && req.query.lastname !== 'undefined')

{


 db.collection('users').find( 

  {

$and : [  



          { 'receipients' : { $elemMatch: { "ReceipientFirstName":req.query.firstname } } }, 

          { 'receipients' : { $elemMatch: { "ReceipientLastName": req.query.lastname  } } }



        ]
   

   },{ "transactions": 1, _id:0 } 

   ).toArray(function(e, results){


   if (e) return next(e);


  
   results.forEach(function(entry) {
    

    if(entry.transactions !== undefined)

    {

     entry.transactions.forEach(function(entry) {
    

    receipients_array.push(entry);


     });

  }
  
     });



     res.json(receipients_array);



   });




}


});



module.exports = router;