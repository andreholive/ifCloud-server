import Command from "./Command";
import { CommandData, DiagramFunction } from "../managers/CommandManager";
import { Link, Port } from "../diagram/Diagram";
import ResponseCommand from "./ResponseCommand";
import TokenExpired from "../errors/TokenExpired";
import Error404 from "../errors/Error404";

export default class RemoveRouterPort extends Command<Port>{
    response: ResponseCommand<Port | Link>;
    
    constructor(commandData:CommandData){
        super(commandData);
        this.response = new ResponseCommand<Port>(commandData);
        this.function = async () => {
            try {
                const device = this.diagram.selectDeviceById(this.data.deviceId);
                const port = device.getPort(this.data.id);
                if(port.link){
                    await this.response.sendCommand(DiagramFunction.deleteLink, port.link.getLinkData());
                }
                await this.engine._cloudMngr.deleteRouterInterface(device.getDeviceData(), this.data.subnetId, this.user);
                await this.engine._cloudMngr.deleteSubNet(this.data, this.user);
                await this.engine._cloudMngr.deleteNetwork(this.data, this.user);
                await this.engine._databaseMngr.deletePort(this.data);
                this.response.send(this.data);
            } catch (error:any) {
                if(error instanceof TokenExpired){
                    this.response.sendCommand(DiagramFunction.gotoLogin, this.data);
                }
                if(error instanceof Error404){
                    throw new Error404('');
                }
            }
        }
    }

}