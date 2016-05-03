var waterfall = require('async-waterfall');

var express = require('express');

var app = express();

var router = express.Router();

var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;

var assert = require('assert');

var url = 'mongodb://localhost:27017/testdb';

var db = mongoose.createConnection(url);

var nodemailer = require("nodemailer");

var smtpTransport = require("nodemailer-smtp-transport")


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


var pastdate = new Date();

pastdate.setDate(pastdate.getDate() - 30);
    
var monthIndex = pastdate.getMonth();
    

if(monthIndex === 12)
{

monthIndex = 1; 

}else {

monthIndex = monthIndex + 1 ; 

}

pastdate = pastdate.getDate()+'-'+monthIndex+'-'+ pastdate.getFullYear() ;


waterfall([

function(callback){




db.collection('transfers').find({



     
   "agentusername": req.query.agentusername ,

   "date": { $gt: pastdate } ,

   "date": { $lt: date } 




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
    

    if(entry.date >= pastdate && entry.date <= date)

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


var limit =  results.limit;

var outstandingbalance = parseInt(arg) - parseInt(arg1) ;

var availablebalance = parseInt(results.limit) - parseInt(arg) + parseInt(arg1);

var message = "Your total transfers within the past 30 day is £"+parseInt(arg)+". The total banked is £" +parseInt(arg1)+ ". Your outstanding balance is £"+outstandingbalance;


  /*var response = {


  	"LIMIT":limit,

  	"OUTSTANDING":outstandingbalance,

  	"AVAILABLE":availablebalance 

                 };
        
  res.json(response);

   */

var smtpTransport = nodemailer.createTransport(smtpTransport({
    host : "Smtp.live.com",
    secureConnection : false,
    port: 587,
    auth : {
        user : "udigitallondon@hotmail.com",
        pass : "321123ETz!"
    }
}));

    var mailOptions={
        from : "udigitallondon@hotmail.com",
        to : results.customerdetails.Email,
        subject : "Welcome to JM Transfers",
        text : "Your Text",
        html : message

          /*attachments : [
            {   // file on disk as an attachment
                filename: 'text3.txt',
                path: 'Your File path' // stream this file
            }
        ]*/
    }
   
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log(response.response.toString());
            console.log("Message sent: " + response.message);
            

            var response = {"ERROR":"A new sender has been added to your database","TYPE":req.query.user_type};
        
            res.json( response);

        }
    });



});

}

]),function(err, results) {



};









});


//$and: [ { "senderdetails.transaction.ReceipientFirstName": "value2"}, {  "senderdetails.transaction.ReceipientLastName ": "value2"  } ]




module.exports = router;