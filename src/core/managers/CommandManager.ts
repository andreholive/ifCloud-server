import AddRouterPort from "../Commands/AddRouterPort";
import ConnectPort from "../Commands/ConnectPort";
import CreateDevice from "../Commands/CreateDevice";
import CreateLink from "../Commands/CreateLink";
import DeleteInstance from "../Commands/DeleteInstance";
import DiagramLoad from "../Commands/DiagramLoad";
import GetInstanceStatus from "../Commands/GetInstanceStatus";
import CommandNull from "../Commands/CommandNull";
import Session from "../Session";
import User from "../core-models/UserModel";
import ChangeDevicePosition from "../Commands/ChangeDevicePosition";
import AccessVncUrl from "../Commands/AccessVncUrl";
import PowerOff from "../Commands/PowerOff";
import PowerOn from "../Commands/PowerOn";
import Reboot from "../Commands/Reboot";
import DisconnectPort from "../Commands/DisconnectPort";
import DeleteLink from "../Commands/DeleteLink";
import DeletePort from "../Commands/DeletePort.ts";
import RemoveRouterPort from "../Commands/RemoveRouterPort";
import UpdateInstanceStatus from "../Commands/updateInstanceStatus";
import EnableLink from "../Commands/EnableLink";
import DisableLink from "../Commands/DisableLink";
import GotoLogin from "../Commands/GotoLogin";


export type CommandData= {
    command:DiagramFunction,
    data: any,
    session: Session,
    user: User
}

export enum DiagramFunction {
    portRemove = 'portRemove',
    getInstanceStatus = 'getInstanceStatus',
    diagramLoad = 'diagramLoad',
    createDevice = 'createDevice',
    changeDevicePosition = 'changeDevicePosition',
    deleteDevice = 'deleteDevice',
    connectPort = 'connectPort',
    createLink = 'createLink',
    deleteLink = 'deleteLink',
    addRouterPort = 'addRouterPort',
    removeDevice = 'removeDevice',
    moveDevice = 'moveDevice',
    disconnectPort = 'disconnectPort',
    accessVncUrl = 'accessVncUrl',
    instancePowerOff = 'instancePowerOff',
    instancePowerOn = 'instancePowerOn',
    deviceReboot = 'deviceReboot',
    deletePort = 'deletePort',
    removeRouterPort = 'removeRouterPort',
    updateInstanceStatus = 'updateInstanceStatus',
    enableLink = 'enableLink',
    disableLink = 'disableLink',
    gotoLogin = 'gotoLogin'
}

export default class CommandManager{
    
    private make(commandData:CommandData){
        switch(commandData.command) {
            case "getInstanceStatus":
                return new GetInstanceStatus(commandData);
            case "updateInstanceStatus":
                return new UpdateInstanceStatus(commandData);
            case "diagramLoad":
                return new DiagramLoad(commandData);
            case "createDevice":
                return new CreateDevice(commandData);
            case "changeDevicePosition":
                return new ChangeDevicePosition(commandData);
            case "removeDevice":
                return new DeleteInstance(commandData);
            case "connectPort":
                return new ConnectPort(commandData);
            case "createLink":
                return new CreateLink(commandData);
            case "deleteLink":
                return new DeleteLink(commandData);
            case "gotoLogin":
                return new GotoLogin(commandData)
            case "enableLink":
                return new EnableLink(commandData);
            case "disableLink":
                return new DisableLink(commandData);
            case "addRouterPort":
                return new AddRouterPort(commandData);
            case "removeRouterPort":
                return new RemoveRouterPort(commandData);
            case "deletePort":
                return new DeletePort(commandData);
            case "disconnectPort":
                return new DisconnectPort(commandData);
            case "accessVncUrl":
                return new AccessVncUrl(commandData);
            case "instancePowerOff":
                return new PowerOff(commandData);
            case "instancePowerOn":
                return new PowerOn(commandData);
            case "deviceReboot":
                return new Reboot(commandData);
            default:return new CommandNull(commandData);
        }     
    }

    public async execute(commandData:CommandData):Promise<void>{
        await this.make(commandData).execute();
    }
}