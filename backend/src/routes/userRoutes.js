"use strict";
exports.__esModule = true;
var express_1 = require("express");
var authController_1 = require("../controllers/authController");
var router = express_1["default"].Router();
router.get("/getUser", authController_1.getUser);
exports["default"] = router;
