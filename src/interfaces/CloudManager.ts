import { Device, Port } from "../core/diagram/Diagram";
import { InstanceInformation } from "../core/managers/OpenstackCloudManager";
import User from "../core/core-models/UserModel";
import { PortNetworkData } from "../core/Commands/ConnectPort";
import ServerPortModel from "../core/core-models/ServerPortModel";
import { AddRouterInterfaceResponse, PortDetailsResponse, SubnetData, SubnetResponse } from "./OpenstackResponses";


export default interface CloudManager{
    addInstance(device:Device, user:User):Promise<string>
    removeInstance(device:Device, user:User):Promise<void>
    getInstanceInformations(user:User):Promise<Array<InstanceInformation>>
    instancePowerOn(device:Device, user:User):Promise<void>
    instancePowerOff(device:Device, user:User):Promise<void>
    instanceReboot(device:Device, user:User):Promise<void>
    createRouter(device:Device, user:User):Promise<string>
    deleteRouter(device:Device, user:User):Promise<void>
    createNetwork(name:string, user:User):Promise<string>
    createSubnet(subnetData:SubnetData, user:User):Promise<SubnetResponse>
    getConsoleUrl(device:Device, user:User):Promise<string>
    connectDevice(serverPort:ServerPortModel, user:User):Promise<PortNetworkData>
    disconnectDevice(serverPort:ServerPortModel, user: User):Promise<void>
    deleteSubNet(port:Port, user:User):Promise<void>
    deleteNetwork(port:Port, user:User):Promise<void>
    addRouterInterface(router:Device, subnet_id:string, user:User):Promise<AddRouterInterfaceResponse>
    deleteRouterInterface(router:Device, subnet_id:string, user:User):Promise<void>
    enablePort(port:Port, user:User):Promise<void>
    disablePort(port:Port, user:User):Promise<void>
    getPortDetails(port:Port, user:User):Promise<PortDetailsResponse>
}