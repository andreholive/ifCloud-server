"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServerPortModel_1 = require("./ServerPortModel");
var PortModel = /** @class */ (function () {
    function PortModel(portData, parent) {
        var _this = this;
        this.getParent = function () { return _this.parent; };
        this.id = portData.id;
        this.name = portData.name;
        this.status = portData.status;
        this.networkId = portData.networkId;
        this.subnetId = portData.subnetId;
        this.deviceId = portData.deviceId;
        this.parent = parent;
        this.portId = portData.portId;
        this.macAddr = portData.macAddr;
        this.fixedIp = portData.fixedIp;
        this.subnetId = portData.subnetId;
        this.state = portData.state || ServerPortModel_1.PortState.disconnected;
        this.connectedPort = null;
        this.link = null;
        this.enabled = portData.enabled;
        this.gatewayPort = null;
    }
    PortModel.prototype.setGateway = function (gatewayPort) {
        this.gatewayPort = gatewayPort;
    };
    PortModel.prototype.getConnectedPort = function () {
        var _this = this;
        if (this.link) {
            var _a = this.link.getLinkModels(), sourcePort = _a.sourcePort, targetPort = _a.targetPort;
            var connectedPort = [sourcePort, targetPort].filter(function (port) { return port.id !== _this.id; });
            return connectedPort[0];
        }
        else {
            throw new Error("No link");
        }
    };
    PortModel.prototype.haveGateway = function () {
        return this.gatewayPort !== null;
    };
    PortModel.prototype.removeGateway = function () {
        this.gatewayPort = null;
    };
    PortModel.prototype.isLinked = function () {
        return this.link !== null;
    };
    PortModel.prototype.getPortData = function () {
        return {
            id: this.id,
            name: this.name,
            deviceId: this.deviceId,
            status: this.status,
            networkId: this.networkId,
            subnetId: this.subnetId,
            portId: this.portId,
            macAddr: this.macAddr,
            fixedIp: this.fixedIp,
            state: this.state,
            enabled: this.enabled
        };
    };
    PortModel.prototype.setLink = function (link) {
        this.link = link;
    };
    PortModel.prototype.getLink = function () {
        return this.link;
    };
    PortModel.prototype.setNetworkData = function (data) {
        this.macAddr = data.mac_addr;
        this.networkId = data.net_id;
        this.portId = data.port_id;
        this.fixedIp = data.fixed_ips[0].ip_address;
        this.subnetId = data.fixed_ips[0].subnet_id;
    };
    PortModel.prototype.cleanNetworkData = function () {
        this.networkId = "";
        this.subnetId = "";
        this.portId = "";
        this.macAddr = "";
        this.fixedIp = "";
    };
    return PortModel;
}());
exports.default = PortModel;
