import { Link, Port } from "../diagram/Diagram";
import DoubleGatewayError from "../errors/DoubleGatewayError";
import Session from "../Session";
import RouterModel from "./RouterModel";
import RouterPortModel from "./RouterPortModel";
import ServerModel from "./ServerModel";
import ServerPortModel from "./ServerPortModel";
import SwitchModel from "./SwitchModel";
import SwitchPortModel from "./SwitchPortModel";

export type LinkedModels = {
    source: RouterModel | SwitchModel | ServerModel; 
    target: RouterModel | SwitchModel | ServerModel; 
    sourcePort: RouterPortModel | SwitchPortModel | ServerPortModel; 
    targetPort: RouterPortModel | SwitchPortModel | ServerPortModel;
}

export default class LinkModel{
    
    private id: string
    private sourcePortId: string
    private targetPortId: string
    private sourceId: string
    private targetId: string
    private sourceLabel: string
    private targetLabel: string
    private networkId: string
    private projectId: string
    private session: Session;

    constructor(link:Link, session:Session){
        this.session = session;
        this.id = link.id;
        this.sourcePortId = link.sourcePort;
        this.targetPortId = link.targetPort;
        this.sourceId = link.source;
        this.targetId = link.target;
        this.sourceLabel = link.sourceLabel;
        this.targetLabel = link.targetLabel;
        this.networkId = link.networkId;
        this.projectId = link.projectId;
    }

    private getLinkedModels(){
        const source = this.session._diagram.selectDeviceById(this.sourceId);
        const target = this.session._diagram.selectDeviceById(this.targetId);
        const sourcePort = source.getPort(this.sourcePortId);
        const targetPort = target.getPort(this.targetPortId);
        return {source, target, sourcePort, targetPort} 
    }

    public getLinkModels(){
        return this.getLinkedModels();
    }

    public unlink(){
        const {sourcePort, targetPort} = this.getLinkedModels();
        sourcePort.unlink();
        targetPort.unlink();
    }

    public startLink(){
        const {sourcePort, targetPort} = this.getLinkedModels();
        sourcePort.link = this;
        targetPort.link = this;
        sourcePort.startLink(targetPort);
        targetPort.startLink(sourcePort);
    }

    public makeLink(){
        const {sourcePort, targetPort} = this.getLinkedModels();
        sourcePort.link = this;
        targetPort.link = this;
        sourcePort.makeLink(targetPort);
        targetPort.makeLink(sourcePort);
    }

    public prepareToUnlink(){
        const {sourcePort, targetPort} = this.getLinkedModels();
        sourcePort.prepareToUnlink();
        targetPort.prepareToUnlink();
    }

    public selectLink(port:Port){
        return this.sourcePortId == port.id || this.targetPortId == port.id;
    }

    public getLinkData():Link{
        return {
            id: this.id,
            sourcePort: this.sourcePortId,
            targetPort: this.targetPortId,
            source: this.sourceId,
            target: this.targetId,
            sourceLabel: this.sourceLabel,
            targetLabel: this.targetLabel,
            networkId: this.networkId,
            projectId: this.projectId
        }
    }

      
}