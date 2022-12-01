"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var sequelize = new sequelize_1.Sequelize('ifCloud', 'root', 'gaboardi', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
});
exports.default = sequelize;
