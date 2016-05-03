var waterfall = require('async-waterfall');

var express = require('express');

var app = express();

var router = express.Router();

var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;

var assert = require('assert');

var url = 'mongodb://localhost:27017/testdb';

var db = mongoose.createConnection(url);

var senderdetailsarray ;
var receipientdetails;

var mongo = require('mongodb');



router.get('/', function(req, res ) {


var order_details = [];

waterfall([ 

function(callback){

var o_id = new mongo.ObjectID(req.query.username);



//db.collection('users').findOne({"username":req.query.username},function(e, results){

  db.collection('users').findOne({"_id":o_id},function(e, results){

   if (e) return next(e);

   if(results) {

 senderdetailsarray = {


                "SendersFirstName":results.senderdetails.SendersFirstName ,
                "SendersLastName":results.senderdetails.SendersLastName,
                "Line1":results.senderdetails.Line1,
                "Line2":results.senderdetails.Line2,
                "Line3":results.senderdetails.Line3,
                "Town":results.senderdetails.Town,
                "Postcode":results.senderdetails.Postcode,
                "County":results.senderdetails.County,
                "Country":results.senderdetails.Country,
                "Mobile":results.senderdetails.Mobile,
                "Email":results.senderdetails.Email,

        };


   order_details.push(senderdetailsarray);



   callback(null,order_details);
   
   }



   });






},function(arg1 , callback){



db.collection('users').findOne( 

  {


          'receipients' : { $elemMatch: { "ReceipientFirstName": req.query.receipient_firstname } } , 

          'receipients' : { $elemMatch: { "ReceipientLastName": req.query.receipient_lastname } } ,

          'receipients' : { $elemMatch: { "ReceipientBank": req.query.receipient_bank } } ,

          'receipients' : { $elemMatch: { "ReceipientAccountNumber": req.query.receipient_banknumber } } 



   } , { "receipients": 1, _id:0 } , function(e, results){
          
//console.log(req.query.receipient_firstname +'-'+ req.query.receipient_lastname +'-'+ req.query.receipient_bank +'-'+ req.query.receipient_banknumber);

//console.log(results.length);

 if (e) return next(e);

 if(results)

 {

results.receipients.forEach(function(entry) {
    


   

    if( entry.ReceipientFirstName == req.query.receipient_firstname  && entry.ReceipientLastName == req.query.receipient_lastname && entry.ReceipientBank == req.query.receipient_bank && entry.ReceipientAccountNumber == req.query.receipient_banknumber   )

    {

    
    receipientdetails = {

                          "ReceipientFirstName" : req.query.receipient_firstname,
                          "ReceipientLastName" : req.query.receipient_lastname,
                          "ReceipientBank" : req.query.receipient_bank, 
                          "ReceipientAccountNumber": req.query.receipient_banknumber,
                          "ReceipientReasonForTransfer": entry.ReceipientReasonForTransfer,
                          "ReceipientPaymentReference" : entry.ReceipientPaymentReference,
                          "ReceipientPhone" : entry.ReceipientPhone,
                          "ReceipientPayPal"  : entry.ReceipientPayPal,
                          "ReceipientShopAccount"  : entry.ReceipientShopAccount,
                          "ReceipientThirdPartyPaymentComment" : entry.ReceipientThirdPartyPaymentComment
     

                          }


     }
  
  });

  
 }


  


   



                       order_details.push(receipientdetails);

                        callback(null,order_details);

                   
   })



  }
,function(callback){




db.collection('users').findOne({"username":req.query.agentusername},function(e, results){

   if (e) return next(e);


   order_details.push({


                "Shop":results.shop.name,
               
        });





       res.json(order_details);
   



   });






}





  ],function (err, result) {
 



  });


});





module.exports = router;