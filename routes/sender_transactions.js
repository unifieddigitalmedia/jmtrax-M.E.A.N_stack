var waterfall = require('async-waterfall');

var express = require('express');

var app = express();

var router = express.Router();

var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;

var assert = require('assert');

var url = 'mongodb://localhost:27017/testdb';

var db = mongoose.createConnection(url);


router.post('/', function(req, res ) {

});

router.get('/', function(req, res ) {



var transactions_array = [];


if(req.query.usertype === 'administrator')
{


db.collection('users').find( 

  {},{ "senderdetails.transactions": 1, _id:0 } 

   ).toArray(function(e, results){


   if (e) return next(e);

   results.forEach(function(entry) {
    

    if(entry.senderdetails.transactions !== undefined)

    {

     entry.senderdetails.transactions.forEach(function(entry) {
    

     transactions_array.push(entry);


     });

  }
  
     });


  
     res.json(transactions_array);



   });



}
else if (req.query.usertype === 'user')
{

db.collection('users').find( 

  {


   'senderdetails.transactions' : { $elemMatch: { "Agent": { $regex: req.query.username } } }

   },{ "senderdetails.transactions": 1, _id:0 } 

   ).toArray(function(e, results){


   if (e) return next(e);

  
   results.forEach(function(entry) {
    

    if(entry.senderdetails.transactions !== undefined)

    {

     entry.senderdetails.transactions.forEach(function(entry) {
    

    transactions_array.push(entry);


     });

  }
  
     });



     res.json(transactions_array);



   });


}
else
{



  db.collection('users').find( 

  {"username":req.query.username},{ "transactions": 1, _id:0 } 

   ).toArray(function(e, results){


   if (e) return next(e);

   results.forEach(function(entry) {
    

    if(entry.transactions !== undefined)

    {

     entry.transactions.forEach(function(entry) {
    

     transactions_array.push(entry);


     });

  }
  
     });


  
     res.json(transactions_array);



   });


}






});




module.exports = router;