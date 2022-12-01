import Command from "./Command";
import { CommandData, DiagramFunction } from "../managers/CommandManager";
import ResponseCommand from "./ResponseCommand";
import { Port } from "../diagram/Diagram";
import TokenExpired from "../errors/TokenExpired";
import ServerPortModel from "../core-models/ServerPortModel";
import Error404 from "../errors/Error404";

export default class DisconnectPort extends Command<ServerPortModel>{
    private response: ResponseCommand<Port>;
    
    constructor(commandData:CommandData){
        super(commandData);
        this.response = new ResponseCommand<Port>(commandData);
        this.function = async () => {
            try {
                await this.engine._cloudMngr.disconnectDevice(this.data, this.user);
                this.data.removeGateway();
                await this.engine._databaseMngr.updatePortState(this.data.getPortData());
                this.response.send(this.data.getPortData());
            } catch (error) {
                if(error instanceof Error404){
                    throw error;
                }
                if(error instanceof TokenExpired){
                    this.response.sendCommand(DiagramFunction.gotoLogin, this.data);
                }
            }
        }
    }

}