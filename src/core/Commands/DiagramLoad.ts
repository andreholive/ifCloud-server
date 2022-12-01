import Command from "./Command";
import { CommandData } from "../managers/CommandManager";
import ResponseCommand from "./ResponseCommand";
import { Device, Link } from "../diagram/Diagram";

export type DiagramLoadData = {
    devices: Array<Device>;
    links: Array<Link>;
}

export default class DiagramLoad extends Command<any>{
    response: ResponseCommand<DiagramLoadData>;
    
    constructor(commandData:CommandData){
        super(commandData);
        this.response = new ResponseCommand<DiagramLoadData>(commandData);
        this.function = async () => {
            try {
                const devices = await this.engine._databaseMngr.getProjectDevices(this.user);
                const links = await this.engine._databaseMngr.getProjectLinks(this.user);
                this.response.send({devices, links});
            } catch (error) {
                throw Error("Load Diagram Error")
            }
        }
    }

}