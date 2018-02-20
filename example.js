var express = require('express');
var cors = require('cors');
var request = require('request');
var app = express();


app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


app.get('/image/', function (req, res) {
	console.log(req.query.search)

	var word = req.query.search;

	var Scraper = require ('./index')
		, google = new Scraper.Google()
		, bing = new Scraper.Bing()
		, pics = new Scraper.Picsearch()
		, yahoo = new Scraper.Yahoo();

	var word = req.query.search;

	yahoo.list({
		keyword: word,
		num: 2,
	}).then(function (res) {
		console.log('results', res);
		return res
	}).then(function (a) {
		res.send(a)
		console.log('first 3 results from bing', a);
	}).catch(function(err) {
		console.log('err',err);
	});

});

app.listen(process.env.PORT || 8000)
console.log('Listening on 8000');
exports = module.exports = app;