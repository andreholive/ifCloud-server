"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var LinkModel_1 = __importDefault(require("../core-models/LinkModel"));
var RouterModel_1 = __importDefault(require("../core-models/RouterModel"));
var ServerModel_1 = __importDefault(require("../core-models/ServerModel"));
var SwitchModel_1 = __importDefault(require("../core-models/SwitchModel"));
var Diagram = /** @class */ (function () {
    function Diagram(session) {
        this.id = session.id;
        this.session = session;
        this.devices = {};
        this.links = {};
    }
    Diagram.prototype.getSession = function () {
        return this.session;
    };
    Diagram.prototype.addDevice = function (deviceData) {
        if (!this.devices[deviceData.id]) {
            if (deviceData.device === 3) {
                this.devices[deviceData.id] = new ServerModel_1.default(deviceData, this.session);
            }
            if (deviceData.device === 1) {
                this.devices[deviceData.id] = new RouterModel_1.default(deviceData, this.session);
            }
            if (deviceData.device === 2) {
                this.devices[deviceData.id] = new SwitchModel_1.default(deviceData, this.session);
            }
        }
    };
    Diagram.prototype.removeDevice = function (deviceData) {
        if (!this.devices[deviceData.id]) {
            delete this.devices[deviceData.id];
        }
    };
    Diagram.prototype.addLink = function (linkData) {
        if (!this.links[linkData.id]) {
            this.links[linkData.id] = new LinkModel_1.default(linkData, this.session);
            this.links[linkData.id].startLink();
        }
    };
    Diagram.prototype.deleteLink = function (linkData) {
        if (this.links[linkData.id]) {
            delete this.links[linkData.id];
        }
    };
    Diagram.prototype.getDeviceByInstanceId = function (id) {
        return Object.values(this.devices).find(function (device) { return device.selectDevice(id); });
    };
    Diagram.prototype.selectLinkByPort = function (port) {
        var link = Object.values(this.links).find(function (link) { return link.selectLink(port); });
        return link;
    };
    Diagram.prototype.selectDeviceById = function (id) {
        return this.devices[id];
    };
    Diagram.prototype.getLink = function (linkData) {
        return this.links[linkData.id];
    };
    Diagram.prototype.getDevices = function () {
        return this.devices;
    };
    Diagram.prototype.getLinks = function () {
        return this.links;
    };
    return Diagram;
}());
exports.default = Diagram;
