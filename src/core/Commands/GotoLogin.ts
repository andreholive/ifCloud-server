import Command from "./Command";
import { CommandData } from "../managers/CommandManager";
import ResponseCommand from "./ResponseCommand";

export default class GotoLogin extends Command<any>{
    response: ResponseCommand<any>;
    
    constructor(commandData:CommandData){
        super(commandData);
        this.response = new ResponseCommand<any>(commandData);
        this.function = async () => {
            try {
                 this.response.send("");
                }
            catch (error) {
                
            }
        }
    }

}