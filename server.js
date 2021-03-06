//  /******************************************************
//  * PLEASE DO NOT EDIT THIS FILE
//  * the verification process may break
//  * ***************************************************/

'use strict';

var fs = require('fs');
var express = require('express');
var app = express();
var url = require('url');

app.use('/public', express.static(process.cwd() + '/public'));


app.route('/:date').get((req, res) => {
  var dateStr = req.params.date.split('%20').join(' ');
  var date, unixDate, naturalDate;
  if (dateStr >= 0 || dateStr < 0) {
    date = new Date(parseInt(dateStr));
  } else {
    date = new Date(dateStr);
  }
  var locale = 'en-us';
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  if (date == 'Invalid Date') {
    unixDate = null;
    naturalDate = null;
  } else {
    unixDate = date.getTime();
    naturalDate = date.toLocaleDateString(locale, options);
  }
  
  res.json({ unix: unixDate, natural: naturalDate });
});
  
app.route('/')
    .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
    })


app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});


