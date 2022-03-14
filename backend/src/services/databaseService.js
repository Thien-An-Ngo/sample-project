"use strict";
exports.__esModule = true;
exports.db = void 0;
var sqlite3_1 = require("sqlite3");
var path_1 = require("path");
var sqlite3 = sqlite3_1["default"].verbose();
var userTables_1 = require("../sql/userTables");
var db_name = path_1["default"].join(__dirname, "../../data", "database.db");
exports.db = new sqlite3.Database(db_name, function (err) {
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful connection to the database 'database.db'");
});
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    default_1.restartDB = function () {
        exports.db.serialize(function () {
            userTables_1.TABLE_NAMES.forEach(function (name) { return db_delete(name); });
            userTables_1.CREATE_TABLES.forEach(function (stmt) { return db_run(stmt); });
        });
    };
    default_1.startDB = function () {
        exports.db.serialize(function () {
            userTables_1.CREATE_TABLES.forEach(function (stmt) { return db_run(stmt); });
        });
    };
    default_1.get = function (stmt, params) {
        return new Promise(function (res, rej) {
            exports.db.get(stmt, params, function (err, result) {
                if (err) {
                    return rej(err.message);
                }
                return res(result);
            });
        });
    };
    default_1.all = function (stmt, params) {
        return new Promise(function (res, rej) {
            exports.db.all(stmt, params, function (err, result) {
                if (err) {
                    return rej(err.message);
                }
                return res(result);
            });
        });
    };
    default_1.run = function (stmt, params) {
        console.log("DBM running", stmt, params);
        return new Promise(function (res, rej) {
            exports.db.run(stmt, params, function (err, result) {
                if (err) {
                    return rej(err.message);
                }
                return res(result);
            });
        });
    };
    return default_1;
}());
exports["default"] = default_1;
var db_run = function (cmd) {
    exports.db.run(cmd, function (err) {
        if (err) {
            return console.error(err.message);
        }
    });
};
var db_delete = function (table_name) {
    db_run("DROP TABLE IF EXISTS " + table_name);
    console.log("dropped table");
};
