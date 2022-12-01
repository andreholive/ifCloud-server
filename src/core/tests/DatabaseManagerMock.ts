import DatabaseManager from '../../interfaces/DatabaseManager';
import { Device, Link, Port, PositionData } from "../diagram/Diagram";
import User from "../core-models/UserModel";
import { PortNetworkData } from '../Commands/ConnectPort';
import { PortState } from '../core-models/ServerPortModel';


let devices:Array<Device> = [{
    id: "123-6d61-4194-9660-5e4dfba56d61",
    name: "Debian",
    type: "cirros",
    instanceId: "07f9fb1d-6d61-4194-9660-5e4dfba56d61",
    projectId: "123",
    status: 2,
    locked: false,
    x: 350,
    y: 450,
    ports: [],
    device: 3
  },
  {
    id: "123-6d61-4194-9660-5e4dfba56d62",
    name: "Debian",
    type: "cirros",
    instanceId: "07f9fb1d-6d61-4194-9660-5e4dfba56d62",
    projectId: "123",
    status: 2,
    locked: false,
    x: 550,
    y: 450,
    ports: [],
    device: 3
  },
  {
    id: "123-6d61-4194-9660-5e4dfba56d63",
    name: "Roteador",
    type: "router",
    instanceId: "07f9fb1d-6d61-4194-9660-5e4dfba56d67",
    projectId: "123",
    status: 1,
    locked: false,
    x: 550,
    y: 100,
    ports: [],
    device: 1
  }];

let links:Array<Link> = [];

let ports:Array<Port> = [{
        id: "3f536b4a-a2ee-440a-a46a-c35b9756beaa",
        name: "eth0",
        deviceId: "123-6d61-4194-9660-5e4dfba56d61",
        status: 3,
        networkId: "",
        subnetId: "",
        macAddr: "",
        fixedIp: "",
        portId: "",
        enabled: true,
        state: PortState.disconnected
    },
    {
        id: "3f536b4a-a2ee-440a-a46a-c35b9756beab",
        name: "eth0",
        deviceId: "123-6d61-4194-9660-5e4dfba56d62",
        status: 3,
        networkId: "",
        subnetId: "",
        macAddr: "",
        fixedIp: "",
        portId: "",
        enabled: true,
        state: PortState.disconnected
},
{
    id: "3f536b4a-a2ee-440a-a46a-c35b9756beab",
    name: "eth0",
    deviceId: "123-6d61-4194-9660-5e4dfba56d63",
    status: 3,
    networkId: "asdfasdfasdfasdf",
    subnetId: "asdfasdfasdfasdfasd",
    macAddr: "ca:fe:fo:da:se",
    fixedIp: "192.168.0.1",
    portId: "asdfadfasdfasdfasdfads",
    enabled: true,
    state: PortState.disconnected
}];

function findOneDevice(deviceId:string):Device|undefined{
    return devices.find(device => device.id === deviceId);
}

export default class DataBaseManagerMock implements DatabaseManager{

    public async updateDeviceData(device: Device): Promise<void> {
        const index = devices.findIndex(dvc => dvc.id === device.id);
        devices[index] = device;
    }

    public async updatePortState(port: Port): Promise<void> {
        const index = ports.findIndex(p => p.id === port.id);
        ports[index] = port;
    }
    
    private fakePromise = async (delay:number) => { return new Promise((resolve) => { setTimeout(resolve, delay); }); };
    
    
    async cleanNetworkData(port: Port): Promise<void> {
        await this.fakePromise(2000);
        return;
    }
    async updatePortLinkType(port: Port): Promise<void> {
        await this.fakePromise(2000);
        return;
    }

    async updatePortNetworkData(port: Port, networkData: PortNetworkData): Promise<void> {
        await this.fakePromise(2000);
        return;
    }

    async getProjectDevices(user:User):Promise<Array<Device>>{
        let deviceList:Array<Device> = [];
        deviceList = devices.filter(device => device.projectId === user.sessionId);
        deviceList.forEach(device => {
            device.ports = ports.filter(port => port.deviceId === device.id);
        });
        return deviceList;
    }

    async getProjectLinks(user:User):Promise<Array<Link>>{
        let linkList = []
        linkList = links.filter(link => link.projectId === user.sessionId);
        return linkList;
    }

    async createDevice(device:Device):Promise<any>{
        devices.push(device);
        device.ports.forEach(port => {
            ports.push(port)
        })
        return device;
    }

    async deleteDevice(device:Device){
        const index = devices.findIndex(dvc => dvc.id === device.id);
        devices.splice(index, 1);
        return device; 
    }

    async deletePort(port:Port):Promise<void>{
        try {
            const index = ports.findIndex(p => p.id === port.id);
            ports.splice(index, 1);
            return;
        } catch (error) {
            throw Error('database error...');
        }
        
    }

    async createPorts(portsArray: Array<Port>):Promise<Array<Port>>{
        let createdPorts:Array<Port> = [];
        portsArray.forEach(port => {
            const device = findOneDevice(port.deviceId);
            if(device){
                createdPorts.push(port);
                ports.push(port);
            }
        });
        return createdPorts;
    }

    

    async updateDevicePosition(deviceId:string, position:PositionData):Promise<void>{
        try {
            const dvc = findOneDevice(deviceId);
            if(dvc){
                dvc.x = position.x;
                dvc.y = position.y;
            }
        } catch (error) {
            throw Error('database error...');
        }
    }

    async updateDeviceStatus(device:Device, status:number){
        
    }

    async updateDeviceLocked(device:Device, locked:boolean){
        
    }

    async createLink(link:Link):Promise<void>{
        links.push(link);
    }

    async deleteLink(id:string):Promise<void> {
        try {
            const index =links.findIndex(dvc => dvc.id === id);
            links.splice(index, 1);
            return;
        } catch (error) {
            throw Error('database error...');
        }
        
    }

    

}