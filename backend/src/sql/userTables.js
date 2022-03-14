"use strict";
exports.__esModule = true;
exports.TABLE_NAMES = exports.CREATE_TABLES = void 0;
exports.CREATE_TABLES = [
    "CREATE TABLE IF NOT EXISTS User(\n        id VARCHAR(128) PRIMARY KEY,\n        username VARCHAR(64) NOT NULL UNIQUE,\n        name VARCHAR(64) NOT NULL,\n        surname VARCHAR(64) NOT NULL,\n        password VARCHAR(64) NOT NULL\n\t )",
    "CREATE INDEX IF NOT EXISTS idx_user_username ON User(username)"
];
exports.TABLE_NAMES = ['User'];
