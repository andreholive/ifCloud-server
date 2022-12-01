import Devices from '../../models/device';
import Links from '../../models/link'
import Ports from '../../models/port';
import DatabaseManager from '../../interfaces/DatabaseManager';
import { Device, Link, Port, PositionData } from '../diagram/Diagram';
import User from '../core-models/UserModel';

export default class SQLDatabaseManager implements DatabaseManager{
  
    async getProjectLinks(user: User): Promise<Link[]> {
      const projectLinks:Array<any> = await Links.findAll({where: {projectId: user.sessionId}});
        const links:Array<Link> = []
        projectLinks.forEach(projectLinks => {
          links.push({
            id: projectLinks.id,
            sourcePort: projectLinks.sourcePort,
            targetPort: projectLinks.targetPort,
            source: projectLinks.source,
            target: projectLinks.target,
            sourceLabel: projectLinks.sourceLabel,
            targetLabel: projectLinks.targetLabel,
            networkId: projectLinks.network_id,
            projectId: projectLinks.projectId,
        })
        });
        return links;
    }

    async createLink(link: Link): Promise<void> {
      try {
        await Links.create(link);
      } catch (error) {
        throw new Error('Link Create Error');
      }
    }

    async deleteLink(id:string): Promise<void> {
      try {
        await Links.destroy({where: {id: id}});
      } catch (error) {
        throw new Error('Link Delete Error');
      }
      
    }

    async deletePort(port: Port):Promise<void> {
      try {
        await Ports.destroy({where: {id: port.id}});
      } catch (error) {
        throw new Error('Port Delete Error');
      }
      
    }

    private buildDevicePorts(ports:Array<Port>){
      let devicePorts: Array<Port> = [];
      ports.forEach(port => {
      devicePorts.push({
        id: port.id,
        name: port.name,
        deviceId: port.deviceId,
        status: port.status,
        networkId: port.networkId,
        subnetId: port.subnetId,
        portId: port.portId,
        macAddr: port.macAddr,
        fixedIp: port.fixedIp,
        state: port.state,
        enabled: port.enabled
      })
      })
      return devicePorts;
    }
    
    async getProjectDevices(user:User):Promise<Array<Device>>{
        const projectDevices:Array<any> = await Devices.findAll({where: {projectId: user.sessionId}, include: Ports});
        const devices:Array<Device> = []
        projectDevices.forEach(projectDevice => {
          devices.push({
            id: projectDevice.id,
            name: projectDevice.name,
            type: projectDevice.type,
            device: projectDevice.device,
            instanceId: projectDevice.instanceId,
            projectId: projectDevice.projectId,
            status: projectDevice.status,
            locked: projectDevice.locked,
            x: projectDevice.x,
            y: projectDevice.y,
            ports: this.buildDevicePorts(projectDevice.ports)
          })
        });
        return devices;
    }
    async createDevice(device:Device):Promise<any>{
        const dvc = await Devices.create(device);
        await this.createPorts(device.ports);
       
        return dvc;
    }

    async deleteDevice(device:Device){
        const dvc = await Devices.destroy({where: {id: device.id}});
        return dvc; 
    }

    async createPorts(portsArray: Array<Port>):Promise<Array<any>>{
        const ports = await Ports.bulkCreate(portsArray);
        return ports;
    }

    async updateDevicePosition(deviceId:string, position:PositionData):Promise<void>{
        await Devices.update({ x: position.x, y: position.y }, {
            where: {
              id: deviceId
            }
          });
    }

    async updatePortState(port:Port):Promise<void>{
      try {
        await Ports.update(port, {where: {id: port.id}});
      } catch (error) {
          throw Error();
      }
      
    }

    async updateDeviceStatus(device:Device, status:number){
        await Devices.update({ status }, {
            where: {
              id: device.id
            }
          });
    }

    async updateDeviceData(device:Device):Promise<void>{
        await Devices.update(device, { where: { id: device.id } });
    }

}