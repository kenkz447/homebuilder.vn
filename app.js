'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var publicFolder = path.join(__dirname, 'public')

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(express.static(publicFolder));

app.all('/*', function(req, res) {
  res.sendfile('index.html', {root: publicFolder});
})

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});