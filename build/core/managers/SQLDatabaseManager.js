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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var device_1 = __importDefault(require("../../models/device"));
var link_1 = __importDefault(require("../../models/link"));
var port_1 = __importDefault(require("../../models/port"));
var SQLDatabaseManager = /** @class */ (function () {
    function SQLDatabaseManager() {
    }
    SQLDatabaseManager.prototype.getProjectLinks = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var projectLinks, links;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, link_1.default.findAll({ where: { projectId: user.sessionId } })];
                    case 1:
                        projectLinks = _a.sent();
                        links = [];
                        projectLinks.forEach(function (projectLinks) {
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
                            });
                        });
                        return [2 /*return*/, links];
                }
            });
        });
    };
    SQLDatabaseManager.prototype.createLink = function (link) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, link_1.default.create(link)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error('Link Create Error');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SQLDatabaseManager.prototype.deleteLink = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, link_1.default.destroy({ where: { id: id } })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error('Link Delete Error');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SQLDatabaseManager.prototype.deletePort = function (port) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, port_1.default.destroy({ where: { id: port.id } })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error('Port Delete Error');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SQLDatabaseManager.prototype.buildDevicePorts = function (ports) {
        var devicePorts = [];
        ports.forEach(function (port) {
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
            });
        });
        return devicePorts;
    };
    SQLDatabaseManager.prototype.getProjectDevices = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var projectDevices, devices;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, device_1.default.findAll({ where: { projectId: user.sessionId }, include: port_1.default })];
                    case 1:
                        projectDevices = _a.sent();
                        devices = [];
                        projectDevices.forEach(function (projectDevice) {
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
                                ports: _this.buildDevicePorts(projectDevice.ports)
                            });
                        });
                        return [2 /*return*/, devices];
                }
            });
        });
    };
    SQLDatabaseManager.prototype.createDevice = function (device) {
        return __awaiter(this, void 0, void 0, function () {
            var dvc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, device_1.default.create(device)];
                    case 1:
                        dvc = _a.sent();
                        return [4 /*yield*/, this.createPorts(device.ports)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, dvc];
                }
            });
        });
    };
    SQLDatabaseManager.prototype.deleteDevice = function (device) {
        return __awaiter(this, void 0, void 0, function () {
            var dvc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, device_1.default.destroy({ where: { id: device.id } })];
                    case 1:
                        dvc = _a.sent();
                        return [2 /*return*/, dvc];
                }
            });
        });
    };
    SQLDatabaseManager.prototype.createPorts = function (portsArray) {
        return __awaiter(this, void 0, void 0, function () {
            var ports;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, port_1.default.bulkCreate(portsArray)];
                    case 1:
                        ports = _a.sent();
                        return [2 /*return*/, ports];
                }
            });
        });
    };
    SQLDatabaseManager.prototype.updateDevicePosition = function (deviceId, position) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, device_1.default.update({ x: position.x, y: position.y }, {
                            where: {
                                id: deviceId
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SQLDatabaseManager.prototype.updatePortState = function (port) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, port_1.default.update(port, { where: { id: port.id } })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        throw Error();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SQLDatabaseManager.prototype.updateDeviceStatus = function (device, status) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, device_1.default.update({ status: status }, {
                            where: {
                                id: device.id
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SQLDatabaseManager.prototype.updateDeviceData = function (device) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, device_1.default.update(device, { where: { id: device.id } })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return SQLDatabaseManager;
}());
exports.default = SQLDatabaseManager;
