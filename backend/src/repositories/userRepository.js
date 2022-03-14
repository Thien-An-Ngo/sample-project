"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var databaseService_1 = require("../services/databaseService");
var bcrypt_1 = require("bcrypt");
var dotenv_1 = require("dotenv");
dotenv_1["default"].config({ path: "../../.env" });
var saltRounds = parseInt(process.env.SALT_ROUNDS);
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    default_1.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, databaseService_1["default"].all("SELECT * FROM User", [])];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                }
            });
        });
    };
    default_1.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, databaseService_1["default"].get("SELECT * FROM User WHERE id = $id", { $id: id })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    default_1.getUserByUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, databaseService_1["default"].get("SELECT * FROM User WHERE username = $username", {
                            $username: username
                        })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    default_1.add = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt_1["default"].hash(user.password, saltRounds, function (err, hash) {
                            return __awaiter(this, void 0, void 0, function () {
                                var stmt, ex_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (err) {
                                                return [2 /*return*/, false];
                                            }
                                            stmt = "INSERT INTO User(id,username,name,surname,password) VALUES($id,$username,$name,$surname,$password)";
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 3, , 4]);
                                            return [4 /*yield*/, databaseService_1["default"].run(stmt, {
                                                    $id: user.id,
                                                    $username: user.username,
                                                    $name: user.name,
                                                    $surname: user.surname,
                                                    $password: hash
                                                })];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/, true];
                                        case 3:
                                            ex_1 = _a.sent();
                                            console.error(ex_1);
                                            return [2 /*return*/, false];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            });
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    default_1.exists = function (column, value) {
        return __awaiter(this, void 0, void 0, function () {
            var res, doesExist, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, databaseService_1["default"].get("SELECT EXISTS(SELECT 1 FROM User WHERE " + column + " = $value)", { $value: value })];
                    case 1:
                        res = _a.sent();
                        for (key in res) {
                            doesExist = res[key];
                        }
                        return [2 /*return*/, doesExist === 1];
                }
            });
        });
    };
    default_1.updateUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var stmt, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stmt = "\n\t\t\tUPDATE User SET \n\t\t\t\tusername = $username,\n\t\t\t    name = $name,\n\t\t\t\tsurname = $surname\n\t\t\tWHERE id = $id\n\t\t";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, databaseService_1["default"].run(stmt, {
                                $id: user.id,
                                $username: user.username,
                                $name: user.name,
                                $surname: user.surname
                            })];
                    case 2:
                        _a.sent();
                        console.log("Updating User");
                        return [2 /*return*/, true];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, false];
                }
            });
        });
    };
    default_1["delete"] = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var stmt, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stmt = "DELETE FROM User WHERE id = $id";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, databaseService_1["default"].run(stmt, { $id: userId })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 3:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return default_1;
}());
exports["default"] = default_1;
