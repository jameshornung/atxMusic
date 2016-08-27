
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

var Note = require('./models/Note.js');
var Show =  require('./models/Show.js');

//ROUTES
//++++++++++++++++++++++++
app.get('/', function(req, res){
	res.send(index.html);
});

app.get('/scrape', function(req, res){
	request('http://www.austinchronicle.com/calendar/music/', function(error, response, html){
		var $ = cheerio.load(html);

		$('section h2').each(function(i, element){
			var result = {};

			result.show = $(this).children('a').text();
			result.link = 'http://www.austinchronicle.com' + $(this).children('a').attr('href');

			var entry = new Show(result);

			entry.save(function(err, doc){
				if (err){
					console.log(err);
				}
				else{
					console.log(doc)
				}
			});
		});
	});
	res.send('Scrape Complete');
});

app.get('/shows', function(req, res){
	Show.find({}, function(err, doc){
		if(err){
			console.log(err);
		}
		else{
			res.json(doc);
		}
	});
});

app.get('/shows/:id', function(req, res){
	Show.findOne({'_id': req.params.id})
	.populate('note')
	.exec(function(err, doc){
		if(err){
			console.log(err);
		}
		else{
			res.json(doc);
		}
	});
});

app.post('/shows/:id', function(req, res){
	var newNote = new Note(req.body);
	console.log('new note = ', newNote);
	newNote.save(function(err, doc){
		console.log('doc = ', doc);
		if(err){
			console.log(err);
		}
		else{
			Show.findOneAndUpdate({'_id': req.params.id}, {'$addToSet': {comment: [doc.body]}}).exec(function(err, doc){
				if(err){
					console.log(err);
				}
				else{
					res.send(doc);
				}
			});
		}
	});
});

//Listen on Port 8888
app.listen(process.env.PORT || 8888, function(){
	console.log('App Running on Port 8888');
});


