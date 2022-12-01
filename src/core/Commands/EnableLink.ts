import Command from "./Command";
import { CommandData, DiagramFunction } from "../managers/CommandManager";
import { Link } from "../diagram/Diagram";
import ResponseCommand from "./ResponseCommand";
import TokenExpired from "../errors/TokenExpired";
import ServerPortModel from "../core-models/ServerPortModel";
import RouterPortModel from "../core-models/RouterPortModel";
import SwitchPortModel from "../core-models/SwitchPortModel";

export default class EnableLink extends Command<Link>{
    private response: ResponseCommand<Link>;
    
    constructor(commandData:CommandData){
        super(commandData);
        this.response = new ResponseCommand<Link>(commandData);
        this.function = async () => {
            try {
                const link = this.diagram.getLink(this.data);
                const {sourcePort, targetPort} = link.getLinkModels();
                const serverPort = this.detectServerPort(sourcePort, targetPort);
                if(serverPort){
                    await this.engine._cloudMngr.enablePort(serverPort.getPortData(), this.user);
                    this.response.send(this.data);
                    await this.engine._databaseMngr.updatePortState(serverPort.getPortData());
                }
            } catch (error) {
                if(error instanceof TokenExpired){
                    this.response.sendCommand(DiagramFunction.gotoLogin, this.data);
                }
            }
        }
    }

    private detectServerPort(sourcePort:RouterPortModel | SwitchPortModel | ServerPortModel, 
        targetPort:RouterPortModel | SwitchPortModel | ServerPortModel){
        if(sourcePort instanceof ServerPortModel){
            return sourcePort;
        }
        if(targetPort instanceof ServerPortModel){
            return targetPort;
        }
        return false;
    }

}