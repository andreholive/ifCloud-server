import { CommandData, DiagramFunction } from "../managers/CommandManager";
import Command from "../Commands/Command";
import ResponseCommand from "./ResponseCommand";
import TokenExpired from "../errors/TokenExpired";
import { Device } from "../diagram/Diagram";

export default class GetInstanceStatus extends Command<any>{
    response: ResponseCommand<Device>;
    
    constructor(commandData:CommandData){
        super(commandData);
        this.response = new ResponseCommand<Device>(commandData);
        this.function = async () => {
            try{
                const instancesInfos = await this.engine._cloudMngr.getInstanceInformations(this.user);
                instancesInfos.forEach(info => {
                    const device = this.diagram.getDeviceByInstanceId(info.id);
                    if(device){
                        const status = device.getStatus();
                        if(info.task_state != null){
                            device.setStatus(2);
                        }
                        else if(info.power_state == 1 || info.power_state == 4){
                            device.setStatus(info.power_state);
                        }
                        if(status != device.getStatus()){
                            this.response.sendCommand(DiagramFunction.updateInstanceStatus, device.getDeviceData())
                        } 
                    }
                });
                }catch(error){
                    if(error instanceof TokenExpired){
                        this.response.sendCommand(DiagramFunction.gotoLogin, this.data);
                    }
                }
        }
    }

}