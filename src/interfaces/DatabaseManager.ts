import { Device, Link, Port, PositionData } from "../core/diagram/Diagram";
import User from "../core/core-models/UserModel";
import { PortNetworkData } from "../core/Commands/ConnectPort";

export default interface DatabaseManager {
    createDevice(device:Device):Promise<Device>

    deleteDevice(device:Device):Promise<any>

    createPorts(portsArray: Array<Port>):Promise<Array<Port>>

    updateDevicePosition(deviceId:string, position:PositionData):Promise<void>

    updateDeviceStatus(device:Device, status:number):void

    updateDeviceData(device:Device):Promise<void>

    getProjectDevices(user:User):Promise<Array<Device>>

    getProjectLinks(user:User):Promise<Array<Link>>

    createLink(link:Link):Promise<void>

    deleteLink(id:string):Promise<void>

    deletePort(port:Port):Promise<void>

    updatePortState(port:Port):Promise<void>
}