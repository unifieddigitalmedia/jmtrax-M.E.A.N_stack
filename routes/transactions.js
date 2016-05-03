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

var nodemailer = require("nodemailer");

var smtpTransport = require("nodemailer-smtp-transport");

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

var transactions_array = [];

if(req.query.firstname === undefined && req.query.lastname === undefined)
{



if(req.query.agenttype === 'administrator')
{


db.collection('transfers').find( 

  {

   

   }

   ).toArray(function(e, results){


   if (e) return next(e);





     res.json(results);



   });



}
else
{

db.collection('transfers').find( 

  {

    "agentusername": req.query.agentusername  

   }

   ).toArray(function(e, results){


   if (e) return next(e);




     res.json(results);



   });



}




}
else if(req.query.firstname !== undefined && req.query.lastname !== undefined)
{



var first3 = req.query.firstname.substring(0,3);

var last3 =  req.query.lastname.substring(0,3);


 db.collection('transfers').find( 

  {
           recipientfirstname: { $regex: first3 ,$options:"$i"} , 

           recipientsurname:  { $regex: last3 ,$options:"$i"} 


   }

   ).toArray(function(e, results){


   if (e) return next(e);





     res.json(results);



   });




}


});






router.post('/', function(req,res) {



waterfall([

function(callback){



var date = new Date();
var day = date.getDate();
var monthIndex = date.getMonth();


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



db.collection('transfers').insert([

{ 

"senderfirstname" : req.query.senderfirstname,
"senderlasttname" : req.query.senderlasttname,
"line1" : req.query.line1,
"line2" : req.query.line2,
"line3" : req.query.line3,
"town" : req.query.town,
"sendercountry" : req.query.sendercountry,
"postcode" : req.query.postcode,
"senderphone" : req.query.senderphone,
"sendermobile" : req.query.sendermobile,
"senderemail" : req.query.senderemail,
"recipientsurname" : req.query.recipientsurname,
"recipientfirstname" : req.query.recipientfirstname,
"recipientphone" : req.query.recipientphone,
"bankac" : req.query.bankac,
"bankname" : req.query.bankname,
"recmobilephoneprex" : req.query.recmobilephoneprex,
"paymentref" : req.query.paymentref,
"shopacc" : req.query.shopacc,
"paypalemail" : req.query.paypalemail,
"reasonfortransfer" : req.query.reasonfortransfer,
"agentusername" : req.query.agentusername,
"remittance" : req.query.remittance,
"ngn" : req.query.ngn,
"amount" : req.query.amount,
"totalngn" : req.query.totalngn,
"totalgbp" : req.query.totalgbp,
"fee" : req.query.fee,
"date" : date,
"shop":req.query.shop,
"customerref":req.query.customerref,
"rate":req.query.rate

} ] , function(err, results) { 



        //var response = {"ERROR":"Transaction has been posted. Proceed to checkout.","orderID":results.insertedIds[0]};
        
        //res.json( response);
      


callback(null,results.insertedIds[0]);


});



},function(arg,callback){


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

    
var o_id = new mongo.ObjectID(req.query.username);

//db.collection('users').update({ "username": req.query.username },{ $push: { "transactions": 

  db.collection('users').update({ "_id": o_id },{ $push: { "transactions": 

{ 

"_id":arg,
"senderfirstname" : req.query.senderfirstname,
"senderlasttname" : req.query.senderlasttname,
"line1" : req.query.line1,
"line2" : req.query.line2,
"line3" : req.query.line3,
"town" : req.query.town,
"sendercountry" : req.query.sendercountry,
"postcode" : req.query.postcode,
"senderphone" : req.query.senderphone,
"sendermobile" : req.query.sendermobile,
"senderemail" : req.query.senderemail,
"recipientsurname" : req.query.recipientsurname,
"recipientfirstname" : req.query.recipientfirstname,
"recipientphone" : req.query.recipientphone,
"bankac" : req.query.bankac,
"bankname" : req.query.bankname,
"recmobilephoneprex" : req.query.recmobilephoneprex,
"paymentref" : req.query.paymentref,
"shopacc" : req.query.shopacc,
"paypalemail" : req.query.paypalemail,
"reasonfortransfer" : req.query.reasonfortransfer,
"agentusername" : req.query.agentusername,
"remittance" : req.query.remittance,
"ngn" : req.query.ngn,
"amount" : req.query.amount,
"totalngn" : req.query.totalngn,
"totalgbp" : req.query.totalgbp,
"fee" : req.query.fee,
"date" : date,
"shop":req.query.shop,
"customerref":req.query.customerref,
"rate":req.query.rate

} 



} } );



          



  var response = {"ERROR":"Transaction has been posted. Proceed to checkout.","orderID":arg};
        
        res.json( response);


}

  ]),function(err, results) {




var response = {"ERROR":"There was an error contact web administrator"};
        
        res.json( response);


};









});


//$and: [ { "senderdetails.transaction.ReceipientFirstName": "value2"}, {  "senderdetails.transaction.ReceipientLastName ": "value2"  } ]



module.exports = router;