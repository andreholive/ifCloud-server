import axios from 'axios';

import deviceList from '../../config/deviceList.json'
import CloudManagerInterface from '../../interfaces/CloudManager';
import { AddRouterInterfaceResponse, PortDetailsResponse, SubnetData, SubnetResponse } from '../../interfaces/OpenstackResponses';
import { PortNetworkData } from '../Commands/ConnectPort';
import ServerPortModel from '../core-models/ServerPortModel';
import User from '../core-models/UserModel';
import { Device, Port } from '../diagram/Diagram';
import Error404 from '../errors/Error404';
import TokenExpired from '../errors/TokenExpired';

export type InstanceInformation = {
  id: string,
  task_state: string|null,
  vm_state: string,
  power_state: number
}


const BASE_URL = 'http://192.168.0.104';
const PUBLIC_NETWORk_ID = '12c69d0e-6263-4ab0-8d83-0423241e41d2';

const computeApi = axios.create({baseURL: `${BASE_URL}/compute/v2.1`});
const networkApi = axios.create({baseURL: `${BASE_URL}:9696/networking`});

export default class OpenstackCloudManager implements CloudManagerInterface{
    
    constructor(){}

    private buildHeader(user:User){
      return {
        headers:{  
            "X-Auth-Token": user.token,
            "OpenStack-API-Version": "compute 2.37"
        }
      };
    }

    private getInstanceData(device:Device){
      const instanceData = Object.values(deviceList.devices).find(dvc => dvc.name === device.type);
      return {
        server: {
        name: device.name,
        ...instanceData
        }
      }
    }

    async getInstanceInformations(user:User):Promise<Array<InstanceInformation>>{
      try {
        const response = await computeApi.get('/servers/detail', this.buildHeader(user));
        let instanceInformations:Array<InstanceInformation> = [];
        Object.values(response.data.servers).forEach((server:any) => {
          instanceInformations.push({
            id:server.id, 
            task_state: server['OS-EXT-STS:task_state'],
            vm_state: server['OS-EXT-STS:vm_state'],
            power_state: server['OS-EXT-STS:power_state']
          });
        })
        return instanceInformations;
        } catch (error:any) {
          if(error.response.status == 401){
            throw new TokenExpired('');
          }
          throw new Error('');
        }
    }

    async connectDevice(serverPort:ServerPortModel, user: User):Promise<PortNetworkData> {
      const requestBody = {interfaceAttachment: {net_id:serverPort.networkId}}
      try {
        const response = await computeApi.post(`/servers/${serverPort.getParent().instanceId}/os-interface`, requestBody, this.buildHeader(user));
        return response.data.interfaceAttachment;
      }catch(error:any){
        if(error.response?.status == 404){
          throw new Error404('');
        }
        if(error.response.status == 401){
          throw new TokenExpired('');
        }
        throw Error();
      }
    }

    async disconnectDevice(serverPort:ServerPortModel, user: User):Promise<void> {
      try {
        await computeApi.delete(`/servers/${serverPort.getParent().instanceId}/os-interface/${serverPort.portId}`, this.buildHeader(user));
      }catch(error:any){
        if(error.response?.status == 404){
          throw new Error404('');
        }
        if(error.response?.status == 401){
          throw new TokenExpired('');
        }
        throw Error();
      }
    }

    async addInstance(device:Device, user:User):Promise<string>{
      const requestBody = this.getInstanceData(device);
      try {
        const response = await computeApi.post('/servers', requestBody, this.buildHeader(user));
        return response.data.server.id;
        }catch(error:any){
          console.log(error.response.data)
        if(error.response.status == 401){
          throw new TokenExpired('');
        }
        throw Error();
      }
    }

    async removeInstance(device:Device, user:User):Promise<void>{
      try {
        await computeApi.delete(`/servers/${device.instanceId}`, this.buildHeader(user));
        }catch(error:any){
          if(error.response.status == 404){
            throw new Error404('');
          }
          if(error.response.status == 401){
            throw new TokenExpired('');
          }
        }
    }

    async instancePowerOn(device:Device, user:User):Promise<void>{
      try{
      const requestBody = {"os-start":null}
      await computeApi.post(`/servers/${device.instanceId}/action`, requestBody, this.buildHeader(user));
      }catch(error:any){
        if(error.response.status == 404){
          throw new Error404('');
        }
        if(error.response.status == 401){
          throw new TokenExpired('');
        }
      }
    }

    async instancePowerOff(device:Device, user:User):Promise<void>{
      try{
      const requestBody = {"os-stop":null}
      await computeApi.post(`/servers/${device.instanceId}/action`, requestBody, this.buildHeader(user));
      }catch(error:any){
        if(error.response.status == 404){
          throw new Error404('');
        }
        if(error.response.status == 401){
          throw new TokenExpired('');
        }
      }
    }

    async instanceReboot(device:Device, user:User):Promise<void>{
      try{
      const requestBody = {"reboot":{"type":"SOFT"}}
      await computeApi.post(`/servers/${device.instanceId}/action`, requestBody, this.buildHeader(user));
      }catch(error:any){
      if(error.response.status == 404){
        throw new Error404('');
      }
      if(error.response.status == 401){
        throw new TokenExpired('');
      }
    }
  }

  async getConsoleUrl(device:Device, user:User):Promise<string>{
    const requestBody = {"remote_console": {"protocol": "vnc",
          "type": "novnc"}}
    try{
      const res = await computeApi.post(`/servers/${device.instanceId}/remote-consoles`, requestBody, this.buildHeader(user));
      return res.data.remote_console.url;
    }catch(error:any){
      if(error.response.status == 401){
        throw new TokenExpired('');
      }
      throw Error();
    }
  }

  async createRouter(device:Device, user:User):Promise<string>{
    try 
    {
    const requestBody = {router:{
        name: device.name,
        external_gateway_info: {
            network_id: PUBLIC_NETWORk_ID
        }
    }}
    const response = await networkApi.post('/v2.0/routers', requestBody, this.buildHeader(user))
    return response.data.router.id
    }catch(error:any){
      console.log(error.response)
    if(error.response.status == 401){
      throw new TokenExpired('');
    }
    throw Error();
    }
  }

  async addRouterInterface(router:Device, subnet_id:string, user:User):Promise<AddRouterInterfaceResponse>{
    try {
      const requestBody = {subnet_id}
      const response = await networkApi.put(`/v2.0/routers/${router.instanceId}/add_router_interface`, requestBody, this.buildHeader(user));
      return response.data;
    }catch(error:any){
    if(error.response.status == 401){
      throw new TokenExpired('');
    }
    throw Error();
    }
  }

  async getPortDetails(port:Port, user:User):Promise<PortDetailsResponse>{
    try {
      const response = await networkApi.get(`/v2.0/ports/${port.portId}`, this.buildHeader(user));
      return response.data.port;
    } catch (error:any) {
      if(error.response.status == 401){
        throw new TokenExpired('');
      }
      throw Error();
    }
  }

  async deleteRouterInterface(router:Device, subnet_id:string, user:User):Promise<void>{
    try {
      const requestBody = {subnet_id}
      await networkApi.put(`/v2.0/routers/${router.instanceId}/remove_router_interface`, requestBody, this.buildHeader(user));
    }catch(error:any){
    if(error.response.status == 401){
      throw new TokenExpired('');
    }
    if(error.response.status == 404){
      throw new Error404('');
    }
    throw Error();
    }
  }

  async deleteRouter(device:Device, user:User):Promise<void>{
      try {
          await networkApi.delete(`/v2.0/routers/${device.instanceId}`, this.buildHeader(user))
      } catch (error:any) {
        if(error.response.status == 404){
          throw new Error404('');
        }
        if(error.response.status == 401){
          throw new TokenExpired('');
        }
      }
  }

  async createNetwork(name:string, user:User):Promise<string>{
      const network = {network: {
        name, 
        "mtu": 1400,
      }}
      try {
          const response = await networkApi.post('/v2.0/networks', network, this.buildHeader(user));
          return response.data.network.id;        
        }catch(error:any){
        if(error.response.status == 401){
          throw new TokenExpired('');
        }
        throw Error();
        }
  }

  async deleteNetwork(port:Port, user:User):Promise<void>{
    try {
      await networkApi.delete(`/v2.0/networks/${port.networkId}`, this.buildHeader(user));       
    }catch(error:any){
    if(error.response.status == 401){
      throw new TokenExpired('');
    }
    throw Error();
    }
  }

  async createSubnet(subnetData:SubnetData, user:User):Promise<SubnetResponse>
    {
        const requestBody={subnet: subnetData}
        
        try {
            const response = await networkApi.post('/v2.0/subnets', requestBody, this.buildHeader(user));
            return response.data.subnet;
          }catch(error:any){
          if(error.response.status == 401){
            throw new TokenExpired('');
          }
          throw Error();
          }
    }

    async deleteSubNet(port:Port, user:User):Promise<void>{
      try {
        await networkApi.delete(`/v2.0/subnets/${port.subnetId}`, this.buildHeader(user));       
      }catch(error:any){
      if(error.response.status == 401){
        throw new TokenExpired('');
      }
      throw Error();
      }
    }

    async enablePort(port:Port, user:User):Promise<void>{
      try{
          const data = {"port": {"admin_state_up": true}}
          await networkApi.put(`/v2.0/ports/${port.portId}`, data, this.buildHeader(user));
      }catch(error:any){
        if(error.response.status == 401){
          throw new TokenExpired('');
        }
        throw Error();
      }
    }

    async disablePort(port:Port, user:User):Promise<void>{
      try{
          const data = {"port": {"admin_state_up": false}}
          await networkApi.put(`/v2.0/ports/${port.portId}`, data, this.buildHeader(user));
      }catch(error:any){
        if(error.response.status == 401){
          throw new TokenExpired('');
        }
        throw Error();
      }
    }
}