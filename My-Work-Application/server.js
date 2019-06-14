const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const taskRoutes = require('./business.route');
const path = require('path')

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './client/build')))

//app.get('*', (req, res) => {
//  res.sendFile(path.join(__dirname + '/client/build/index.html'))
//})


app.use('/task', taskRoutes);

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});