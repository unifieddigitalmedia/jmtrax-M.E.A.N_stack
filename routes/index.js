var express = require('express');

var app = express();

var router = express.Router();

var login_routes = require('./login');

var user_routes = require('./user');

var shop_routes = require('./shop');

var bank_routes = require('./banks');

var transaction_routes = require('./transactions');

var receipients_routes = require('./receipients');

var senders_routes = require('./senders');

var rates_routes = require('./rates');

var banking_routes = require('./banking');

var sender_transactions_routes = require('./sender_transactions');

var receipient_statement_routes = require('./receipient-statement');

var shop_activity_report_routes = require('./shop-activity-report');

var autofill_routes = require('./autofill');

var checkout_routes = require('./checkout');

var receipt_routes = require('./receipt');

var forgotten_passsword_routes = require('./forgottenpassword');

var agent_balance_routes = require('./agent_balance');

var edit_order_routes = require('./editorder');

var fees_routes = require('./charge');

var senderslist_routes = require('./senderslist');

var agent_report_routes = require('./agent_report');

var textmagic_routes = require('./textmagic');

var occupations_routes = require('./occupations');




router.use('/login',login_routes);

router.use('/user',user_routes);

router.use('/senders',senders_routes);

router.use('/receipients',receipients_routes);

router.use('/banks',bank_routes);

router.use('/rates',rates_routes );

router.use('/shop',shop_routes);

router.use('/transactions',transaction_routes);

router.use('/banking',banking_routes);

router.use('/sender_transactions',sender_transactions_routes);

router.use('/receipient-statement',receipient_statement_routes);

router.use('/shop-activity-report',shop_activity_report_routes);

router.use('/autofill',autofill_routes);

router.use('/checkout',checkout_routes);

router.use('/receipt',receipt_routes);

router.use('/forgottenpassword',forgotten_passsword_routes);

router.use('/agent_balance',agent_balance_routes);

router.use('/editorder',edit_order_routes);

router.use('/charge',fees_routes);

router.use('/senderslist',senderslist_routes);

router.use('/agent_report',agent_report_routes);

router.use('/textmagic',textmagic_routes);

router.use('/occupations',occupations_routes);



module.exports = router;