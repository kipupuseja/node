#!/usr/bin/env node

var express = require('express');
var port = process.argv[2] || 8080;
var ip = process.argv[3] || '127.0.0.1';
var app = express();
var request = require('request');

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res, next) {
  res.render('index', { title: 'A test app', node_version: process.version });
});

app.get('/http/daocloud/restart/:appid/:token',function(req, res){
    var appid = req.params.appid;
    var token = req.params.token;
    request({
        method: 'POST',
        url:"https://openapi.daocloud.io/v1/apps/"+ appid +"/actions/restart",
        headers: {"Authorization": token}}, 
        function (error, response, body) {
            if(error)
                res.send(error);
            else
                res.send(body);
    });
});

app.listen(port, ip, function () {
  console.log('nodejs ' + process.version + ' server listening on ' + ip + ':' + port);
});
