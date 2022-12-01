import { Device, Port } from "../diagram/Diagram";
import Session from "../Session";
import DeviceModel from "./DeviceModel";
import RouterModel from "./RouterModel";
import ServerModel from "./ServerModel";
import SwitchPortModel from "./SwitchPortModel";

export default class SwitchModel extends DeviceModel<SwitchPortModel, SwitchModel>{
    
    constructor(device:Device, session:Session){
        super(device, session);
        this.registerPorts(device.ports);
    }

    private registerPorts(ports:Array<Port>){
        ports.forEach(port=> {
            const newPort = new SwitchPortModel(port, this);
            this.ports[port.id] = newPort;
        });
    }

    public addPort(port:Port){
        const newPort = new SwitchPortModel(port, this);
        this.ports[port.id] = newPort;
    }

}