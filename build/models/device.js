"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = __importDefault(require("sequelize"));
var db_1 = __importDefault(require("../config/db"));
var port_1 = __importDefault(require("./port"));
var Device = db_1.default.define('device', {
    id: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    type: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    device: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    instanceId: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    projectId: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.default.INTEGER,
        defaultValue: 2
    },
    locked: {
        type: sequelize_1.default.BOOLEAN,
        defaultValue: false
    },
    x: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    y: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
});
Device.hasMany(port_1.default, {
    foreignKey: 'deviceId',
    onDelete: 'CASCADE',
});
port_1.default.belongsTo(Device);
exports.default = Device;
