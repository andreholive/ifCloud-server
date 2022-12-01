"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CloudManagerMock_1 = __importDefault(require("./core/tests/CloudManagerMock"));
var DatabaseManagerMock_1 = __importDefault(require("./core/tests/DatabaseManagerMock"));
// import CloudManager from "./core/managers/OpenstackCloudManager";
// import SQLDatabaseManager from "./core/managers/SQLDatabaseManager";
var MainEngine_1 = __importDefault(require("./core/MainEngine"));
var InputDataListener_1 = __importDefault(require("./InputDataListener"));
var CommandManager_1 = __importDefault(require("./core/managers/CommandManager"));
var cloudManager = new CloudManagerMock_1.default();
var databaseManager = new DatabaseManagerMock_1.default();
var commandManager = new CommandManager_1.default();
var mainEngine = new MainEngine_1.default(cloudManager, databaseManager, commandManager);
var inputDataListener = new InputDataListener_1.default(mainEngine);
// database();
inputDataListener.start();
