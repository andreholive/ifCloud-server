import express from "express";
import http from 'http';
import {Server} from 'socket.io';
import MainEngine, { IOdata } from "./core/MainEngine";
import { DiagramFunction } from "./core/managers/CommandManager";

class InputDataObserver{
    public app: express.Application;
    public server: http.Server;
    private io: Server;

    constructor(private readonly mainEngine:MainEngine) {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new Server(this.server, {
            cors: {
              origin: "*",
              methods: ["GET", "POST"]
            }
        });
    }
    
    public start(): void {

        this.io.on('connection', (socket: any) => {
            let userData = {
                sessionId: socket.handshake.query.projectId,
                userId: socket.handshake.query.userId,
                token: socket.handshake.query.token,
                sendAction: (msg:IOdata) => socket.emit(socket.handshake.query.userId, msg)
            }
            this.mainEngine.createNewSession(userData);
            socket.on(userData.sessionId, async (data:IOdata) => {
                const requestData = {
                    sessionId: userData.sessionId,
                    userId: userData.userId,
                    data: data.data,
                    requestCommand: DiagramFunction[data.action]
                }
                this.mainEngine.executeCommand(requestData);
            });

            socket.on('disconnect', ()=> {
                const session = this.mainEngine.getSession(userData.sessionId);
                if(session)session.deregisterUser(userData.userId);
            });
        });

        this.server.listen(3333, async ()=> {
            console.log(`Server Listening on port: 3333`);
        });;
    }
}

export default InputDataObserver;