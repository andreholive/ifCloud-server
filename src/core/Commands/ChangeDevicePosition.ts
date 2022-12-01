import { CommandData, DiagramFunction } from "../managers/CommandManager";
import Command from "../Commands/Command";
import ResponseCommand from "./ResponseCommand";
import { PositionData } from "../diagram/Diagram";
import TokenExpired from "../errors/TokenExpired";

export type DevicePositionData = {
    deviceId:string
    position: PositionData
}

export default class ChangeDevicePosition extends Command<any>{
    response: ResponseCommand<DevicePositionData>;
    
    constructor(commandData:CommandData){
        super(commandData);
        this.response = new ResponseCommand<DevicePositionData>(commandData);
        this.function = async () => {
            try {
                await this.engine._databaseMngr.updateDevicePosition(this.data.deviceId, this.data.position);
                this.response.sendToAllUsers({deviceId: this.data.deviceId, position: this.data.position});
            } catch (error) {
                if(error instanceof TokenExpired){
                    this.response.sendCommand(DiagramFunction.gotoLogin, this.data);
                }
            }
        }
    }

}