import { Device, Port } from "../diagram/Diagram";
import Session from "../Session";
import DeviceModel from "./DeviceModel";
import ServerPortModel from "./ServerPortModel";

export default class ServerModel extends DeviceModel<ServerPortModel, ServerModel>{
    
    constructor(device:Device, session:Session){
        super(device, session);
        this.registerPorts(device.ports);
    }

    private registerPorts(ports:Array<Port>){
        ports.forEach(port=> {
            const newPort = new ServerPortModel(port, this);
            this.ports[port.id] = newPort;
        });
    }

    public addPort(port:Port){
        const newPort = new ServerPortModel(port, this);
        this.ports[port.id] = newPort;
    }
}