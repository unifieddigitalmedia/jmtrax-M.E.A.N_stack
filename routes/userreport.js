var waterfall = require('async-waterfall');

var express = require('express');

var app = express();

var router = express.Router();

var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;

var assert = require('assert');

var url = 'mongodb://localhost:27017/testdb';

var db = mongoose.createConnection(url);




waterfall([

function(callback){

var sentamount = 0 ; 

db.collection('transfers').find( 

  {

    'agentusername' : req.query.agentusername  } 

   },{ "amount": 1, _id:0 } 

   ).toArray(function(e, results){


   if (e) return next(e);


   results.forEach(function(entry) {
    

    sentamount += entry.amount; 
  
     });

     callback(null,sentamount);

   });


}

function(arg,callback){

var bankedamount = 0;

db.collection('users').find( 

  {

    'username' : { $elemMatch: { username: req.query.agentusername } } 

   },{ "senderdetails.banking": 1, _id:0 } 

   ).toArray(function(e, results){


   if (e) return next(e);


  
   results.forEach(function(entry) {
    
    
    if(entry.senderdetails.transactions !== undefined)

    {

     entry.senderdetails.banking.forEach(function(entry) {
    
      bankedamount += entry.amount ; 

   

     });

  }
  
     });


   callback(null,arg,bankedamount);
  



   });




}


function(arg,arg1,callback){




db.collection('users').findOne({username:req.query.agentusername},function(e, results){

   if (e) return next(e);

var availableamt =  parseInt(result.limit) - parseInt(arg);

var outbalance =  parseInt(arg) - parseInt(arg1);

 callback(null,availableamt,outbalance);
  

   });







   








},function(arg,arg1,callback) {



res.json("Email user report");


}



]),function(err, results) {




var response = {"ERROR":"There was an error contact web administrator"};
        
        res.json( response);


};