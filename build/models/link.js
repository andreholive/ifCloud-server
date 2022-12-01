"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = __importDefault(require("sequelize"));
var db_1 = __importDefault(require("../config/db"));
var Link = db_1.default.define('link', {
    id: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        primaryKey: true
    },
    source: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    target: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    sourcePort: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    targetPort: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    sourceLabel: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    targetLabel: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    networkId: {
        type: sequelize_1.default.STRING,
        allowNull: true
    },
    projectId: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.default = Link;
