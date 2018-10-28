var express = require('express');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var path = require('path');
var url = require('url')
// Init App
var app = express();
var http = require('http').Server(app);

var routes = require('./routes/index');
  // BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
// Set Static Folder


// Global Vars
app.use(function (req, res, next) {
    next();
});
app.use('/', routes);
          // Set Port
app.set('port', (process.env.PORT || 8000));
http.listen(app.get('port'), function(){
  console.log('Server started on port '+app.get('port'));
});
