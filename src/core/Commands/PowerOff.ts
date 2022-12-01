import Command from "./Command";
import { CommandData, DiagramFunction } from "../managers/CommandManager";
import ResponseCommand from "./ResponseCommand";
import { Device } from "../diagram/Diagram";
import TokenExpired from "../errors/TokenExpired";

export default class PowerOff extends Command<any>{
    response: ResponseCommand<Device>;
    
    constructor(commandData:CommandData){
        super(commandData);
        this.response = new ResponseCommand<Device>(commandData);
        this.function = async () => {
            try {
                const device = this.diagram.selectDeviceById(this.data);
                if(device){
                    await this.engine._cloudMngr.instancePowerOff(device.getDeviceData(), this.user);
                    this.response.send(device.getDeviceData());
                }
            } catch (error:any) {
                if(error instanceof TokenExpired){
                    this.response.sendCommand(DiagramFunction.gotoLogin, this.data);
                }
            }
        }
    }

}