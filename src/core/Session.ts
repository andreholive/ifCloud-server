import { CommandData, DiagramFunction } from "./managers/CommandManager";
import Diagram from "./diagram/Diagram"
import MainEngine, { IOdata } from "./MainEngine";
import User from "./core-models/UserModel";
import DiagramListener from "./diagram/DiagramListener";
import BaseObserver from "./diagram/BaseObserver";

export type UserCommandData = {
    userId: string
    token: string
    sessionId: string
    sendAction: (msg:IOdata) => void;
}

export default class Session extends BaseObserver{
    protected users: {
        [id: string]: User;
    };
    private diagram:Diagram;
    id: string;
    monitorEnabled: boolean;
    constructor(private readonly engine:MainEngine, id:string){
        super()
        this.users = {};
        this.id = id;
        this.diagram = new Diagram(this);
        this.monitorEnabled = false;
        this.registerListener(new DiagramListener(this.diagram));
    }

    public get _engine():MainEngine {
        return this.engine;
    }
    
    public get _diagram():Diagram {
        return this.diagram;
    }
    
    private async getInstanceStatus():Promise<void>{
        if(this.monitorEnabled){
            const user = Object.values(this.users).find(user => user.sessionId === this.id);
            if(user){
                const data:CommandData = {
                    command: DiagramFunction.getInstanceStatus,
                    data: null,
                    user,
                    session: this
                }
                await this.engine._cmdMngr.execute(data);
            }
            setTimeout(async ()=> {
                await this.getInstanceStatus();
            },1000);
        }
    }

    public async startMonitor():Promise<boolean>{
        this.monitorEnabled = true;
        await this.getInstanceStatus();
        return true;
    }

    public getUsers = () => this.users;

    public getUser = (userId:string) => this.users[userId];

    public deregisterUser = (userId:string) => {
        delete this.users[userId];
        if(Object.keys(this.users).length == 0){
            this.engine.deregisterSession(this.id);
            this.monitorEnabled = false;
        }
    };

    public registerUser = (userCommandData:UserCommandData) => {
        if(!this.users[userCommandData.userId]){
            const user = new User(userCommandData);
            this.users[userCommandData.userId] = user;
            if(!this.monitorEnabled){
                this.startMonitor();
            }
        }
    }

}