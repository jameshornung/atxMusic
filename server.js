
//Dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var request = require('request');
var cheerio = require('cheerio');

//Set Up the App
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(express.static('public'));

//Database Configuration
mongoose.connect('mongodb://heroku_fxm60wqj:7a89tl8mrqgo0feqjiqh23vet2@ds013216.mlab.com:13216/heroku_fxm60wqj');
var db = mongoose.connection;

//Log Mongoose Errors
db.on('error', function(err){
	console.log('Mongoose Error: ', err);
});

//Log Successful Connection
db.once('open', function(){
	console.log('Mongoose Connection Successful!');
});

//{Connect Models Here}

//ROUTES
//++++++++++++++++++++++++
app.get('/', function(req, res){
	res.send(index.html);
});

app.get('/scrape', function(req, res){
	request('http://www.austinchronicle.com/calendar/music/', function(error, response, html){
		var $ = cheerio.load(html);
		var result =[];

		$('section h2').each(function(i, element){
			

			var show = $(this).children('a').text();
			var link = $(this).children('a').attr('href');

			result.push({
				show: show,
				link: link
			});
		});
	console.log(result);
	});
});

//Listen on Port 8888
app.listen(8888, function(){
	console.log('App Running on Port 8888');
});


