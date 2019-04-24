const Product=  require('../model/model.js');
var mongoclient = require('mongodb').MongoClient;

module.exports.getmax= function(req,res) {
	res.send('Max value returned');
};

module.exports.getlist = function(req,res) {
	//	Product.find()
	console.log('inside get list ');
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
						rest = result.map((each) => { return {mileage: each.mileage} });
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
};

module.exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};

/*
module.exports.get_details = function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};
*/
module.exports.calculate_mileage = function(req,res){
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

	

}