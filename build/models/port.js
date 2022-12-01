"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = __importDefault(require("sequelize"));
var db_1 = __importDefault(require("../config/db"));
var ServerPortModel_1 = require("../core/core-models/ServerPortModel");
var Port = db_1.default.define('port', {
    id: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    portId: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    status: {
        type: sequelize_1.default.INTEGER,
        defaultValue: 2
    },
    networkId: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    subnetId: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    macAddr: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    fixedIp: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    state: {
        type: sequelize_1.default.STRING,
        defaultValue: ServerPortModel_1.PortState.disconnected
    },
    enabled: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: true
    }
});
exports.default = Port;
