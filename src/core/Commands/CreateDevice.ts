import Command from "./Command";
import { CommandData, DiagramFunction } from "../managers/CommandManager";
import ResponseCommand from "./ResponseCommand";
import { Device } from "../diagram/Diagram";
import TokenExpired from "../errors/TokenExpired";

export default class CreateDevice extends Command<Device>{
    
    response: ResponseCommand<Device>;
    constructor(commandData:CommandData){
        super(commandData);
        this.response = new ResponseCommand<Device>(commandData);
        this.function = async () => {
            this.response = new ResponseCommand(commandData);
            try {
                if(this.data.device === 3){
                    await this.createInstance();
                }
                if(this.data.device === 1){
                    await this.createRouter();
                    this.data.status = 1;
                }
                if(this.data.device === 2){
                    this.data.status = 1;
                }
                await this.engine._databaseMngr.createDevice(this.data);
                this.response.send(this.data);
            } catch (error) {
                this.response.sendCommand(DiagramFunction.removeDevice, this.data);
                if(error instanceof TokenExpired){
                    this.response.sendCommand(DiagramFunction.gotoLogin, this.data);
                }
            }
        }
    }

    private async createInstance():Promise<void>{
        try {
            const instanceId = await this.engine._cloudMngr.addInstance(this.data, this.user);
            this.data.instanceId = instanceId;
        } catch (error:any) {
            throw new Error(error);
        }
    }

    private async createRouter(){
        try {
            const instanceId = await this.engine._cloudMngr.createRouter(this.data, this.user);
            this.data.instanceId = instanceId;
        } catch (error:any) {
            throw new Error(error); 
        }
    }

}