import database from "./database";


import CloudManager from "./core/tests/CloudManagerMock";
import SQLDatabaseManager from "./core/tests/DatabaseManagerMock";


// import CloudManager from "./core/managers/OpenstackCloudManager";
// import SQLDatabaseManager from "./core/managers/SQLDatabaseManager";

import MainEngine from "./core/MainEngine";
import InputDataListener from "./InputDataListener";
import CommandManager from "./core/managers/CommandManager";

const cloudManager = new CloudManager();
const databaseManager = new SQLDatabaseManager();

const commandManager = new CommandManager()
const mainEngine = new MainEngine(cloudManager, databaseManager, commandManager);
const inputDataListener = new InputDataListener(mainEngine);


// database();

inputDataListener.start();