import { Device, Port, PositionData } from "../diagram/Diagram";
import Session from "../Session";
import PortModel from "./PortModel";

export default abstract class DeviceModel<P extends PortModel<P, D>, D extends DeviceModel<P, D>>{
    protected _id: string
    protected name: string
    protected type: string
    protected _instanceId: string
    protected projectId: string
    protected status: number
    protected locked: boolean
    protected x: number
    protected y: number
    protected ports: {[id:string]: P}
    protected _session: Session;
    protected device: number;
    constructor(device:Device, session:Session){
        this._session = session;
        this._id = device.id;
        this.name = device.name;
        this.type = device.type;
        this.device = device.device;
        this._instanceId = device.instanceId
        this.projectId = device.projectId
        this.status = device.status
        this.locked = device.locked
        this.x = device.x;
        this.y = device.y;
        this.ports = {}
    }

    public get id() :string {
        return this._id;
    }
    
    public get session() :Session {
        return this._session;
    }

    public get instanceId():string{
        return this._instanceId;
    }

    public set instanceId(id : string) {
        this._instanceId = id;
    }
    
    public getStatus = () => this.status;

    public setStatus(status:number){
        this.status = status;
    }

    public setPosition(position:PositionData){
        this.x = position.x;
        this.y = position.y;
    }

    public deletePort(port:Port){
        delete this.ports[port.id];
    }

    public selectDevice(id:string):boolean{
        if(id == this.id || id == this.instanceId){
            return true;
        }
        return false;
    }

    public getDeviceData():Device{
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            device: this.device,
            instanceId: this._instanceId,
            projectId: this.projectId,
            status: this.status,
            locked: this.locked,
            x: this.x,
            y: this.y,
            ports: Object.values(this.ports).flatMap((port) => port.getPortData())
        }
    }

    public isDevice(type:number):boolean{
        return this.device === type;
    }

    public hasPorts():boolean{
        return Object.values(this.ports).length !== 0;
    }

    public getPorts():Array<P>{
        let portsArray:Array<P> = [];
        for(let id in this.ports){
            portsArray.push(this.ports[id])
        }
        return portsArray;
    }

    public getPort(id:string):P{
        return this.ports[id];
    }


}