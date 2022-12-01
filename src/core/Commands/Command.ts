import Diagram from "../diagram/Diagram";
import MainEngine from "../MainEngine";
import { CommandData } from "../managers/CommandManager";
import User from "../core-models/UserModel";

export default abstract class Command<D extends object>{
    function: Function;
    data: D;
    user: User;
    engine: MainEngine
    diagram: Diagram
    constructor(commandData:CommandData){
        this.function = async ():Promise<void> => {};
        this.data = commandData.data;
        this.user = commandData.user;
        this.engine = commandData.session._engine;
        this.diagram = commandData.session._diagram;
    }

    public async execute():Promise<void>{
        await this.function();
    }

}