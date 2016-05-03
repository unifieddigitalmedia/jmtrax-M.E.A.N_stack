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

router.put('/', function(req,res) {



var o_id = new mongo.ObjectID(req.query.id);

var transaction = [];

waterfall([

function(callback){
   

   db.collection('transfers').findOne( { "_id" : o_id } , function(e,results) {


      callback(null,results);
    

    });

  
   },function(arg1,callback){




var transaction = arg1;

transaction.cash = req.query.cash;

transaction.change = req.query.change;


db.collection('transfers').update( {  "_id" : o_id } ,  { $set: {"cash": req.query.cash , "change" : req.query.change } } , function(e,results) {



    callback(null);

    });





   }
,
function(callback){
   
   var o_id = new mongo.ObjectID(req.query.username);

   //db.collection('users').findOne( { "username" : req.query.username } , { "transactions": 1, _id:0 } , function(e,results) {

    db.collection('users').findOne( { "_id" : o_id } , { "transactions": 1, _id:0 } , function(e,results) {


      callback(null,results);
    

    });

  
   }, function(arg1,callback){


var transactions = arg1.transactions;


transaction = transactions[transactions.length - 1];



transaction.cash = req.query.cash;

transaction.change = req.query.change;


transactions.splice( transactions.length - 1 , 1 ) ;


callback(null,transactions,transaction);



   }

, function(arg1,arg2, callback){


arg1.push(arg2);



callback(null,arg1);


   },function(arg1,callback){


db.collection('users').update( { "username" : req.query.username } ,  { $unset: { "transactions"  :  "" } } , function(e,results) {



      callback(null,arg1);
    

    });

   },

function(arg1,callback){


 


  db.collection('users').update( { "username" : req.query.username } ,  { $set: {"transactions": arg1 } } , function(e,results) {


     var response = {

"ERROR":"Transactions has now been completed" ,



};
        
        res.json( response );

    

    });


}


   ], function (err, result) {
 



  });




	});





module.exports = router;