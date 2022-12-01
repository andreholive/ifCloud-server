import Command from "./Command";
import { CommandData, DiagramFunction } from "../managers/CommandManager";
import ResponseCommand from "./ResponseCommand";
import { Link } from "../diagram/Diagram";
import RouterPortModel from "../core-models/RouterPortModel";
import ServerPortModel, { PortState } from "../core-models/ServerPortModel";
import LinkModel from "../core-models/LinkModel";

export default class CreateLink extends Command<Link>{
    response: ResponseCommand<Link | ServerPortModel>;    
    constructor(commandData:CommandData){
        super(commandData);
        this.response = new ResponseCommand<Link>(commandData);
        
        this.function = async () => {
            try {
                await this.engine._databaseMngr.createLink(this.data);
                this.response.send(this.data);
                const link = this.diagram.getLink(this.data);
                link.makeLink();
                await this.makeNetworkStuffs(link);
                const {sourcePort, targetPort} = link.getLinkModels();
                await this.engine._databaseMngr.updatePortState(sourcePort.getPortData());
                await this.engine._databaseMngr.updatePortState(targetPort.getPortData());
            } catch (error) {
                await this.response.sendCommand(DiagramFunction.deleteLink, this.data);
            }
        }
    }

    private async connectServers(gatewayPort:RouterPortModel){
        const standByPorts = gatewayPort.getServerPortsWithState(PortState.standBy);
        console.log("CALLLLLL CONNECT", standByPorts.length)
        standByPorts.forEach(port => port.state = PortState.connected);
        const connect = async (i:number = 0) => {
            if(i < standByPorts.length){
                standByPorts[i].networkId = gatewayPort.networkId;
                await this.response.sendCommand(DiagramFunction.connectPort, standByPorts[i]);
                await connect(i+1);
            }
        }
        await connect();
    }

    private async makeNetworkStuffs(link:LinkModel){
        const {sourcePort, targetPort} = link.getLinkModels();
        try {
            const gateway = sourcePort.getGateway();
            await this.connectServers(gateway);
            sourcePort.state = PortState.connected;
            targetPort.state = PortState.connected;
        } catch (error) {
            return;
        }
        
    }

}