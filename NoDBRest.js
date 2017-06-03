"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NoDBFileOps_1 = require("./NoDBFileOps");
function NoDBRest(filepath) {
    return function (request, response, next) {
        var fileOps = new NoDBFileOps_1.default(filepath);
        switch (request.method) {
            case "GET":
                getRequest(fileOps, request, response);
                break;
            case "POST":
                postRequest(fileOps, request, response);
                break;
            case "DELETE":
                deleteRequest(fileOps, request, response);
                break;
            case "PUT":
                putRequest(fileOps, request, response);
                break;
        }
        next();
    };
}
exports.NoDBRest = NoDBRest;
function getRequest(fileOps, request, response) {
    response.send(JSON.stringify(fileOps.get(request.query)));
    console.log("Data Fetched from " + fileOps.filepath + " and served response");
}
function postRequest(fileOps, request, response) {
    var resp = fileOps.put(request.query);
    if (resp)
        console.log("Data inserted to " + fileOps.filepath + " and served response");
    else
        console.log("Data not inserted to " + fileOps.filepath);
    response.send(JSON.stringify(resp));
}
function putRequest(fileOps, request, response) {
    var query = request.query.search;
    var searchParams = query.split(",");
    var queryObject = new Object();
    searchParams.forEach(function (p) {
        var key = p.split("=")[0];
        var val = p.split("=")[1];
        if (/^\d+$/.test(val) || val === "true" || val === "false")
            val = eval(val);
        queryObject[key] = val;
    });
    var update = request.query.update;
    var updateParams = update.split(",");
    var updateObject = new Object();
    updateParams.forEach(function (p) {
        var key = p.split("=")[0];
        var val = p.split("=")[1];
        if (/^\d+$/.test(val) || val === "true" || val === "false")
            val = eval(val);
        updateObject[key] = val;
    });
    var resp = fileOps.update(queryObject, updateObject);
    response.send(JSON.stringify(resp));
    console.log("Data updated at " + resp + " places in " + fileOps.filepath + " and served response");
}
function deleteRequest(fileOps, request, response) {
    var resp = fileOps.delete(request.query);
    response.send(JSON.stringify(resp));
    console.log("Data deleted at " + resp + " places in " + fileOps.filepath + " and served response");
}
