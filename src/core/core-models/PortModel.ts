import { PortNetworkData } from "../Commands/ConnectPort";
import { Port } from "../diagram/Diagram";
import Session from "../Session";
import DeviceModel from "./DeviceModel";
import LinkModel from "./LinkModel";
import RouterPortModel from "./RouterPortModel";
import ServerPortModel, { PortState } from "./ServerPortModel";
import SwitchPortModel from "./SwitchPortModel";

export default abstract class PortModel<P extends PortModel<P, D>, D extends DeviceModel<P, D>>{
    id: string
    name: string
    status: number
    networkId: string
    subnetId: string
    portId: string
    deviceId: string;
    parent: D
    link: LinkModel | null;
    macAddr: string;
    fixedIp: string;
    state: PortState;
    enabled: boolean
    connectedPort:RouterPortModel | ServerPortModel | SwitchPortModel | null;
    protected gatewayPort: RouterPortModel | SwitchPortModel | null;
    
    constructor(portData:Port, parent:D){
        this.id = portData.id;
        this.name = portData.name;
        this.status = portData.status;
        this.networkId = portData.networkId;
        this.subnetId = portData.subnetId;
        this.deviceId = portData.deviceId;
        this.parent = parent;
        this.portId = portData.portId;
        this.macAddr = portData.macAddr;
        this.fixedIp = portData.fixedIp;
        this.subnetId = portData.subnetId;
        this.state = portData.state || PortState.disconnected;
        this.connectedPort = null;
        this.link = null;
        this.enabled = portData.enabled;
        this.gatewayPort = null;
    }

    public setGateway(gatewayPort:RouterPortModel | SwitchPortModel){
        this.gatewayPort = gatewayPort;
    }

    protected getConnectedPort():RouterPortModel | SwitchPortModel | ServerPortModel{
        if(this.link){
            const {sourcePort, targetPort} = this.link.getLinkModels();
            const connectedPort = [sourcePort, targetPort].filter(port => port.id !== this.id);
            return connectedPort[0];
        }else {
            throw new Error("No link");   
        } 
    }

    public haveGateway():boolean{
        return this.gatewayPort !== null;
    }

    public removeGateway(){
        this.gatewayPort = null;
    }

    public isLinked():boolean{
        return this.link !== null
    }

    public getPortData():Port{
        return {
            id: this.id,
            name: this.name,
            deviceId: this.deviceId,
            status: this.status,
            networkId: this.networkId,
            subnetId: this.subnetId,
            portId: this.portId,
            macAddr: this.macAddr,
            fixedIp: this.fixedIp,
            state: this.state,
            enabled: this.enabled
        }
    }

    public getParent = () => this.parent;

    public setLink(link:LinkModel){
        this.link = link;
    }

    public getLink():LinkModel | null{
        return this.link
    }

    public setNetworkData(data:PortNetworkData){
        this.macAddr = data.mac_addr;
        this.networkId = data.net_id;
        this.portId = data.port_id;
        this.fixedIp = data.fixed_ips[0].ip_address;
        this.subnetId = data.fixed_ips[0].subnet_id;
    }

    public cleanNetworkData(){
        this.networkId = "";
        this.subnetId = "";
        this.portId = "";
        this.macAddr = "";
        this.fixedIp = "";
    }
    
}