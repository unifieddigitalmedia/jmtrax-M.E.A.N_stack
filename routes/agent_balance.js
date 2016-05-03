var waterfall = require('async-waterfall');

var express = require('express');

var app = express();

var router = express.Router();

var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;

var assert = require('assert');

var url = 'mongodb://localhost:27017/testdb';

var db = mongoose.createConnection(url);




router.get('/', function(req,res) {


var date = new Date();

    
var monthIndex = date.getMonth();
    

if(monthIndex === 12)
{

monthIndex = 1; 

}else {

monthIndex = monthIndex + 1 ; 

}

date = date.getDate()+'-'+monthIndex+'-'+ date.getFullYear() ;




var totalbanked = 0;

var totaltransfered = 0;



waterfall([

function(callback){




db.collection('transfers').find({




   "agentusername": req.query.agentusername ,

   "date": date 




}).toArray(function(e, results){


   if (e) return next(e);


results.forEach(function(entry) {

console.log(entry.remittance);

totaltransfered += parseInt(entry.remittance.replace("'","")); 

 


});

 
callback(null,totaltransfered);

 

   });


},function(arg,callback){



 db.collection('users').find( 

  {


      "username": req.query.agentusername


   },{ "banking": 1, _id:0 } 

   ).toArray(function(e, results){


   if (e) return next(e);


  
   results.forEach(function(entry) {
    

    entry.banking.forEach(function(entry) {
    

     if(entry.date == date)

    {

          totalbanked += parseInt(entry.amount.replace("'","")); 

    }
    


     });


    
   // totalbanked += parseInt(entry.banking.amount.replace("'","")); 

 
  
     });


 
    callback(null,arg,totalbanked);


   });




},function(arg,arg1,callback){


db.collection('users').findOne({username:req.query.agentusername},function(e, results){

   if (e) return next(e);

if(results)

{


var limit =  results.limit;

var outstandingbalance = parseInt(arg) - parseInt(arg1) ;

var availablebalance = parseInt(results.limit) - parseInt(arg) + parseInt(arg1);


  var response = {


    "LIMIT":limit,

    "OUTSTANDING":outstandingbalance,

    "AVAILABLE":availablebalance 

                 };
        
  res.json(response);






}


   });


}

]),function(err, results) {



};









});


//$and: [ { "senderdetails.transaction.ReceipientFirstName": "value2"}, {  "senderdetails.transaction.ReceipientLastName ": "value2"  } ]




module.exports = router;