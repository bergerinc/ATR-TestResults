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
app.use('/css',express.static(__dirname + '/assets/css'));
app.use('/fonts',express.static(__dirname + '/assets/fonts'));
app.use('/images',express.static(__dirname + '/assets/images'));
app.use('/modules',express.static(__dirname + '/node_modules'));
app.use('/js',express.static(__dirname + '/scripts'));
app.use(bodyParser.json());


//------------------------------------------------------
// Resource Routes
//------------------------------------------------------
app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

//------------------------------------------------------
// API Routes
//------------------------------------------------------
app.get('/getTestResults', function(req, res){
    res.status(200).json(_jsonFiles);
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


server.listen(3000, function(){
    console.log('Server is listening on port 3000');
});