import { CommandData, DiagramFunction } from "../managers/CommandManager";
import Session from "../Session";
import User from "../core-models/UserModel";

export default class ResponseCommand<M>{
    private user: User;
    private command: DiagramFunction;
    session: Session;
    data: M;
    constructor(commandData:CommandData){
        this.user = commandData.user;
        this.command = commandData.command;
        this.session = commandData.session;
        this.data = commandData.data
    }

    public send(data:M){
        this.session.fireEvent(data, this.session.id, this.command);
        this.user.sendData({action:this.command, data:data});
    }

    public async sendCommand(command:DiagramFunction, data:M){
        await this.session._engine._cmdMngr.execute({user:this.user, command, data, session:this.session});
    }

    public sendToAllUsers(data:M){
        const users = this.session.getUsers();
        this.session.fireEvent(data, this.session.id, this.command);
        for(let id in users){
            this.session.getUsers()[id].sendData({action:this.command, data:data});
        }
    }
}