import { CommandData } from "../managers/CommandManager";
import Command from "../Commands/Command";
import ResponseCommand from "./ResponseCommand";
import { Device } from "../diagram/Diagram";

export default class UpdateInstanceStatus extends Command<Device>{
    response: ResponseCommand<Device>;
    
    constructor(commandData:CommandData){
        super(commandData);
        this.response = new ResponseCommand<Device>(commandData);
        this.function = async () => {
            try{
                await this.engine._databaseMngr.updateDeviceData(this.data);
                this.response.send(this.data);
                }catch(error){
                    
                }
        }
    }

}