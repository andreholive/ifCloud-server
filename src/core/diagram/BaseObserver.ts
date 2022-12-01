import { DiagramFunction } from "../managers/CommandManager";
import DiagramListener from "./DiagramListener";

export interface BaseEvent {
    firing: boolean;
    stopPropagation: () => any;
}

export interface BaseListener {
    id:string;
};

export default class BaseObserver {
    protected listeners: {
        [id: string]: DiagramListener;
    };

    constructor() {
        this.listeners = {};
    }

    public async fireEvent(data:any, id:string, command:DiagramFunction) {
            this.listeners[id][command](data);
    }

    public registerListener(diagram:DiagramListener){
        this.listeners[diagram.id] = diagram;
    }

}