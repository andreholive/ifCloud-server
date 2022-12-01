import Device from "../../models/device";
import LinkModel from "../core-models/LinkModel";
import RouterModel from "../core-models/RouterModel";
import ServerModel from "../core-models/ServerModel";
import { PortState } from "../core-models/ServerPortModel";
import SwitchModel from "../core-models/SwitchModel";
import Session from "../Session";

export type Device = {
    id: string
    name: string
    type: string
    device: number
    instanceId: string
    projectId: string
    status: number
    locked: boolean
    x: number
    y: number
    ports: Array<Port>
}

export type Port = {
    id: string
    name: string
    deviceId: string
    status: number
    networkId: string
    subnetId: string
    portId: string
    macAddr: string
    fixedIp: string
    state: PortState
    enabled: boolean
}

export type Link  = {
    id: string
    sourcePort: string,
    targetPort: string,
    source: string,
    target: string,
    sourceLabel: string,
    targetLabel: string,
    networkId: string,
    projectId: string,
}

export type PositionData = {
    x: number
    y: number
}

export type DiagramData = {
    devices: {[id: string]: Device};
    links: {[id: string]: Link};
}

export default class Diagram{
    
    protected devices: {
        [id: string]: RouterModel | SwitchModel | ServerModel;
    };
    protected links: {
        [id: string]: LinkModel;
    };
    id: string;
    private session: Session;
    constructor(session:Session){
        this.id = session.id;
        this.session = session;
        this.devices = {};
        this.links = {};
    }

    public getSession():Session{
        return this.session;
    }

    public addDevice(deviceData:Device){
        if(!this.devices[deviceData.id]){
            if(deviceData.device === 3){
                this.devices[deviceData.id] = new ServerModel(deviceData, this.session);
            }
            if(deviceData.device === 1){
                this.devices[deviceData.id] = new RouterModel(deviceData, this.session);
            }
            if(deviceData.device === 2){
                this.devices[deviceData.id] = new SwitchModel(deviceData, this.session);
            }  
        }
    }

    public removeDevice(deviceData:Device){
        if(!this.devices[deviceData.id]){
            delete this.devices[deviceData.id];
        }
    }

    public addLink(linkData:Link){
        if(!this.links[linkData.id]){
            this.links[linkData.id] = new LinkModel(linkData, this.session);
            this.links[linkData.id].startLink();
        }
    }

    public deleteLink(linkData:Link){
        if(this.links[linkData.id]){
            delete this.links[linkData.id];
        }
    }

    public getDeviceByInstanceId(id:string){
        return Object.values(this.devices).find(device => device.selectDevice(id));
    }

    public selectLinkByPort(port:Port){
        const link = Object.values(this.links).find(link => link.selectLink(port));
        return link;
    }
    
    public selectDeviceById(id:string): RouterModel | SwitchModel | ServerModel{
        return this.devices[id];
    }

    public getLink(linkData:Link):LinkModel{
        return this.links[linkData.id];
    }

    public getDevices(){
        return this.devices;
    }

    public getLinks():{[id: string]: LinkModel}{
        return this.links;
    }
}