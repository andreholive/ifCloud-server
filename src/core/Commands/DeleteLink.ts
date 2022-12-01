import Command from "./Command";
import { CommandData, DiagramFunction } from "../managers/CommandManager";
import ResponseCommand from "./ResponseCommand";
import { Link } from "../diagram/Diagram";
import ServerPortModel, { PortState } from "../core-models/ServerPortModel";
import RouterPortModel from "../core-models/RouterPortModel";
import SwitchPortModel from "../core-models/SwitchPortModel";
import LinkModel from "../core-models/LinkModel";
import NoGatewayError from "../errors/NoGatewayError";

export default class DeleteLink extends Command<Link>{
    response: ResponseCommand<ServerPortModel | Link>;
    
    constructor(commandData:CommandData){
        super(commandData);
        this.response = new ResponseCommand<ServerPortModel>(commandData);
        this.function = async () => {
            try {
                const link = this.diagram.getLink(this.data);
                if(link){
                    const link = this.diagram.getLink(this.data);
                    link.prepareToUnlink();
                    await this.makeNetworkStuffs(link);
                    link.unlink();
                    const {sourcePort, targetPort} = link.getLinkModels();
                    await this.engine._databaseMngr.deleteLink(this.data.id);
                    await this.engine._databaseMngr.updatePortState(sourcePort.getPortData());
                    await this.engine._databaseMngr.updatePortState(targetPort.getPortData());
                    this.response.send(this.data);
                }
            } catch (error) {
                return;
            }
        }
    }

    private async makeNetworkStuffs(link:LinkModel){
        try {
            const {sourcePort} = link.getLinkModels();
            const gateway = sourcePort.getGateway();
            const standByPorts = gateway.getServerPortsWithState(PortState.disconnecting);
            standByPorts.forEach(port => port.state = PortState.standBy);
            console.log("CALLLLLL DISCONNECT", standByPorts.length)
            const disconnect = async (i:number = 0) => {
            if(i < standByPorts.length){
                await this.response.sendCommand(DiagramFunction.disconnectPort, standByPorts[i]);
                await disconnect(i+1);
                }
            }
            await disconnect();
        } catch (error) {
            if(error instanceof NoGatewayError){
                console.log("no gateway")
                return;
            }
            throw error;
        }
    }

}