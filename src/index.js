const express = require('express');
const app = express();
const path = require('path');
//var cors = require('cors');
var bodyParser = require('body-parser');
//var morgan = require('morgan');

var router = express.Router();

require('dotenv').config()

//Database connect
require('./db/con_db')

//Define port
var port = process.env.PORT || 8888

//Use apps
//app.use(morgan('combined'));
//app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(function(err, req, res, next){
//    console.log('Time: ',Date.now());
//});

//Router
var router = require('./routes/index');
app.use('/apigd', router);

// Port listening
app.listen(port)
    console.log('API listening in the port: ' + port);

module.exports = {
    app
};