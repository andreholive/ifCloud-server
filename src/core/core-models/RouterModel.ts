import { Device, Port } from "../diagram/Diagram";
import Session from "../Session";
import DeviceModel from "./DeviceModel";
import RouterPortModel from "./RouterPortModel";

export default class RouterModel extends DeviceModel<RouterPortModel, RouterModel>{
    protected ports: {[id:string]: RouterPortModel}
    constructor(device:Device, session:Session){
        super(device, session);
        this.ports = {};
        this.registerPorts(device.ports);
    }

    private registerPorts(ports:Array<Port>){
        ports.forEach(port=> {
            const newPort = new RouterPortModel(port, this);
            this.ports[port.id] = newPort;
        });
    }

    public addPort(port:Port){
        const newPort = new RouterPortModel(port, this);
        this.ports[port.id] = newPort;
    }

    
}