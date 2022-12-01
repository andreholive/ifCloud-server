import { DiagramLoadData } from "../Commands/DiagramLoad";
import LinkModel from "../core-models/LinkModel";
import { BaseListener } from "./BaseObserver";
import Diagram, { Device, Link, Port } from "./Diagram";

export default class DiagramListener implements BaseListener{
    diagram: Diagram;
    id: string;
    constructor(diagram:Diagram){
        this.id = diagram.id;
        this.diagram = diagram;
    }
    
    diagramLoad(response:DiagramLoadData){
        response.devices.forEach((device:Device) => {
            this.diagram.addDevice(device)
        });
        response.links.forEach((link:Link) => {
            this.diagram.addLink(link);
        });
    }

    createDevice = (device:Device) => {
        this.diagram.addDevice(device);
    };

    changeDevicePosition = (device:Device) => {
        //todo
    };

    removeDevice = (device:Device) => {
        delete this.diagram.getDevices()[device.id];
        console.log(`Device ${device.id} Deleted!`)
    };

    createLink(link:Link){
        if(!this.diagram.getLinks()[link.id]){
            this.diagram.getLinks()[link.id] = new LinkModel(link, this.diagram.getSession());
        }
    }

    deleteLink = (link:Link) => {
        this.diagram.deleteLink(link);
    }

    gotoLogin(){

    }

    addRouterPort(port:Port){
        const device = this.diagram.selectDeviceById(port.deviceId);
        if(device)device.addPort(port);
    }

    removeRouterPort(port:Port){
        const device = this.diagram.selectDeviceById(port.deviceId);
        if(device)device.deletePort(port)
    }

    portRemove(response:any){
        const device = this.diagram.selectDeviceById(response.data.deviceId);
        if(device){
            device.deletePort(response.data.id);
        }
    }

    enableLink(linkData:Link){
        const link = this.diagram.getLink(linkData);
        const {sourcePort, targetPort} = link.getLinkModels();
        sourcePort.enabled = true;
        targetPort.enabled = true;
    }

    disableLink(linkData:Link){
        const link = this.diagram.getLink(linkData);
        const {sourcePort, targetPort} = link.getLinkModels();
        sourcePort.enabled = false;
        targetPort.enabled = false;
    }

    accessVncUrl = (data:string) => {
        //todo or nothing todo?
    }

    disconnectPort = (link:Link) => {
        //todo
    }

    deletePort = (port: Port) => {
        const device = this.diagram.selectDeviceById(port.deviceId);
        if(device)device.deletePort(port);
    }

    moveDevice = (data:any) => {}

    connectPort = (dport:Port) => {
        
    }

    updateInstanceStatus = (dvc:Device) => {
        const device = this.diagram.selectDeviceById(dvc.id);
        if(device){
            device.setStatus(dvc.status);
        }
    };

    getInstanceStatus = (dvc:Device) => {
        
    };

    deleteDevice = (data:any) => {};

    connectDevice = (data:any) => {};

    instancePowerOn = (instanceData:Device) => {
        const device = this.diagram.selectDeviceById(instanceData.id);
        if(device){
            device.setStatus(1)
        }
    };
    instancePowerOff = (instanceData:Device) => {
        const device = this.diagram.selectDeviceById(instanceData.id);
        if(device){
            device.setStatus(4)
        }
    };

    deviceReboot = (instanceData:Device) => {
        //todo
    };
}