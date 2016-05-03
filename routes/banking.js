var waterfall = require('async-waterfall');

var express = require('express');

var app = express();

var router = express.Router();

var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;

var assert = require('assert');

var url = 'mongodb://localhost:27017/testdb';

var db = mongoose.createConnection(url);

var date = new Date();

var day = date.getDate();
    
var monthIndex = date.getMonth();
    
var year = date.getFullYear();

if(monthIndex === 12)
{

monthIndex = 1; 

}else {

monthIndex = monthIndex + 1 ; 

}
    date = day+'-'+monthIndex+'-'+year ;


router.get('/', function(req, res ) {

var banking_array = [];



if(req.query.agenttype === 'administrator')

{


db.collection('users').find( 

  {

   

  }

  ,

  { "banking": 1, _id:0 } 

   ).toArray(function(e, results){


   if (e) return next(e);


  results.forEach(function(entry) {
    

    if(entry.banking !== undefined)

    {

     entry.banking.forEach(function(entry) {
    

     banking_array.push(entry);


     });

    }
  
     });




     res.json(banking_array);



   });



}
else
{

db.collection('users').find( 

  {

    "username": req.query.agentusername  

   }
  ,

  { "banking": 1, _id:0 } 
   ).toArray(function(e, results){


   if (e) return next(e);


   results.forEach(function(entry) {
    

    if(entry.banking !== undefined)

    {

     entry.banking.forEach(function(entry) {
    

     banking_array.push(entry);


     });

    }
  
     });




     res.json(banking_array);



   });



}


  });


router.post('/', function(req,res) {


db.collection('users').update({ "username": req.query.agent },{ $push: { "banking": 


{ 


"date":req.query.date,
"amount":req.query.amount,
"payment_ref":req.query.payment_ref,
"bank":req.query.bank,
"sales":req.query.sales,
"num_transfers":req.query.num_transfers,
"agent":req.query.agent,
"comment":req.query.comment

} 



} } , function(err, results) { 



var response = {

"ERROR":"A new deposit has now been added to agent " + req.query.agent,
"RESULTS":results,
"QUERY ERROR":err


};
        
        res.json( response );



}) ;




  });



router.delete('/', function(req,res) {


  
db.collection('users').update(

  { "username" : req.query.agentusername } ,

  { $pull: 

    { 



      banking: { 

      date: req.query.date , 
      amount: req.query.amount , 
      payment_ref : req.query.payment_ref , 
      bank : req.query.bank,
      sales : req.query.sales,
      num_transfers : req.query.num_transfers,
      agent : req.query.agentusername,
      comment : req.query.comment, 


    } } },
  

  { multi: true }

, function(e, results){

console.log(results);

var response = {

"ERROR":"A deposit has now been removed",



};
        
        res.json( response );

});

       
           








});








module.exports = router;