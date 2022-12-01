import Command from "./Command";
import { CommandData, DiagramFunction } from "../managers/CommandManager";
import { Port } from "../diagram/Diagram";
import ResponseCommand from "./ResponseCommand";
import TokenExpired from "../errors/TokenExpired";
import PortLimiterror from "../errors/PortLimit";
import RouterModel from "../core-models/RouterModel";
import ServerModel from "../core-models/ServerModel";
import SwitchModel from "../core-models/SwitchModel";
import { SubnetData } from "../../interfaces/OpenstackResponses";

export default class AddRouterPort extends Command<Port>{
    response: ResponseCommand<Port>;
    
    constructor(commandData:CommandData){
        super(commandData);
        this.response = new ResponseCommand<Port>(commandData);
        this.function = async () => {
            try {
                const device = this.diagram.selectDeviceById(this.data.deviceId);
                const subnetData = this.makeSubnetData(device);
                const networkId = await this.engine._cloudMngr.createNetwork(this.data.name, this.user);
                subnetData.network_id = networkId;
                const subnet = await this.engine._cloudMngr.createSubnet(subnetData, this.user);
                const port = await this.engine._cloudMngr.addRouterInterface(device.getDeviceData(), subnet.id, this.user);
                this.data.networkId = networkId;
                this.data.subnetId = subnet.id;
                this.data.fixedIp = subnet.gateway_ip;
                this.data.portId = port.port_id;
                const portDetails = await this.engine._cloudMngr.getPortDetails(this.data,this.user);
                this.data.macAddr = portDetails.mac_address;
                await this.engine._databaseMngr.createPorts([this.data]);
                this.response.send(this.data);
            } catch (error:any) {
                if(error instanceof TokenExpired){
                    this.response.sendCommand(DiagramFunction.gotoLogin, this.data);
                }
                if(error instanceof PortLimiterror){
                    console.log('Port Limit')
                }
            }
        }
    }

    makeSubnetData(device:RouterModel | SwitchModel | ServerModel):SubnetData{
        const subnet1 = {
            network_id: '',
            ip_version: 4,
            cidr: "192.168.0.0/24",
            enable_dhcp: true,
            gateway_ip: "192.168.0.1",
            allocation_pools: [{start:"192.168.0.30",end:"192.168.0.50"}],
            dns_nameservers: ['8.8.8.8','8.8.4.4']
        }
        const subnet2 = {
            network_id: '',
            ip_version: 4,
            cidr: "10.0.0.0/24",
            enable_dhcp: true,
            gateway_ip: "10.0.0.1",
            allocation_pools: [{start:"10.0.0.100",end:"10.0.0.150"}],
            dns_nameservers: ['8.8.8.8','8.8.4.4']
        }
        if(device.getPorts().length == 0){
            return subnet1;
        }
        if(device.getPorts().length == 1){
            return subnet2;
        }
        throw new PortLimiterror();
    }

}