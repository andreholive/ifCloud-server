"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ServerPortModel_1 = require("../core-models/ServerPortModel");
var devices = [{
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
var links = [];
var ports = [{
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
        state: ServerPortModel_1.PortState.disconnected
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
        state: ServerPortModel_1.PortState.disconnected
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
        state: ServerPortModel_1.PortState.disconnected
    }];
function findOneDevice(deviceId) {
    return devices.find(function (device) { return device.id === deviceId; });
}
var DataBaseManagerMock = /** @class */ (function () {
    function DataBaseManagerMock() {
        var _this = this;
        this.fakePromise = function (delay) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { setTimeout(resolve, delay); })];
        }); }); };
    }
    DataBaseManagerMock.prototype.updateDeviceData = function (device) {
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                index = devices.findIndex(function (dvc) { return dvc.id === device.id; });
                devices[index] = device;
                return [2 /*return*/];
            });
        });
    };
    DataBaseManagerMock.prototype.updatePortState = function (port) {
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                index = ports.findIndex(function (p) { return p.id === port.id; });
                ports[index] = port;
                return [2 /*return*/];
            });
        });
    };
    DataBaseManagerMock.prototype.cleanNetworkData = function (port) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakePromise(2000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DataBaseManagerMock.prototype.updatePortLinkType = function (port) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakePromise(2000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DataBaseManagerMock.prototype.updatePortNetworkData = function (port, networkData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakePromise(2000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DataBaseManagerMock.prototype.getProjectDevices = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var deviceList;
            return __generator(this, function (_a) {
                deviceList = [];
                deviceList = devices.filter(function (device) { return device.projectId === user.sessionId; });
                deviceList.forEach(function (device) {
                    device.ports = ports.filter(function (port) { return port.deviceId === device.id; });
                });
                return [2 /*return*/, deviceList];
            });
        });
    };
    DataBaseManagerMock.prototype.getProjectLinks = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var linkList;
            return __generator(this, function (_a) {
                linkList = [];
                linkList = links.filter(function (link) { return link.projectId === user.sessionId; });
                return [2 /*return*/, linkList];
            });
        });
    };
    DataBaseManagerMock.prototype.createDevice = function (device) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                devices.push(device);
                device.ports.forEach(function (port) {
                    ports.push(port);
                });
                return [2 /*return*/, device];
            });
        });
    };
    DataBaseManagerMock.prototype.deleteDevice = function (device) {
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                index = devices.findIndex(function (dvc) { return dvc.id === device.id; });
                devices.splice(index, 1);
                return [2 /*return*/, device];
            });
        });
    };
    DataBaseManagerMock.prototype.deletePort = function (port) {
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                try {
                    index = ports.findIndex(function (p) { return p.id === port.id; });
                    ports.splice(index, 1);
                    return [2 /*return*/];
                }
                catch (error) {
                    throw Error('database error...');
                }
                return [2 /*return*/];
            });
        });
    };
    DataBaseManagerMock.prototype.createPorts = function (portsArray) {
        return __awaiter(this, void 0, void 0, function () {
            var createdPorts;
            return __generator(this, function (_a) {
                createdPorts = [];
                portsArray.forEach(function (port) {
                    var device = findOneDevice(port.deviceId);
                    if (device) {
                        createdPorts.push(port);
                        ports.push(port);
                    }
                });
                return [2 /*return*/, createdPorts];
            });
        });
    };
    DataBaseManagerMock.prototype.updateDevicePosition = function (deviceId, position) {
        return __awaiter(this, void 0, void 0, function () {
            var dvc;
            return __generator(this, function (_a) {
                try {
                    dvc = findOneDevice(deviceId);
                    if (dvc) {
                        dvc.x = position.x;
                        dvc.y = position.y;
                    }
                }
                catch (error) {
                    throw Error('database error...');
                }
                return [2 /*return*/];
            });
        });
    };
    DataBaseManagerMock.prototype.updateDeviceStatus = function (device, status) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DataBaseManagerMock.prototype.updateDeviceLocked = function (device, locked) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    DataBaseManagerMock.prototype.createLink = function (link) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                links.push(link);
                return [2 /*return*/];
            });
        });
    };
    DataBaseManagerMock.prototype.deleteLink = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                try {
                    index = links.findIndex(function (dvc) { return dvc.id === id; });
                    links.splice(index, 1);
                    return [2 /*return*/];
                }
                catch (error) {
                    throw Error('database error...');
                }
                return [2 /*return*/];
            });
        });
    };
    return DataBaseManagerMock;
}());
exports.default = DataBaseManagerMock;
