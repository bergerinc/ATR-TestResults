var fs = require('fs');
var path = require('path');

/// <summary>
/// loadDataFilesJson
/// Builds array of json objects by reading json 
/// files from the data directory synchronously.
/// This is done sync so the files are updated fully before use.
/// </summary>
/// <params name="fileDir">system path to data directory</param> 
/// <returns>array of json objects</returns> 
var loadDataFilesJson = function(fileDir){
    try{
        var fileList = [];
        var files = fs.readdirSync(fileDir);
        if(files === undefined){ return; }

        for(var i = 0; i < files.length; i++){
            var json = readJsonFile(fileDir + '\\' + files[i]);
            if(json === undefined){ continue; } //skip if file was not processed as valid json
            fileList.push(json);
        }

        return fileList;

    } catch(ex){
        console.log(ex);
    }
};

/// <summary>
/// loadDashboardResultsJson
/// Builds array of json objects by parsing the published test results 
/// </summary>
/// <params name="jsonFiles">array of published test results</param> 
/// <returns>array of dashboard result objects</returns> 
var loadDashboardResultsJson = function(jsonFiles){
    try{
        var dashboardResults = {};
        dashboardResults = buildDashboardResultsJson(jsonFiles);
        return dashboardResults;

    } catch(ex){
        console.log(ex);
    }
};

/// <summary>
/// publishTestResultsJson
/// Saves json content to the file system.
/// If the file already exists, it will merge the new data into the existing file
/// </summary>
/// <params name="currentFiles">array of current data (json) files in the directory</param> 
/// <params name="fileName">name of the new file</param>
/// <params name="filePath">system path to data directory</param>
/// <params name="jsonData">json content for the new file</param>
/// <params name="encoding">encoding</param>
/// <params name="callback">function to execute after the write is finished</param>
/// <returns></returns> 
var publishTestResultsJson = function(currentFiles, fileName, filePath, jsonData, encoding, callback){
    try {
        var fullPath = filePath + '\\' + fileName + '.json';

        if (currentFiles.Length === 0 || !fs.existsSync(fullPath)){
            writeJsonFile(fileName, filePath, jsonData, encoding, callback);
        }
        else{
            var finalFile = buildResultsFileJson(jsonData, currentFiles);
            writeJsonFile(fileName, filePath, finalFile, encoding, callback);
        }

    } catch (ex) {
        throw ex;
    }
};

/// <summary>
/// writeJsonFile
/// Writes json file to file system
/// </summary>
/// <params name="fileName">name of file to write</param> 
/// <params name="filePath">system path of the directory where to write the file</param> 
/// <params name="jsonData">raw json data to include in file</param> 
/// <params name="encoding">file encoding (defaults to utf-8)</param> 
/// <params name="callback">callback function to execute after write has completed</param> 
/// <returns></returns> 
var writeJsonFile = function(fileName, filePath, jsonData, encoding, callback){
    fs.writeFile(
        filePath + '\\' + fileName + '.json', 
        JSON.stringify(jsonData),
        encoding, 
        callback
    );
};

/// <summary>
/// readJsonFile
/// Reads json file from file system
/// </summary>
/// <params name="f">name of file to read</param> 
/// <returns>json object</returns> 
var readJsonFile = function(f){
    var json;

    try {
        if(path.extname(f).toLowerCase() !== '.json'){ return; }
        json =  JSON.parse(fs.readFileSync(f,'utf-8'));

    } catch(ex){ 
        console.log(ex); 
    }

    return json;
};

/// <summary>
/// buildResultsFileJson
/// Reads existing json file from file system and appends/inserts json data
/// </summary>
/// <params name="f">name of file to read</param> 
/// <returns>json object</returns> 
var buildResultsFileJson = function(newFile, resultFiles){
    try {
        //loop through test result files
        for(var i = 0; i < resultFiles.length; i++){

            var currentFile = resultFiles[i];
            var isNewServer = true;

            if(currentFile.Name.toLowerCase() === newFile.Name.toLowerCase()){
                
                //loop through servers
                for(var s = 0; s < currentFile.Servers.length; s++){
                    var currServer = currentFile.Servers[s];
                    if (currServer.Name.toLowerCase() == newFile.Servers[0].Name.toLowerCase())
                    {
                        isNewServer = false;
                        var isNewApp = true;

                        //loop through Applications
                        for (var a = 0; a < currServer.Applications.length; a++) {
                            
                            var currApp = currServer.Applications[a];
                            if (currApp.Name.toLowerCase() == newFile.Servers[0].Applications[0].Name.toLowerCase()) {
                                
                                isNewApp = false;
                                var testRunCount = currApp.TestRuns.length;
                                
                                //crop array if adding this item will exceed max length
                                currApp.TestRuns.sort(function(a, b){ return Date.parse(b.Date) - Date.parse(a.Date); });
                                if (testRunCount >= 5){ currApp.TestRuns.pop(); } 

                                //add new test run and sort
                                currApp.TestRuns.push(newFile.Servers[0].Applications[0].TestRuns[0]);
                                currApp.TestRuns.sort(function(a, b){ return Date.parse(b.Date) - Date.parse(a.Date); });

                                return currentFile;
                            }
                        }

                        if(isNewApp){
                            currServer.Applications.push(newFile.Servers[0].Applications[0]);
                            return currentFile;
                        }
                    }
                }

                if (isNewServer){
                    currentFile.Servers.push(newFile.Servers[0]);
                    return currentFile;
                }
            }
        }

    } catch(ex){
        console.log(ex);
    }
};

/// <summary>
/// buildResultsFileJson
/// Reads existing json file from file system and appends/inserts json data
/// </summary>
/// <params name="f">name of file to read</param> 
/// <returns>json object</returns> 
var buildDashboardResultsJson = function(jsonFiles){
    try {

        var overallResults = new OverallSummary();
        var envResults = [];
        var srvResults = [];
        var appResults = [];

        //loop through test results
        for(var i = 0; i < jsonFiles.length; i++){
            var envData = jsonFiles[i];
            var byEnv = new TestEnvironment();
            var tempServers = [];
            
            //loop through servers
            for(var s = 0; s < envData.Servers.length; s++){
                var srvData = envData.Servers[s];
                var byServer = new TestServer();
                var tempApps = [];

                //loop through applications
                for(var a = 0; a < srvData.Applications.length; a++){
                    var appData = srvData.Applications[a];
                    var byApp = new TestApplication();
                    var thisTestRuns = appData.TestRuns;

                    //update totals
                    byApp.ApplicationName = appData.Name;
                    byApp.ServerName = srvData.Name;
                    byApp.EnvironmentName = envData.Name;
                    for(var thisRun of thisTestRuns){
                        var timeStamp = parseTimeStamp(thisRun.Duration);
                        var dt = addTimeStamp(timeStamp, byApp.TotalDuration);
                        byApp.TotalDuration.Hours = dt.Hours;
                        byApp.TotalDuration.Minutes = dt.Minutes;
                        byApp.TotalDuration.Seconds = dt.Seconds;
                        byApp.TotalFailedScenarios += thisRun.ScenariosFailed;
                        byApp.TotalPassedScenarios += thisRun.ScenariosPassed;
                        byApp.TotalScenarios += thisRun.ScenarioCount;
                        byApp.TotalTestRuns = appData.TestRuns.length;
                    }
                    
                    appResults.push(byApp);
                    tempApps.push(byApp);
                }

                //update server totals
                byServer.ServerName = srvData.Name;
                byServer.EnvironmentName = envData.Name;
                for(var thisApp of tempApps){
                    var dtApp = addTimeStamp(thisApp.TotalDuration, byServer.TotalDuration);
                    byServer.TotalDuration.Hours = dtApp.Hours;
                    byServer.TotalDuration.Minutes = dtApp.Minutes;
                    byServer.TotalDuration.Seconds = dtApp.Seconds;
                    byServer.TotalFailedScenarios += thisApp.TotalFailedScenarios;
                    byServer.TotalPassedScenarios += thisApp.TotalPassedScenarios;
                    byServer.TotalScenarios += thisApp.TotalScenarios;
                    byServer.TotalTestRuns += thisApp.TotalTestRuns;
                }
                srvResults.push(byServer);
                tempServers.push(byServer);
            }

            //update environment totals
            byEnv.EnvironmentName = envData.Name;
            for(var thisServer of tempServers){
                var dtEnv = addTimeStamp(thisServer.TotalDuration, byEnv.TotalDuration);
                byEnv.TotalDuration.Hours = dtEnv.Hours;
                byEnv.TotalDuration.Minutes = dtEnv.Minutes;
                byEnv.TotalDuration.Seconds = dtEnv.Seconds;
                byEnv.TotalFailedScenarios += thisServer.TotalFailedScenarios;
                byEnv.TotalPassedScenarios += thisServer.TotalPassedScenarios;
                byEnv.TotalScenarios += thisServer.TotalScenarios;
                byEnv.TotalTestRuns += thisServer.TotalTestRuns;
            }
            envResults.push(byEnv);
        
        }

        for(var res of envResults){
            var dtOvr = addTimeStamp(res.TotalDuration, overallResults.TotalDuration);
            overallResults.TotalDuration.Hours = dtOvr.Hours;
            overallResults.TotalDuration.Minutes = dtOvr.Minutes;
            overallResults.TotalDuration.Seconds = dtOvr.Seconds;
            overallResults.TotalFailedScenarios += res.TotalFailedScenarios;
            overallResults.TotalPassedScenarios += res.TotalPassedScenarios;
            overallResults.TotalScenarios += res.TotalScenarios;
            overallResults.TotalTestRuns += res.TotalTestRuns;
        }

        return {
            OverallResults: overallResults,
            ResultsByEnvironment: envResults,
            ResultsByServer: srvResults,
            ResultsByApplication: appResults,
        };

    } catch(ex){
        console.log(ex);
    }
};

/// <summary>
/// addTimeStamp
/// Adds two timestamps together
/// </summary>
/// <params name="currentDuration">timespan to add</param> 
/// <params name="totalDuration">timespan total</param> 
/// <returns>TestDuration object</returns> 
var addTimeStamp = function(currentDuration, totalDuration){
    var td = new TestDuration();
    var dt = new Date();

    //set defaults
    currentDuration = (!currentDuration) ? td : currentDuration;
    currentDuration.Hours = (!currentDuration.Hours) ? 0 : currentDuration.Hours;
    currentDuration.Minutes = (!currentDuration.Minutes) ? 0 : currentDuration.Minutes;
    currentDuration.Seconds = (!currentDuration.Seconds) ? 0 : currentDuration.Seconds;
    totalDuration = (!totalDuration) ? td : totalDuration;
    totalDuration.Hours = (!totalDuration.Hours) ? 0 : totalDuration.Hours;
    totalDuration.Minutes = (!totalDuration.Minutes) ? 0 : totalDuration.Minutes;
    totalDuration.Seconds = (!totalDuration.Seconds) ? 0 : totalDuration.Seconds;

    //set values
    dt.setHours(currentDuration.Hours + totalDuration.Hours);
    dt.setMinutes(currentDuration.Minutes + totalDuration.Minutes);
    dt.setSeconds(currentDuration.Seconds + totalDuration.Seconds);
    td.Hours = dt.getHours();
    td.Minutes = dt.getMinutes();
    td.Seconds = dt.getSeconds();
    return td;
};

/// <summary>
/// parseTimeStamp
/// Parses a string in to a timestamp
/// </summary>
/// <params name="strDuration">timespan as a string</param> 
/// <returns>TestDuration object</returns> 
var parseTimeStamp = function(strDuration) {
    var timeStamp = strDuration.split(':');
                        
    var newDt = new Date();
    newDt.setHours(timeStamp[0]);
    newDt.setMinutes(timeStamp[1]);
    newDt.setSeconds(timeStamp[2]);

    var newTs = new TestDuration();
    newTs.Hours = newDt.getHours();
    newTs.Minutes = newDt.getMinutes();
    newTs.Seconds = newDt.getSeconds();

    return newTs;
};

/// <summary>
/// getEnvironments
/// Reads existing json file from file system and creates 
/// an array of environments and servers
/// </summary>
/// <params name="jsonFiles">array of published test results</param> 
/// <returns>array of environments and servers</returns> 
var getEnvironments = function(jsonFiles){
    var envs = [];
    for(var i = 0; i < jsonFiles.length; i++){
        var thisEnv = jsonFiles[i];
        var env = {
            Name: thisEnv.Name,
            Servers: []
        };
        var servers = thisEnv.Servers;
        for(var s = 0; s < servers.length; s++){
            env.Servers.push({ Name: servers[s].Name });
        }
        
        envs.push(env);
    }
    return envs;
};

/// <summary>
/// getEnvironmentDashboardResults
/// Reads existing json file from file system and creates 
/// an summary of results by environment
/// </summary>
/// <params name="jsonFiles">array of published test results</param> 
/// <returns>an object of summary results by environment</returns> 
var getEnvironmentDashboardResults = function(dashboardResultsJson){
    return dashboardResultsJson.ResultsByEnvironment;
};

/// <summary>
/// getServerDashboardResults
/// Reads existing json file from file system and creates 
/// an summary of results by server
/// </summary>
/// <params name="jsonFiles">array of published test results</param> 
/// <returns>an object of summary results by server</returns> 
var getServerDashboardResults = function(dashboardResultsJson){
    return dashboardResultsJson.ResultsByServer;
};

/// <summary>
/// getApplicationDashboardResults
/// Reads existing json file from file system and creates 
/// an summary of results by application
/// </summary>
/// <params name="jsonFiles">array of published test results</param> 
/// <returns>an object of summary results by application</returns> 
var getApplicationDashboardResults = function(dashboardResultsJson){
    var results = dashboardResultsJson.ResultsByApplication;
    var appResults = [];
    for(let i = 0; i < results.length; i++) {
        let app = results[i];
        let existingApp = appResults.find(x => x.ApplicationName === app.ApplicationName);
        if(existingApp){ 
            let newTestDuration = addTimeStamp(app.TotalDuration, existingApp.TotalDuration);
            existingApp.TotalDuration = newTestDuration;
            existingApp.TotalFailedScenarios += app.TotalFailedScenarios;
            existingApp.TotalPassedScenarios += app.TotalPassedScenarios;
            existingApp.TotalScenarios += app.TotalScenarios; 
            existingApp.TotalTestRuns += app.TotalTestRuns; 
            existingApp.ServerName += ', ' + app.ServerName;
            existingApp.EnvironmentName += ', ' + app.EnvironmentName;
            results.splice(i, 1);
        }else{
            appResults.push(app);
        }
        
    }
    return appResults;
};

/// <summary>
/// getOverallDashboardResults
/// Reads existing json file from file system and creates 
/// an summary of overall metrics
/// </summary>
/// <params name="jsonFiles">array of published test results</param> 
/// <returns>an object of overall metrics</returns> 
var getOverallDashboardResults = function(dashboardResultsJson){
    return dashboardResultsJson.OverallResults;
};

// models
var OverallSummary = function() {
    this.TotalScenarios = 0;
    this.TotalFailedScenarios = 0;
    this.TotalPassedScenarios = 0;
    this.TotalDuration = new TestDuration();
    this.TotalTestRuns = 0;
};

var TestEnvironment = function() {
    this.EnvironmentName = '';
    this.TotalScenarios = 0;
    this.TotalFailedScenarios = 0;
    this.TotalPassedScenarios = 0;
    this.TotalDuration = new TestDuration();
    this.TotalTestRuns = 0;
};

var TestServer = function() {
    this.ServerName = '';
    this.EnvironmentName = '';
    this.TotalScenarios = 0;
    this.TotalFailedScenarios = 0;
    this.TotalPassedScenarios = 0;
    this.TotalDuration = new TestDuration();
    this.TotalTestRuns = 0;
};

var TestApplication = function() {
    this.ApplicationName = '';
    this.ServerName = '';
    this.EnvironmentName = '';
    this.TotalScenarios = 0;
    this.TotalFailedScenarios = 0;
    this.TotalPassedScenarios = 0;
    this.TotalDuration = new TestDuration();
    this.TotalTestRuns = 0;
};

var TestDuration = function() {
    this.Hours = 0;
    this.Minutes = 0;
    this.Seconds = 0;
};

exports.loadDataFilesJson = loadDataFilesJson;
exports.loadDashboardResultsJson = loadDashboardResultsJson;
exports.publishTestResultsJson = publishTestResultsJson;
exports.getEnvironments = getEnvironments;
exports.getEnvironmentDashboardResults = getEnvironmentDashboardResults;
exports.getServerDashboardResults = getServerDashboardResults;
exports.getApplicationDashboardResults = getApplicationDashboardResults;
exports.getOverallDashboardResults = getOverallDashboardResults;
