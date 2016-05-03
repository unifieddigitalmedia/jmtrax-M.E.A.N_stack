var waterfall = require('async-waterfall');

var express = require('express');

var app = express();

var router = express.Router();

var sess;


router.get('/', function(req, res ) {


if (req.session && req.session.username) { 

  sess = req.session;
        
        console.log(sess);

        var response = {"USERNAME":sess.username,"USERTYPE":sess.usertype,"EMAIL":sess.email,"LIMIT":sess.credit_limit,"ID":sess.id};
        
        res.json(response);

}
else
{

	sess = req.session;
        
        console.log(sess);

 var response = {"USERNAME":"no session data"};
        
        res.json(response);

console.log("no session data");

}
      




});


module.exports = router;