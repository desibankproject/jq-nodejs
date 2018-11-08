//this is starting point of the program!
//I have to configure Node.js as a server
var express = require('express'); //we have just installed
var http = require('http'); //This comes with Node.js
var bodyParser=require('body-parser');
const fileUpload = require('express-fileupload');
//var mongoose = require('mongoose');
///var conn = mongoose.connection;
	//conn.on('error', console.error);
	///conn.once('open', function() {
		//	Create your schemas and models here.
		//console.log("Opening connection to database!");
	//	console.log("Opening connection to database!");	
	//});
//mongoose.connect('mongodb://localhost:27017/agora_db');

//monogoconn contains function definition
var monogoconn=require('./dao/mongodb-utils');
monogoconn();

var app = express(); //Instantiating Express
app.set('port', process.env.PORT || 4000);

// default options
app.use(fileUpload());

//To read data from incoming html form
//do not forget this
app.use(bodyParser.urlencoded({ extended: false }));

//to read json data from request body 
app.use(express.json());

//Mapping static resource
app.use('/',express.static(__dirname + '/public'));

//Importing profile-controller
var initProfileController=require("./controller/profile-controller");
initProfileController(app);
//require("./controller/profile-controller")(app);


//Hey create one http server using app setting on which 
//port number define inside express!
http.createServer(app).listen(app.get('port'), function(){
    console.log('...........NodeJS server listening on port.......... ' + app.get('port'));
    console.log('...........NodeJS server listening on port.......... ' + app.get('port'));
    console.log('...........NodeJS server listening on port.......... ' + app.get('port'));
    console.log('...........NodeJS server listening on port.......... ' + app.get('port'));
    //Adding dummy user
    //authService.addUser({});

});
