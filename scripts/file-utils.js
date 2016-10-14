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
                                if (testRunCount >= 5){ currApp.TestRuns.pop(); } 

                                //add new test run and sort
                                currApp.TestRuns.push(newFile.Servers[0].Applications[0].TestRuns[0]);
                                currApp.TestRuns.sort(function(a, b){ return b.Date - a.Date; });

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

exports.loadDataFilesJson = loadDataFilesJson;
exports.publishTestResultsJson = publishTestResultsJson;
