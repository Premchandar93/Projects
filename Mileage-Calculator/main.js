const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/route.js');
const app = express();
var mongoclient = require('mongodb').MongoClient;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use('/product', routes);

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.get('/getlist', function(req,res){
	let db_url = "mongodb://prem1993:prem1993@ds011715.mlab.com:11715/crud_database";

	mongoclient.connect(db_url,async function(err, db){

		if ( err) throw err;
		try {
			var dbo = db.db("crud_database");
			//console.log('startind db');

			var rest;
			var prom = new Promise((resolve,reject) => {
				//console.log('starting promise');
				dbo.collection("mileage").find({}).toArray(function(error, result) {
					//console.log('inside callback');
					if ( error) { 
						reject(error);
					}
					else{
						//alert(JSON.stringify(result));
						//console.log('inside map');
						rest = result.map((each) => { return {mileage: each.mileage, date: each.date} });
						console.log('Data fetched from database successfully');
						resolve(rest);
					}
				});
			});

			//console.log('before await');
			await Promise.all([prom]);
			//console.log('after await');
			db.close();
			//console.log(JSON.stringify(rest));
			console.log('Response sent successfully');
			res.send(rest);
		}
		catch(e){
			throw e;
		};
	});
});

app.post('/calculate', function(req,res){
	var request = {
		start: req.body.start,
		end: req.body.end,
		quantity: req.body.quantity,
		price: req.body.price,
	};

	request.total = request.end - request.start;
	request.petrol = request.quantity / request.price;
	request.mileage = request.total / request.petrol;
	
	let db_url = "mongodb://prem2412:prem2412@ds011715.mlab.com:11715/crud_database";

	mongoclient.connect(db_url,async function(err, db){
		if ( err) throw err;
        try {
	        var dbo = db.db("crud_database");

	        var obj = {
	                date : Date.now(),
	                mileage: request.mileage
	        };

	        var test;
	        var prom = () => {new Promise((resolve,reject) => {
                    dbo.collection('mileage').insertOne(obj, function(err, res) {
                        if ( err) {
                        		console.log('insert error= '+err);
                        		test = 1;
                                reject(err);
                        }
                        else{
                    		console.log('insert success');
                    		test = 2;
                            resolve(res);
                        }
                    });
                });
	        };

	        var callprom = async() => {
	        	var rest = await (prom());
	        	return rest;
	        }

	        callprom().then(function(result){

	        	db.close();
	        	console.log('test= '+test);

		        //db.close();
		        console.log('success ');
		        res.send ({ userstatus: 'SUCCESS', value: request.mileage });
	        });

	        //await Promise.all([prom]);
	        
        }
        catch(e){
        	console.log('error ='+e);
            res.send({ userstatus: 'SUCCESS', value: e})
        };
	});
});


//app.use('/product', routes);


app.listen(8000, () => {
	console.log('Server listening on 8000');
});


