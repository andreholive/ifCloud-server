import { Port } from "../diagram/Diagram";
import NoGatewayError from "../errors/NoGatewayError";
import LinkModel from "./LinkModel";
import PortModel from "./PortModel";
import RouterPortModel from "./RouterPortModel";
import ServerModel from "./ServerModel";
import SwitchPortModel from "./SwitchPortModel";

export enum PortState {
    connected = 'connected',
    disconnected = 'disconnected',
    disconnecting = 'disconnecting',
    connecting = 'connecting',
    standBy = 'standBy'
}

export default class ServerPortModel extends PortModel<ServerPortModel, ServerModel>{
    gatewayPort: RouterPortModel | SwitchPortModel | null;
    gateway: RouterPortModel | null;
    constructor(portData:Port, server:ServerModel){
        super(portData, server);
        this.gatewayPort = null;
        this.gateway = null;
    }

    public startLink(port: RouterPortModel | ServerPortModel | SwitchPortModel){
        const portState = this.state;
        this.makeLink(port);
        this.state = portState;
    }
    
    public makeLink(port: RouterPortModel | ServerPortModel | SwitchPortModel){
        this.connectedPort = port;;
        this.state = PortState.standBy;
        this.enabled = true;
    }

    public prepareToUnlink(){
        this.state = PortState.disconnecting;
        
    }

    public unlink(){
        this.connectedPort = null;
        this.link = null;
        this.state = PortState.disconnected;
    }

    public disconnect(){
        this.state = PortState.disconnecting;
    }

    public setGateway(gatewayPort:RouterPortModel | SwitchPortModel){
        this.gateway = gatewayPort.gateway;
        this.gatewayPort = gatewayPort;
    }

    public getGateway():RouterPortModel{
        if(this.gateway){
            return this.gateway;
        }
        else {
            throw new NoGatewayError();
        }
        
    }

    public removeGateway(){
        this.gatewayPort = null;
        this.gateway = null;
        this.cleanNetworkData();
        this.state = PortState.standBy;
    }    
}