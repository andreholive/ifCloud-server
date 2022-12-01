import { Device, Port } from "../diagram/Diagram";
import User from "../core-models/UserModel";
import CloudManager from "../../interfaces/CloudManager";
import { SubnetData, SubnetResponse, AddRouterInterfaceResponse, PortDetailsResponse } from "../../interfaces/OpenstackResponses";
import { PortNetworkData } from "../Commands/ConnectPort";
import ServerPortModel from "../core-models/ServerPortModel";

type Info = {
  id: string, 
  task_state: null | string,
  vm_state: string,
  power_state: number
}

const infos:Array<Info> = [{
  id:'07f9fb1d-6d61-4194-9660-5e4dfba56d61', 
  task_state: null,
  vm_state: 'active',
  power_state: 4
},
{
  id:'07f9fb1d-6d61-4194-9660-5e4dfba56d62', 
  task_state: null,
  vm_state: 'active',
  power_state: 4
}]

export type InstanceInformation = {
  id: string,
  task_state: string|null,
  vm_state: string,
  power_state: number
}

export default class CloudManagerMock implements CloudManager{

    private UID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
      });
    }

    private generateMacAddr(){
      var hexDigits = "0123456789abcdef";
      var macAddress = "ca:fe:00:";
      for (var i = 0; i < 3; i++) {
          macAddress+=hexDigits.charAt(Math.round(Math.random() * 15));
          macAddress+=hexDigits.charAt(Math.round(Math.random() * 15));
          if (i != 2) macAddress += ":";
      }
      return macAddress;
    }

    private fakePromise = async (delay:number) => { return new Promise((resolve) => { setTimeout(resolve, delay); }); };

    async createSubnet(subnetData: SubnetData, user: User): Promise<SubnetResponse> {
      await this.fakePromise(1000);
      const response:SubnetResponse = {
        network_id: this.UID(),
        ip_version: 4,
        cidr: "192.168.0.0/24",
        enable_dhcp: true,
        gateway_ip: "192.168.0.1",
        allocation_pools: [{ start: "192.168.0.100", end: "192.168.0.199" }],
        dns_nameservers: ["8.8.8.8", "8.8.4.4"],
        id: "",
        name: "",
        tenant_id: "",
        subnetpool_id: null,
        ipv6_ra_mode: null,
        ipv6_address_mode: null,
        host_routes: [],
        description: "",
        service_types: [],
        tags: [],
        created_at: "",
        updated_at: "",
        revision_number: 0,
        project_id: ""
      }
      return response
    }
    
    async connectDevice(serverPort: ServerPortModel, user: User): Promise<PortNetworkData> {
      await this.fakePromise(1000);
        return {
          net_id: serverPort.networkId,
          port_id: this.UID(),
          mac_addr: this.generateMacAddr(),
          port_state: 'ACTIVE',
          fixed_ips: [{ip_address: `192.168.0.${Math.floor(254)}`, subnet_id:this.UID()}]
        }
    }

    async disconnectDevice(serverPort: ServerPortModel, user: User): Promise<void> {
      await this.fakePromise(1000);
    }

    async addRouterInterface(router: Device, subnet_id: string, user: User): Promise<AddRouterInterfaceResponse> {
      await this.fakePromise(1000);
      return {
        id: "123",
        tenant_id: "123",
        port_id: this.UID(),
        network_id: this.UID(),
        subnet_id,
        subnet_ids: []
      }
    }

    async deleteRouterInterface(router: Device, subnet_id: string, user: User): Promise<void> {
      await this.fakePromise(1000);
    }

    async enablePort(port: Port, user: User): Promise<void> {
      await this.fakePromise(1000);
    }

    async disablePort(port: Port, user: User): Promise<void> {
      await this.fakePromise(1000);
    }

    async getPortDetails(port: Port, user: User): Promise<PortDetailsResponse> {
      return {
        id: port.portId,
        name: port.name,
        network_id: this.UID(),
        tenant_id: this.UID(),
        mac_address: this.generateMacAddr(),
        admin_state_up: true,
        status: "ACTIVE",
        device_id: this.UID(),
        device_owner: "",
        fixed_ips: [{ subnet_id: this.UID(), ip_address: "192.168.0.1"}],
        allowed_address_pairs: [],
        extra_dhcp_opts: [],
        security_groups: [],
        description: "",
        "binding:vnic_type": "",
        "binding:profile": undefined,
        "binding:host_id": "",
        "binding:vif_type": "",
        "binding:vif_details": undefined,
        port_security_enabled: false,
        tags: [],
        created_at: "",
        updated_at: "",
        revision_number: 0,
        project_id: "123"
      }
    }
  
    async deleteSubNet(port: Port, user: User): Promise<void> {
      await this.fakePromise(1000);
    }

    async deleteNetwork(port: Port, user: User): Promise<void> {
      await this.fakePromise(1000);
    }

    async getInstanceInformations(user:User):Promise<Array<InstanceInformation>>{
      return infos;
    }

    async addInstance(device:Device, user:User):Promise<string>{
        var id = this.UID();
        const i = infos.push({
          id, 
          task_state: 'building',
          vm_state: 'active',
          power_state: 2
        });

        setTimeout(()=>{
          infos[i-1].task_state = 'starting';
          setTimeout(()=>{
            infos[i-1].task_state = null;
            infos[i-1].power_state = 1;
          }, 2000);
        }, 1500);
        return id;
    }

    async removeInstance(device:Device, user:User):Promise<void>{
      await this.fakePromise(2000);
      const index = infos.findIndex(info => info.id === device.instanceId);
      infos.splice(index, 1);
    }

    async instancePowerOn(device:Device, user:User):Promise<void>{
      setTimeout(()=> {
        const info = infos.find(info => info.id === device.instanceId);
        if(info)info.power_state = 1;
      },3000)
    }

    async instancePowerOff(device:Device, user:User):Promise<void>{
      setTimeout(()=> {
        const info = infos.find(info => info.id === device.instanceId);
        if(info)info.power_state = 4;
      },3000)
    }

    async instanceReboot(device:Device, user:User):Promise<void>{
      const info = infos.find(info => info.id === device.instanceId);
      if(info){
        info.task_state = 'restarting';
        setTimeout(()=>{info.task_state=null}, 5000);
      }
    }

  async createRouter(device:Device, user:User):Promise<string>{
    var id = this.UID();
    return id;
    
  }

  async deleteRouter(device:Device, user:User):Promise<void>{
    this.fakePromise(1000);
  }



  async createNetwork(name:string, user:User):Promise<string>{
    var id = this.UID();
    return id;
  }
    

  async getConsoleUrl(device:Device, user:User):Promise<string>{
      return "http://www.amazon.com";
  }

}