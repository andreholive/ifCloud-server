"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LinkModel_1 = __importDefault(require("../core-models/LinkModel"));
var DiagramListener = /** @class */ (function () {
    function DiagramListener(diagram) {
        var _this = this;
        this.createDevice = function (device) {
            _this.diagram.addDevice(device);
        };
        this.changeDevicePosition = function (device) {
            //todo
        };
        this.removeDevice = function (device) {
            delete _this.diagram.getDevices()[device.id];
            console.log("Device ".concat(device.id, " Deleted!"));
        };
        this.deleteLink = function (link) {
            _this.diagram.deleteLink(link);
        };
        this.accessVncUrl = function (data) {
            //todo or nothing todo?
        };
        this.disconnectPort = function (link) {
            //todo
        };
        this.deletePort = function (port) {
            var device = _this.diagram.selectDeviceById(port.deviceId);
            if (device)
                device.deletePort(port);
        };
        this.moveDevice = function (data) { };
        this.connectPort = function (dport) {
        };
        this.updateInstanceStatus = function (dvc) {
            var device = _this.diagram.selectDeviceById(dvc.id);
            if (device) {
                device.setStatus(dvc.status);
            }
        };
        this.getInstanceStatus = function (dvc) {
        };
        this.deleteDevice = function (data) { };
        this.connectDevice = function (data) { };
        this.instancePowerOn = function (instanceData) {
            var device = _this.diagram.selectDeviceById(instanceData.id);
            if (device) {
                device.setStatus(1);
            }
        };
        this.instancePowerOff = function (instanceData) {
            var device = _this.diagram.selectDeviceById(instanceData.id);
            if (device) {
                device.setStatus(4);
            }
        };
        this.deviceReboot = function (instanceData) {
            //todo
        };
        this.id = diagram.id;
        this.diagram = diagram;
    }
    DiagramListener.prototype.diagramLoad = function (response) {
        var _this = this;
        response.devices.forEach(function (device) {
            _this.diagram.addDevice(device);
        });
        response.links.forEach(function (link) {
            _this.diagram.addLink(link);
        });
    };
    DiagramListener.prototype.createLink = function (link) {
        if (!this.diagram.getLinks()[link.id]) {
            this.diagram.getLinks()[link.id] = new LinkModel_1.default(link, this.diagram.getSession());
        }
    };
    DiagramListener.prototype.gotoLogin = function () {
    };
    DiagramListener.prototype.addRouterPort = function (port) {
        var device = this.diagram.selectDeviceById(port.deviceId);
        if (device)
            device.addPort(port);
    };
    DiagramListener.prototype.removeRouterPort = function (port) {
        var device = this.diagram.selectDeviceById(port.deviceId);
        if (device)
            device.deletePort(port);
    };
    DiagramListener.prototype.portRemove = function (response) {
        var device = this.diagram.selectDeviceById(response.data.deviceId);
        if (device) {
            device.deletePort(response.data.id);
        }
    };
    DiagramListener.prototype.enableLink = function (linkData) {
        var link = this.diagram.getLink(linkData);
        var _a = link.getLinkModels(), sourcePort = _a.sourcePort, targetPort = _a.targetPort;
        sourcePort.enabled = true;
        targetPort.enabled = true;
    };
    DiagramListener.prototype.disableLink = function (linkData) {
        var link = this.diagram.getLink(linkData);
        var _a = link.getLinkModels(), sourcePort = _a.sourcePort, targetPort = _a.targetPort;
        sourcePort.enabled = false;
        targetPort.enabled = false;
    };
    return DiagramListener;
}());
exports.default = DiagramListener;
