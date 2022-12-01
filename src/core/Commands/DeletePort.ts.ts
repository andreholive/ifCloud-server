import Command from "./Command";
import { CommandData, DiagramFunction } from "../managers/CommandManager";
import { Link, Port } from "../diagram/Diagram";
import ResponseCommand from "./ResponseCommand";
import TokenExpired from "../errors/TokenExpired";

export default class DeletePort extends Command<Port>{
    response: ResponseCommand<Link | Port>;
    
    constructor(commandData:CommandData){
        super(commandData);
        this.response = new ResponseCommand<Port>(commandData);
        this.function = async () => {
            try {
                const device = this.diagram.selectDeviceById(this.data.deviceId);
                const port = device.getPort(this.data.id);
                if(port.link){
                    console.log('have link')
                    await this.response.sendCommand(DiagramFunction.deleteLink, port.link.getLinkData());
                }
                await this.engine._databaseMngr.deletePort(this.data);
                this.response.send(this.data);
            } catch (error:any) {
                
            }
        }
    }

}