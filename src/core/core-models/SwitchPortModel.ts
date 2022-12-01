import { Port } from "../diagram/Diagram";
import NoGatewayError from "../errors/NoGatewayError";
import PortModel from "./PortModel";
import RouterPortModel from "./RouterPortModel";
import ServerPortModel, { PortState } from "./ServerPortModel";
import SwitchModel from "./SwitchModel";

export default class SwitchPortModel extends PortModel<SwitchPortModel, SwitchModel>{
    gatewayPort: RouterPortModel | SwitchPortModel | null;
    gateway: RouterPortModel | null;
    constructor(portData:Port, sw:SwitchModel){
        super(portData, sw);
        this.gatewayPort = null;
        this.gateway = null;
    }

    public startLink(port: RouterPortModel | ServerPortModel | SwitchPortModel){
        const portState = this.state;
        this.makeLink(port);
        this.state = portState;
    }

    public makeLink(port: RouterPortModel | ServerPortModel | SwitchPortModel){
        this.connectedPort = port;
        this.state = PortState.connected;
        this.enabled = true;
        if(this.connectedPort instanceof ServerPortModel 
            || this.connectedPort instanceof SwitchPortModel){
            if(this.gatewayPort){
                this.connectedPort.setGateway(this); 
            }
        }  
    }

    public prepareToUnlink(){
        this.state = PortState.disconnected;
        this.link = null;
        if(this.connectedPort){
            if(this.connectedPort === this.gatewayPort)
            {
                this.disconnect();
                return;
            }
        }
        if(this.gatewayPort){
            if(this.connectedPort instanceof ServerPortModel){
                this.connectedPort.disconnect();
            }
        }
    }

    public unlink(){
        if(this.connectedPort){
        if(this.connectedPort === this.gatewayPort){
            this.gatewayPort = null;
            this.gateway = null;
        }
        this.connectedPort = null;
        }   
    }

    private removeLinkedDevice(){
        
    }

    public setGateway(gatewayPort:RouterPortModel | SwitchPortModel){
        if(this.gatewayPort){
            throw new Error("");
        }
        this.gatewayPort = gatewayPort;
        if(gatewayPort instanceof RouterPortModel){
            this.gateway = gatewayPort;
        }
        else {
            this.gateway = gatewayPort.gateway;
        }
        this.state = PortState.connected;
        this.parent.getPorts().forEach(port => {
            if(port.gatewayPort) return;
            port.gatewayPort = this;
            port.gateway = this.gateway;
            if(port.connectedPort){
                port.connectedPort.setGateway(port);
            }
        });
    }

    public getGateway():RouterPortModel{
        if(this.gateway){
            return this.gateway;
        }
        else {
            throw new NoGatewayError();
        }
        
    }

    public disconnect(){
        console.log('DISCONNECT SWITCH')
            this.parent.getPorts().forEach(port => {
                if(port.connectedPort && port !== this){
                    if(port.connectedPort instanceof SwitchPortModel){
                        port.connectedPort.disconnect();
                    }
                    if(port.connectedPort instanceof ServerPortModel){
                        if(port.connectedPort.state === PortState.connected){
                            port.connectedPort.disconnect();
                        }
                    }
                }
                port.gatewayPort = null;
            });
    }

    public getServerPortsWithState(state: PortState):Array<ServerPortModel>{
        const portsArray:Array<ServerPortModel> = [];
        this.parent.getPorts().forEach(port => {
            if(port.connectedPort && port !== this){
                if(port.connectedPort instanceof SwitchPortModel){

                    portsArray.push(...port.connectedPort.getServerPortsWithState(state));
                }
                if(port.connectedPort instanceof ServerPortModel){
                    console.log(port.connectedPort.state)
                    if(port.connectedPort.state === state){
                        portsArray.push(port.connectedPort);
                    }
                }
            }
        });
        return portsArray;
    }

}