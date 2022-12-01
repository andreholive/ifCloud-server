import Command from "../Commands/Command";
import { CommandData } from "../managers/CommandManager";

export default class GotoLogin extends Command<any>{
    
    constructor(commandData:CommandData){
        super(commandData);
        this.function = async () => {
            try {
                 
                }
            catch (error) {
                
            }
        }
    }

}