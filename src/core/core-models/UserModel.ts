import { IOdata } from "../MainEngine";
import { UserCommandData } from "../Session";


export default class User {
    id: string;
    token: string;
    sendData: (msg: IOdata) => void;
    sessionId: string;
    
    constructor(userCommandData:UserCommandData){
        this.id = userCommandData.userId;
        this.token = userCommandData.token;
        this.sessionId = userCommandData.sessionId;
        this.sendData = (msg:IOdata) => userCommandData.sendAction(msg);
    }

    sendMsgToUser(msg:IOdata){
        this.sendData(msg)
    }
}