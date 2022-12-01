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
}