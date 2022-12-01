import Command from "./Command";
import { CommandData, DiagramFunction } from "../managers/CommandManager";
import ResponseCommand from "./ResponseCommand";
import TokenExpired from "../errors/TokenExpired";

export type UrlData = {
    url:string
}

export default class AccessVncUrl extends Command<any>{
    response: ResponseCommand<UrlData>;
    
    constructor(commandData:CommandData){
        super(commandData);
        this.response = new ResponseCommand<UrlData>(commandData);
        this.function = async () => {
            try {
                const device = this.diagram.selectDeviceById(this.data);
                if(device){
                    const url = await this.engine._cloudMngr.getConsoleUrl(device.getDeviceData(), this.user);
                    this.response.send({url});
                }
            } catch (error) {
                if(error instanceof TokenExpired){
                    this.response.sendCommand(DiagramFunction.gotoLogin, this.data); 
                }
            }
        }
    }

}