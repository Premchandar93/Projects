from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_restplus import Api, Resource, fields
from sklearn.externals import joblib
import numpy as np
import sys
import pickle

flask_app = Flask(__name__)
CORS(flask_app)
app = Api(app = flask_app, 
		  version = "1.0", 
		  title = "Iris Plant identifier", 
		  description = "Predict the type of iris plant")
#cors = CORS(app, resources={r"/*": {"origins": "*"}})

#@app.route("/")
#def my_index():
#	return 'hello_world'


name_space = app.namespace('prediction', description='Prediction APIs')
#main = app.namespace('/', description='get APIs')


model = app.model('Prediction params', 
				  {'History': fields.Integer(required = True, 
				  							description="History", 
    					  				 	help="History cannot be blank"),
				  'Short': fields.Integer(required = True, 
				  							description="Short", 
   					  				 	   help="Short cannot be blank"),
				  'Mystery': fields.Integer(required = True, 
				  							description="Mystery", 
    					  				 	help="Mystery cannot be blank"),
				  'Family': fields.Integer(required = True, 
				  							description="Family", 
   					  				 	   help="Family cannot be blank"),
				  'Horror': fields.Integer(required = True, 
				  							description="Horror", 
    					  				 	help="Horror cannot be blank"),
				  'Romance': fields.Integer(required = True, 
				  							description="Romance", 
   					  				 	   help="Romance cannot be blank"),
				  'War': fields.Integer(required = True, 
				  							description="War", 
    					  				 	help="War cannot be blank"),
				  'Music': fields.Integer(required = True, 
				  							description="Music", 
    					  				 	help="Music cannot be blank"),
				  'Drama': fields.Integer(required = True, 
				  							description="Drama", 
   					  				 	   help="Drama cannot be blank"),
				  'Biography': fields.Integer(required = True, 
				  							description="Biography", 
    					  				 	help="Biography cannot be blank"),
				  'Crime': fields.Integer(required = True, 
				  							description="Crime", 
   					  				 	   help="Crime cannot be blank"),
				  'Action': fields.Integer(required = True, 
				  							description="Action", 
    					  				 	help="Action cannot be blank"),
				  'Western': fields.Integer(required = True, 
				  							description="Western", 
   					  				 	   help="Western cannot be blank"),
				  'Sport': fields.Integer(required = True, 
				  							description="Sport", 
    					  				 	help="Sport cannot be blank"),
				  'Comedy': fields.Integer(required = True, 
				  							description="Comedy", 
   					  				 	   help="Comedy cannot be blank"),
				  'Thriller': fields.Integer(required = True, 
				  							description="Thriller", 
    					  				 	help="Thriller cannot be blank"),
				  'Documentary': fields.Integer(required = True, 
				  							description="Documentary", 
   					  				 	   help="Documentary cannot be blank"),
				  'Fantasy': fields.Integer(required = True, 
				  							description="Fantasy", 
   					  				 	   help="Fantasy cannot be blank"),
				  'Musical': fields.Integer(required = True, 
				  							description="Musical", 
    					  				 	help="Musical cannot be blank"),
				  'Sci-Fi': fields.Integer(required = True, 
				  							description="Sci-Fi", 
   					  				 	   help="Sci-Fi cannot be blank"),
				  'Adventure': fields.Integer(required = True, 
				  							description="Adventure", 
   					  				 	   help="Adventure cannot be blank"),
				  'Animation': fields.Integer(required = True, 
				  							description="Animation", 
    					  				 	help="Animation cannot be blank")})

pkl_filename = "pickle_model.pkl"  
with open(pkl_filename, 'rb') as file:  
    mclassifier = pickle.load(file)


#mclassifier = joblib.load('mymodel.joblib')
print (mclassifier)
@name_space.route("/")



#@cross_origin()
class MainClass(Resource):
	def get(self):
		return 'helo'
	def options(self):
		response = make_response()
		print(response)
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

	@app.expect(model)		
	def post(self):
		try: 
			formData = request.json
			print("formdata=")
			print(formData)
			data = [val for val in formData.values()]
			print("data=")
			print(data)
			prediction = mclassifier.predict(np.array(data).reshape(1, -1))
			print("prediction=")
			print(prediction)
			types = { 0: "No, you won't like this movie", 1: "Yes, you'll like this movie"}
			response = jsonify({
				"statusCode": 200,
				"status": "Prediction made",
				"result": types[prediction[0]]
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			response.headers.add('Access-Control-Allow-Headers', "*")
			response.headers.add('Access-Control-Allow-Methods', "*")
			print(response)
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})