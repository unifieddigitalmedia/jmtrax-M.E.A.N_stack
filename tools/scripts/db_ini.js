var date = new Date();
var day = date.getDate();
var monthIndex = date.getMonth();
var year = date.getFullYear();

date = day+'-'+monthIndex+'-'+year ;

var db = connect('mongodb://localhost:27017/testdb');

db.users.remove({});
db.banks.remove({});
db.rates.remove({});
db.shops.remove({});
db.fees.remove({});
db.transfers.remove({});

db.banks.insert( [


{

        "bankname":"ACCESS BANK NIGERIA", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);

db.banks.insert( [


{

        "bankname":"CHAMS", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"CORPORETTI", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"DIAMOND BANK LTD", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"E-TRANZACT", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"EARTHOLEUM (QIK QIK)", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"ECOBANK PLC", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"ECOBANKMONEY", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"ENTERPRISE BANK LIMITED", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"EQUITORIAL TRUST BANK", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"FBN M-MONEY", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"FETS (MY WALLET)", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"FIDELITY BANK PLC", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"FIRST BANK OF NIGERIA", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"FIRST CITY MONUMENT", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"FORTIS MICROFINANCE", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"GT MOBILE MONEY", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"GUARANTY TRUST BANK PLC", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"INTERCONTINENTAL BANK", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"KEYSTONE BANK LTD", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"M-KUDI", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"MAINSTREET BANK LIMITED", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"MONETIZE", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"NIGERIA INTL BANK LTD", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"PARKWAY (READY CASH)", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"PAYCOM (PAYCOM)", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"SKYE BANK PLC", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"STANBIC IBTC", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"STANBICMONEY", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"STANDARD CHARTERED BANK", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"STERLING BANK", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"U-MO", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"UBA PLC", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"UNION BANK", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"UNITY BANK", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"WEMA BANK", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);
db.banks.insert( [


{

        "bankname":"ZENITH BANK", 
        "bankholder":"",
        "accountnumber":"", 
        "sortcode":"",
        "ref":"", 
        "type":"receipient", 
       

}

]

);




db.fees.insert( [


{

        "lower":0.00, 
        "upper":100.00,
        "commission":5,
       

}

]

);


db.fees.insert( [


{

        "lower":100.01, 
        "upper":200.00,
        "commission":10,
       

}

]

);


db.fees.insert( [


{

        "lower":200.01, 
        "upper":300.00,
        "commission":14,
       

}

]

);


db.fees.insert( [


{

        "lower":300.01, 
        "upper":400.00,
        "commission":17,
       

}

]

);


db.fees.insert( [


{

        "lower":400.01, 
        "upper":500.00,
        "commission":21,
       

}

]

);


db.fees.insert( [


{

        "lower":500.01, 
        "upper":600.00,
        "commission":24,
       

}

]

);


db.fees.insert( [


{

        "lower":600.01, 
        "upper":700.00,
        "commission":27,
       

}

]

);


db.fees.insert( [


{

        "lower":700.01, 
        "upper":800.00,
        "commission":32,
       

}

]

);


db.fees.insert( [


{

        "lower":800.01, 
        "upper":900.00,
        "commission":35,
       

}

]

);


db.fees.insert( [


{

        "lower":900.01, 
        "upper":1000.00,
        "commission":38,
       

}

]

);


db.fees.insert( [


{

        "lower":1000.01, 
        "upper":1000000.00,
        "commission":4,
       

}

]

);

db.users.insert( [


{





        "username":"ADMINISTRATOR", 
        "password":"1JAMESBOND@",
        "secretquestion":"Where did you meet your spouse?",
        "secretanswer":"LONDON",
        "datemodified":date,
        "datecreated":date,
        "usertype":"administrator",
        "limit": "20000.00",
        "customerdetails":{


                "FirstName":"VICTOR",
                "LastName":"AMOS",
                "Gender":"MALE",
                "MobilePhone":"",
                "Email":"victor.a@icloud.com" ,

        },
 "senderdetails": {


                "SendersFirstName":"VICTOR",
                "SendersLastName":"AMOS",
                "Line1":"",
                "Line2":"",
                "Line3":"",
                "Town":"",
                "County":"",
                "Country":"",
                "Mobile":"",
                "Email":"",
                "Sourceoffunds":"",
                "IDURL":"",
                "AddressURL":"",
                "IncomeURL":"",
                "IDtype":"",
                "IDnumber":"",
                "IDexpiry":"",
                "IDcountry":"",
                "IncomeURL":"",
                "Enabled":"",
               



        },
         "receipients":[],
                "transactions":[],
                "banking":[],
                "IDdetails":[],
        "enabled":"",
        "token":"",
        "shop":

        { 
                "name":"",
                "address":"",

        },



}


        ]);

print('* Documents created');

var allMadMen = null;

allMadMen = db.users.find();
 
while (allMadMen.hasNext()) {

   printjson(allMadMen.next());

};
