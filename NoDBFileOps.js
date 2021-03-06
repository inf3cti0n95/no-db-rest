"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var NoDBFileOps = (function () {
    function NoDBFileOps(filepath) {
        if (typeof filepath !== "undefined")
            this.filepath = filepath;
        else
            throw new Error("FilePath Undefined");
        var data;
        try {
            data = fs_1.readFileSync(this.filepath);
        }
        catch (error) {
            fs_1.openSync(this.filepath, "w+");
            fs_1.writeFileSync(this.filepath, "[]");
            data = fs_1.readFileSync(this.filepath);
        }
        try {
            this.JSONDataArray = JSON.parse(data.toString());
        }
        catch (error) {
            console.error(error);
        }
    }
    NoDBFileOps.prototype.get = function (queryObject) {
        var _this = this;
        var bufferOfSearchedObjects = [];
        this.JSONDataArray.forEach(function (object) {
            var temp = _this.findKeyValuePairedObjects(object, queryObject);
            if (temp !== null)
                bufferOfSearchedObjects.push(temp);
        });
        if (bufferOfSearchedObjects.length === 0)
            return null;
        else if (bufferOfSearchedObjects.length === 1)
            return bufferOfSearchedObjects[0];
        else
            return bufferOfSearchedObjects;
    };
    NoDBFileOps.prototype.update = function (queryObject, newValue) {
        var _this = this;
        var bufferOfSearchedObjects = [];
        this.JSONDataArray.forEach(function (object) {
            var temp = _this.findKeyValuePairedObjects(object, queryObject);
            if (temp !== null)
                bufferOfSearchedObjects.push(temp);
        });
        this.JSONDataArray = this.JSONDataArray.map(function (jObj) {
            var temp = jObj;
            bufferOfSearchedObjects.forEach(function (object) {
                if (temp === object) {
                    temp = __assign({}, object, newValue);
                }
            });
            return temp;
        });
        try {
            fs_1.writeFileSync(this.filepath, JSON.stringify(this.JSONDataArray));
        }
        catch (error) {
            console.error(error);
            return 0;
        }
        return bufferOfSearchedObjects.length;
    };
    NoDBFileOps.prototype.put = function (queryObject) {
        var bufferOfSearchedObjects = [];
        this.JSONDataArray.push(queryObject);
        try {
            fs_1.writeFileSync(this.filepath, JSON.stringify(this.JSONDataArray));
        }
        catch (error) {
            console.error(error);
            return false;
        }
        return true;
    };
    NoDBFileOps.prototype.delete = function (queryObject) {
        var _this = this;
        var bufferOfSearchedObjects = [];
        var prevLength = this.JSONDataArray.length;
        this.JSONDataArray.forEach(function (object) {
            var temp = _this.findKeyValuePairedObjects(object, queryObject);
            if (temp !== null)
                _this.JSONDataArray = _this.JSONDataArray.filter(function (object) {
                    return object !== temp;
                });
        });
        try {
            fs_1.writeFileSync(this.filepath, JSON.stringify(this.JSONDataArray));
        }
        catch (error) {
            console.error(error);
            return false;
        }
        return prevLength - this.JSONDataArray.length;
    };
    NoDBFileOps.prototype.findKeyValuePairedObjects = function (object, queryObject) {
        var keys = Object.keys(queryObject);
        var flag = true;
        keys.every(function (key) {
            flag = object[key] === queryObject[key];
            return flag;
        });
        if (flag) {
            return object;
        }
        else {
            return null;
        }
    };
    return NoDBFileOps;
}());
exports.default = NoDBFileOps;
