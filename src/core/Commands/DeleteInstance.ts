import Command from "./Command";
import { Device, Port } from "../diagram/Diagram";
import { CommandData, DiagramFunction } from "../managers/CommandManager";
import ResponseCommand from "./ResponseCommand";

import Error404 from "../errors/Error404";
import TokenExpired from "../errors/TokenExpired";
import RouterModel from "../core-models/RouterModel";
import ServerModel from "../core-models/ServerModel";
import SwitchModel from "../core-models/SwitchModel";

export default class DeleteInstance extends Command<any>{

    device: RouterModel | SwitchModel | ServerModel | undefined;
    response: ResponseCommand<Device | Port>;
    
    constructor(commandData:CommandData){
        super(commandData);
        this.response = new ResponseCommand<Device>(commandData);
        this.device = this.diagram.selectDeviceById(this.data.deviceId);
        this.function = async () => {
            try {
                if(this.device){
                    if(this.device.isDevice(3)){
                        await this.deleteAllPorts();
                        await this.engine._cloudMngr.removeInstance(this.device.getDeviceData(), this.user); 
                    }
                    if(this.device.isDevice(1)){
                        await this.deleteRouterPorts();
                        await this.engine._cloudMngr.deleteRouter(this.device.getDeviceData(), this.user);
                    }
                    await this.deleteAllPorts();
                    await this.engine._databaseMngr.deleteDevice(this.device.getDeviceData());
                    this.response.send(this.device.getDeviceData());
                }
            } catch (error:any) {
                if(error instanceof Error404){
                    if(this.device){
                    await this.engine._databaseMngr.deleteDevice(this.device.getDeviceData());
                    this.response.send(this.device.getDeviceData());
                    }
                }
                if(error instanceof TokenExpired){
                    this.response.sendCommand(DiagramFunction.gotoLogin, this.data);
                }
            }
        }
    }

    private async deleteAllPorts():Promise<void>{
        const deletePorts = async () => {
            try {
                if(this.device && this.device.hasPorts()){
                    const devicePorts = this.device.getPorts();
                    const port = devicePorts[devicePorts.length - 1];
                    await this.response.sendCommand(DiagramFunction.deletePort, port.getPortData());
                    await deletePorts();
                }
            } catch (error) {
                throw Error ();
            }
            
        }
        await deletePorts();
        return;
    }

    private async deleteRouterPorts():Promise<void>{
        const deletePorts = async () => {
            let port;
            try {
                if(this.device && this.device.hasPorts()){
                    const devicePorts = this.device.getPorts();
                    port = devicePorts[devicePorts.length - 1];
                    await this.response.sendCommand(DiagramFunction.removeRouterPort, port.getPortData());
                    await deletePorts();
                }
            } catch (error) {
                if(error instanceof Error404){
                    console.log('erro')
                    if(port)
                    await this.response.sendCommand(DiagramFunction.deletePort, port.getPortData()); 
                }
            }
            
        }
        await deletePorts();
        return;
    }

}