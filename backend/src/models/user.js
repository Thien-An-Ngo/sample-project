"use strict";
exports.__esModule = true;
var uuid_1 = require("uuid");
var default_1 = /** @class */ (function () {
    function default_1(username, password, name, surname, id) {
        this.id = id || uuid_1.v4();
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
    }
    return default_1;
}());
exports["default"] = default_1;
