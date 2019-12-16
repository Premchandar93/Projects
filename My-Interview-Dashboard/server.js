const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;
let Interview = require('./models/interview.model.js');
const data = require('./data.js');
const interviewRoutes = require('./routes/interviewRoutes.js');
const MONGODB_URL = data.MONGODB.BASE_URL + data.MONGODB.USERNAME + ":" + data.MONGODB.PASSWORD + data.MONGODB.DOMAIN + data.MONGODB.DATABASE;
const path = require('path')

mongoose.connect(MONGODB_URL, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './client/build')))



app.use('/interviews', interviewRoutes);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
