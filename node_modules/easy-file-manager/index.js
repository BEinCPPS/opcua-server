var mkdirp = require('mkdirp'),
    fs = require('fs'),
    async = require('async'),
    BASE_DIR = process.env.PWD,
    sprintf = require('sprintf-js').sprintf;

exports.upload = function upload(path, fileName, data, callback) {
    path = sprintf("%s%s", BASE_DIR, path);
    console.log(path);
    async.series([
            function checkPathExist(callback) {
                fs.stat(path, function(err, stat) {
                    if (err) {
                        mkdirp(path, function(err) {
                            if (err) return callback(err);
                            console.log("Directory Created");
                            callback(null);
                        });
                    } else {
                        callback(null);
                    }

                });
            },
            function saveFile(callback) {
                var fileDir = sprintf("%s/%s", path, fileName);
                console.log(fileDir);
                fs.writeFile(fileDir, data, 'base64', function(err) {
                    if (err) return callback(err);
                    console.log(sprintf("Success save file to path %s", fileDir));
                    callback(null);
                });

            }
        ],
        function done(err, result) {
            callback(err);
        });
};

exports.remove = function remove(path, fileName, callback) {
    path = sprintf("%s%s/%s", BASE_DIR, path, fileName);
    fs.exists(path, function(exists) {
        if (exists) {
            //Show in green
            fs.unlinkSync(path);
            callback(true);
        } else {
            callback("File not exist");
        }
    });
};