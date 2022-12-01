import Command from "./Command";
import { CommandData, DiagramFunction } from "../managers/CommandManager";
import ResponseCommand from "./ResponseCommand";
import { Port } from "../diagram/Diagram";
import TokenExpired from "../errors/TokenExpired";
import ServerPortModel, { PortState } from "../core-models/ServerPortModel";

export type ConnectDeviceData = {
    portId: string,  
    deviceId: string, 
    networkId: string
}

export type SubnetData = {
    ip_address: string 
    subnet_id: string
}

export type PortNetworkData = {
    net_id: string,
    port_id: string,
    mac_addr: string,
    port_state: string,
    fixed_ips: Array<SubnetData>
}

export default class ConnectPort extends Command<ServerPortModel>{
    response: ResponseCommand<Port>;
    constructor(commandData:CommandData){
        super(commandData);
        this.response = new ResponseCommand<Port>(commandData);
        this.function = async () => {
            try {
                const networkData = await this.engine._cloudMngr.connectDevice(this.data, this.user);
                this.data.setNetworkData(networkData);
                await this.engine._databaseMngr.updatePortState(this.data.getPortData());
                this.response.send(this.data.getPortData());
            } catch (error:any) {
                if(error instanceof TokenExpired){
                    this.response.sendCommand(DiagramFunction.gotoLogin, this.data);
                }
            }
        }
    }

}