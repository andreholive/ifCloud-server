"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DeviceModel = /** @class */ (function () {
    function DeviceModel(device, session) {
        var _this = this;
        this.getStatus = function () { return _this.status; };
        this._session = session;
        this._id = device.id;
        this.name = device.name;
        this.type = device.type;
        this.device = device.device;
        this._instanceId = device.instanceId;
        this.projectId = device.projectId;
        this.status = device.status;
        this.locked = device.locked;
        this.x = device.x;
        this.y = device.y;
        this.ports = {};
    }
    Object.defineProperty(DeviceModel.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DeviceModel.prototype, "session", {
        get: function () {
            return this._session;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DeviceModel.prototype, "instanceId", {
        get: function () {
            return this._instanceId;
        },
        set: function (id) {
            this._instanceId = id;
        },
        enumerable: false,
        configurable: true
    });
    DeviceModel.prototype.setStatus = function (status) {
        this.status = status;
    };
    DeviceModel.prototype.setPosition = function (position) {
        this.x = position.x;
        this.y = position.y;
    };
    DeviceModel.prototype.deletePort = function (port) {
        delete this.ports[port.id];
    };
    DeviceModel.prototype.selectDevice = function (id) {
        if (id == this.id || id == this.instanceId) {
            return true;
        }
        return false;
    };
    DeviceModel.prototype.getDeviceData = function () {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            device: this.device,
            instanceId: this._instanceId,
            projectId: this.projectId,
            status: this.status,
            locked: this.locked,
            x: this.x,
            y: this.y,
            ports: Object.values(this.ports).flatMap(function (port) { return port.getPortData(); })
        };
    };
    DeviceModel.prototype.isDevice = function (type) {
        return this.device === type;
    };
    DeviceModel.prototype.hasPorts = function () {
        return Object.values(this.ports).length !== 0;
    };
    DeviceModel.prototype.getPorts = function () {
        var portsArray = [];
        for (var id in this.ports) {
            portsArray.push(this.ports[id]);
        }
        return portsArray;
    };
    DeviceModel.prototype.getPort = function (id) {
        return this.ports[id];
    };
    return DeviceModel;
}());
exports.default = DeviceModel;
