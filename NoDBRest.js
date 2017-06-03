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
}
function postRequest(fileOps, request, response) {
    response.send(JSON.stringify(fileOps.put(request.query)));
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
    response.send(JSON.stringify(fileOps.update(queryObject, updateObject)));
}
function deleteRequest(fileOps, request, response) {
    response.send(JSON.stringify(fileOps.delete(request.query)));
}
