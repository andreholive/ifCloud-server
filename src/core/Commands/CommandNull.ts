import Command from "./Command";
import { CommandData } from "../managers/CommandManager";

export default class CommandNull extends Command<any>{
    
    constructor(commandData:CommandData){
        super(commandData);
        this.function = async () => {
            console.log('Command Null', commandData)
        }
    }

}