import { Port } from "../diagram/Diagram";
import PortModel from "./PortModel";
import RouterModel from "./RouterModel";
import ServerPortModel, { PortState } from "./ServerPortModel";
import SwitchPortModel from "./SwitchPortModel";

export default class RouterPortModel extends PortModel<RouterPortModel, RouterModel>{
    gatewayPort: RouterPortModel;
    gateway: RouterPortModel;
    constructor(portData:Port, router:RouterModel){
        super(portData, router);
        this.gatewayPort = this;
        this.gateway = this;
    }

    public makeLink(port: RouterPortModel | ServerPortModel | SwitchPortModel){
        this.connectedPort = port;
        this.state = PortState.connected;
        this.enabled = true;
        this.connectedPort.setGateway(this);
    }
    public startLink(port: RouterPortModel | ServerPortModel | SwitchPortModel){
        this.connectedPort = port;
        this.state = PortState.connected;
        this.enabled = true;
        this.connectedPort.setGateway(this);
    }

    public prepareToUnlink(){
        this.state = PortState.disconnected;
        this.link = null;
    }

    public unlink(){
        this.connectedPort = null;
    }

    public getGateway():RouterPortModel{
        return this
    }

    public getServerPortsWithState(state:PortState):Array<ServerPortModel>{
        const portsArray:Array<ServerPortModel> = [];
        if(this.connectedPort){
            if(this.connectedPort instanceof SwitchPortModel)
            {
                portsArray.push(...this.connectedPort.getServerPortsWithState(state));
            }
            if(this.connectedPort instanceof ServerPortModel)
            {
                if(this.connectedPort.state === state){
                    portsArray.push(this.connectedPort);
                }
                
            }
        }
        return portsArray;
    }

}