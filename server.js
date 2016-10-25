var http = require('http');
var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs');
var app = express();

var fileUtils = require('./scripts/file-utils');
var _dataPath = __dirname + '\\data';
var _jsonFiles = fileUtils.loadDataFilesJson(_dataPath); //on app start get data

var server = http.createServer(app);

//======================================================
// Routes
//======================================================

//------------------------------------------------------
// Static Routes
//------------------------------------------------------
app.use('/',express.static(__dirname + '/'));
app.use('/app',express.static(__dirname + '/app'));
app.use('/css',express.static(__dirname + '/assets/css'));
app.use('/fonts',express.static(__dirname + '/assets/fonts'));
app.use('/images',express.static(__dirname + '/assets/images'));
app.use('/modules',express.static(__dirname + '/node_modules'));
app.use('/js',express.static(__dirname + '/scripts'));
app.use(bodyParser.json());


//------------------------------------------------------
// API Routes
//------------------------------------------------------
app.get('/getEnvironments/:refreshCache?', function(req, res){
    debugger;
    var envs = [];
    try{
        var refreshCache = (req.params.refreshCache && req.params.refreshCache === 'true')? true : false;
        if(refreshCache){
            _jsonFiles = fileUtils.loadDataFilesJson(_dataPath);
        }

        envs = fileUtils.getEnvironments(_jsonFiles);
        var data = { data: envs };
        res.status(200).json(data);

    } catch(ex) {
        res.status(400).send({ 
            "success" : false,
            "error" : ex.message
        });
    }
});

app.get('/getTestResultsByServer/:envName/:srvName', function(req, res){
    var server = {};
    for(var i = 0; i < _jsonFiles.length; i++){
        var thisEnv = _jsonFiles[i];
        if(thisEnv.Name !== req.params.envName){ continue; }

        var servers = thisEnv.Servers;
        for(var s = 0; s < servers.length; s++){
            var thisServer = servers[s];
            if(thisServer.Name !== req.params.srvName){ continue; }

            server = thisServer;
            break;
        }   
    }
    var data = { data: server };
    res.status(200).json(data);
});

app.post('/publishTestResults', function(req, res){
    try{
        if(!req.body.data){ throw "Invalid json 'data' object."; }
        
        var jsonToPublish = req.body.data;
        fileUtils.publishTestResultsJson(
            _jsonFiles, 
            jsonToPublish.ResultsFileName,
            _dataPath,
            jsonToPublish,
            'utf-8',
            function(err){
                if(err){ throw err; }
                _jsonFiles = fileUtils.loadDataFilesJson(_dataPath); //update/reset cache
                res.status(200).send({ "success" : true });
            }
        );

    } catch(ex){
        res.status(400).send({ 
            "success" : false,
            "error" : ex.message
        });
    }
});

//------------------------------------------------------
// Resource Routes
//------------------------------------------------------
app.get(["/", "/results", "/results/:enviromentName/:serverName"], function(req,res){
    res.sendFile(__dirname + '/index.html');
});


server.listen(3000, function(){
    console.log('Server is listening on port 3000');
});