import CommandManager, { DiagramFunction } from "./managers/CommandManager";
import Session, { UserCommandData } from "./Session";
import CloudManager from "../interfaces/CloudManager";
import DatabaseManager from "../interfaces/DatabaseManager";
import User from "./core-models/UserModel";
import OpenstackCloudManager from "./managers/OpenstackCloudManager";

export type IOdata = {
    action: DiagramFunction
    data: any
}

export type RequestData = {
    sessionId: string
    userId: string,
    data: any,
    requestCommand: DiagramFunction
}

export type RequestCommandData = {
    command:DiagramFunction
    data: any,
    session: Session,
    user: User
}

export default class MainEngine{
    private sessions: {
        [id: string]: Session;
    };

    constructor(
        private readonly cloudManager: CloudManager, 
        private readonly databaseManager:DatabaseManager,
        private readonly commandManager:CommandManager
        ){
        this.sessions = {};
    }
    
    public get _cloudMngr():CloudManager {
        return this.cloudManager;
    }

    public get _databaseMngr():DatabaseManager {
        return this.databaseManager;
    }
    
    public get _cmdMngr(): CommandManager {
        return this.commandManager;
    }

 
    public async executeCommand(data:RequestData){
        const session = this.getSession(data.sessionId);
        const request:RequestCommandData = {
            command:data.requestCommand,
            data: data.data,
            session: session,
            user: session.getUser(data.userId)
        }
        await this._cmdMngr.execute(request);
    }

    public createNewSession = (userData:UserCommandData) => {
        this.registerSession(userData);
        this.getSession(userData.sessionId).registerUser(userData);
    }

    private registerSession = (userData:UserCommandData) => {
        if(!this.sessions[userData.sessionId]){
            this.sessions[userData.sessionId] = new Session(this, userData.sessionId);
        }
    };

    public deregisterSession(id:string){
        if(this.sessions[id]){
            delete this.sessions[id];
        }
    }

    public getSession = (id:string):Session => {
        return this.sessions[id]
    };
}