"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var axios_1 = __importDefault(require("axios"));
var deviceList_json_1 = __importDefault(require("../../config/deviceList.json"));
var Error404_1 = __importDefault(require("../errors/Error404"));
var TokenExpired_1 = __importDefault(require("../errors/TokenExpired"));
var BASE_URL = 'http://200.135.57.16';
var PUBLIC_NETWORk_ID = '4a85d559-3203-4e94-813c-a8084df242fb';
var computeApi = axios_1.default.create({ baseURL: "".concat(BASE_URL, "/compute/v2.1") });
var networkApi = axios_1.default.create({ baseURL: "".concat(BASE_URL, ":9696/networking") });
var OpenstackCloudManager = /** @class */ (function () {
    function OpenstackCloudManager() {
    }
    OpenstackCloudManager.prototype.buildHeader = function (user) {
        return {
            headers: {
                "X-Auth-Token": user.token,
                "OpenStack-API-Version": "compute 2.37"
            }
        };
    };
    OpenstackCloudManager.prototype.getInstanceData = function (device) {
        var instanceData = Object.values(deviceList_json_1.default.devices).find(function (dvc) { return dvc.name === device.type; });
        return {
            server: __assign({ name: device.name }, instanceData)
        };
    };
    OpenstackCloudManager.prototype.getInstanceInformations = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var response, instanceInformations_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, computeApi.get('/servers/detail', this.buildHeader(user))];
                    case 1:
                        response = _a.sent();
                        instanceInformations_1 = [];
                        Object.values(response.data.servers).forEach(function (server) {
                            instanceInformations_1.push({
                                id: server.id,
                                task_state: server['OS-EXT-STS:task_state'],
                                vm_state: server['OS-EXT-STS:vm_state'],
                                power_state: server['OS-EXT-STS:power_state']
                            });
                        });
                        return [2 /*return*/, instanceInformations_1];
                    case 2:
                        error_1 = _a.sent();
                        if (error_1.response.status == 401) {
                            throw new TokenExpired_1.default('');
                        }
                        throw new Error('');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OpenstackCloudManager.prototype.connectDevice = function (serverPort, user) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var requestBody, response, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        requestBody = { interfaceAttachment: { net_id: serverPort.networkId } };
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, computeApi.post("/servers/".concat(serverPort.getParent().instanceId, "/os-interface"), requestBody, this.buildHeader(user))];
                    case 2:
                        response = _b.sent();
                        return [2 /*return*/, response.data.interfaceAttachment];
                    case 3:
                        error_2 = _b.sent();
                        if (((_a = error_2.response) === null || _a === void 0 ? void 0 : _a.status) == 404) {
                            throw new Error404_1.default('');
                        }
                        if (error_2.response.status == 401) {
                            throw new TokenExpired_1.default('');
                        }
                        throw Error();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OpenstackCloudManager.prototype.disconnectDevice = function (serverPort, user) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, computeApi.delete("/servers/".concat(serverPort.getParent().instanceId, "/os-interface/").concat(serverPort.portId), this.buildHeader(user))];
                    case 1:
                        _c.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _c.sent();
                        if (((_a = error_3.response) === null || _a === void 0 ? void 0 : _a.status) == 404) {
                            throw new Error404_1.default('');
                        }
                        if (((_b = error_3.response) === null || _b === void 0 ? void 0 : _b.status) == 401) {
                            throw new TokenExpired_1.default('');
                        }
                        throw Error();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OpenstackCloudManager.prototype.addInstance = function (device, user) {
        return __awaiter(this, void 0, void 0, function () {
            var requestBody, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestBody = this.getInstanceData(device);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, computeApi.post('/servers', requestBody, this.buildHeader(user))];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data.server.id];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4.response.data);
                        if (error_4.response.status == 401) {
                            throw new TokenExpired_1.default('');
                        }
                        throw Error();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OpenstackCloudManager.prototype.removeInstance = function (device, user) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, computeApi.delete("/servers/".concat(device.instanceId), this.buildHeader(user))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        if (error_5.response.status == 404) {
                            throw new Error404_1.default('');
                        }
                        if (error_5.response.status == 401) {
                            throw new TokenExpired_1.default('');
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OpenstackCloudManager.prototype.instancePowerOn = function (device, user) {
        return __awaiter(this, void 0, void 0, function () {
            var requestBody, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        requestBody = { "os-start": null };
                        return [4 /*yield*/, computeApi.post("/servers/".concat(device.instanceId, "/action"), requestBody, this.buildHeader(user))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        if (error_6.response.status == 404) {
                            throw new Error404_1.default('');
                        }
                        if (error_6.response.status == 401) {
                            throw new TokenExpired_1.default('');
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OpenstackCloudManager.prototype.instancePowerOff = function (device, user) {
        return __awaiter(this, void 0, void 0, function () {
            var requestBody, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        requestBody = { "os-stop": null };
                        return [4 /*yield*/, computeApi.post("/servers/".concat(device.instanceId, "/action"), requestBody, this.buildHeader(user))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        if (error_7.response.status == 404) {
                            throw new Error404_1.default('');
                        }
                        if (error_7.response.status == 401) {
                            throw new TokenExpired_1.default('');
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OpenstackCloudManager.prototype.instanceReboot = function (device, user) {
        return __awaiter(this, void 0, void 0, function () {
            var requestBody, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        requestBody = { "reboot": { "type": "SOFT" } };
                        return [4 /*yield*/, computeApi.post("/servers/".concat(device.instanceId, "/action"), requestBody, this.buildHeader(user))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _a.sent();
                        if (error_8.response.status == 404) {
                            throw new Error404_1.default('');
                        }
                        if (error_8.response.status == 401) {
                            throw new TokenExpired_1.default('');
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OpenstackCloudManager.prototype.getConsoleUrl = function (device, user) {
        return __awaiter(this, void 0, void 0, function () {
            var requestBody, res, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestBody = { "remote_console": { "protocol": "vnc",
                                "type": "novnc" } };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, computeApi.post("/servers/".concat(device.instanceId, "/remote-consoles"), requestBody, this.buildHeader(user))];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res.data.remote_console.url];
                    case 3:
                        error_9 = _a.sent();
                        if (error_9.response.status == 401) {
                            throw new TokenExpired_1.default('');
                        }
                        throw Error();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OpenstackCloudManager.prototype.createRouter = function (device, user) {
        return __awaiter(this, void 0, void 0, function () {
            var requestBody, response, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        requestBody = { router: {
                                name: device.name,
                                external_gateway_info: {
                                    network_id: PUBLIC_NETWORk_ID
                                }
                            } };
                        return [4 /*yield*/, networkApi.post('/v2.0/routers', requestBody, this.buildHeader(user))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.router.id];
                    case 2:
                        error_10 = _a.sent();
                        console.log(error_10.response);
                        if (error_10.response.status == 401) {
                            throw new TokenExpired_1.default('');
                        }
                        throw Error();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OpenstackCloudManager.prototype.addRouterInterface = function (router, subnet_id, user) {
        return __awaiter(this, void 0, void 0, function () {
            var requestBody, response, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        requestBody = { subnet_id: subnet_id };
                        return [4 /*yield*/, networkApi.put("/v2.0/routers/".concat(router.instanceId, "/add_router_interface"), requestBody, this.buildHeader(user))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_11 = _a.sent();
                        if (error_11.response.status == 401) {
                            throw new TokenExpired_1.default('');
                        }
                        throw Error();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OpenstackCloudManager.prototype.getPortDetails = function (port, user) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, networkApi.get("/v2.0/ports/".concat(port.portId), this.buildHeader(user))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.port];
                    case 2:
                        error_12 = _a.sent();
                        if (error_12.response.status == 401) {
                            throw new TokenExpired_1.default('');
                        }
                        throw Error();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OpenstackCloudManager.prototype.deleteRouterInterface = function (router, subnet_id, user) {
        return __awaiter(this, void 0, void 0, function () {
            var requestBody, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        requestBody = { subnet_id: subnet_id };
                        return [4 /*yield*/, networkApi.put("/v2.0/routers/".concat(router.instanceId, "/remove_router_interface"), requestBody, this.buildHeader(user))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_13 = _a.sent();
                        if (error_13.response.status == 401) {
                            throw new TokenExpired_1.default('');
                        }
                        if (error_13.response.status == 404) {
                            throw new Error404_1.default('');
                        }
                        throw Error();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OpenstackCloudManager.prototype.deleteRouter = function (device, user) {
        return __awaiter(this, void 0, void 0, function () {
            var error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, networkApi.delete("/v2.0/routers/".concat(device.instanceId), this.buildHeader(user))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_14 = _a.sent();
                        if (error_14.response.status == 404) {
                            throw new Error404_1.default('');
                        }
                        if (error_14.response.status == 401) {
                            throw new TokenExpired_1.default('');
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OpenstackCloudManager.prototype.createNetwork = function (name, user) {
        return __awaiter(this, void 0, void 0, function () {
            var network, response, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        network = { network: {
                                name: name,
                                "mtu": 1400,
                            } };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, networkApi.post('/v2.0/networks', network, this.buildHeader(user))];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data.network.id];
                    case 3:
                        error_15 = _a.sent();
                        if (error_15.response.status == 401) {
                            throw new TokenExpired_1.default('');
                        }
                        throw Error();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OpenstackCloudManager.prototype.deleteNetwork = function (port, user) {
        return __awaiter(this, void 0, void 0, function () {
            var error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, networkApi.delete("/v2.0/networks/".concat(port.networkId), this.buildHeader(user))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_16 = _a.sent();
                        if (error_16.response.status == 401) {
                            throw new TokenExpired_1.default('');
                        }
                        throw Error();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OpenstackCloudManager.prototype.createSubnet = function (subnetData, user) {
        return __awaiter(this, void 0, void 0, function () {
            var requestBody, response, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestBody = { subnet: subnetData };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, networkApi.post('/v2.0/subnets', requestBody, this.buildHeader(user))];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data.subnet];
                    case 3:
                        error_17 = _a.sent();
                        if (error_17.response.status == 401) {
                            throw new TokenExpired_1.default('');
                        }
                        throw Error();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OpenstackCloudManager.prototype.deleteSubNet = function (port, user) {
        return __awaiter(this, void 0, void 0, function () {
            var error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, networkApi.delete("/v2.0/subnets/".concat(port.subnetId), this.buildHeader(user))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_18 = _a.sent();
                        if (error_18.response.status == 401) {
                            throw new TokenExpired_1.default('');
                        }
                        throw Error();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OpenstackCloudManager.prototype.enablePort = function (port, user) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = { "port": { "admin_state_up": true } };
                        return [4 /*yield*/, networkApi.put("/v2.0/ports/".concat(port.portId), data, this.buildHeader(user))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_19 = _a.sent();
                        if (error_19.response.status == 401) {
                            throw new TokenExpired_1.default('');
                        }
                        throw Error();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OpenstackCloudManager.prototype.disablePort = function (port, user) {
        return __awaiter(this, void 0, void 0, function () {
            var data, error_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        data = { "port": { "admin_state_up": false } };
                        return [4 /*yield*/, networkApi.put("/v2.0/ports/".concat(port.portId), data, this.buildHeader(user))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_20 = _a.sent();
                        if (error_20.response.status == 401) {
                            throw new TokenExpired_1.default('');
                        }
                        throw Error();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return OpenstackCloudManager;
}());
exports.default = OpenstackCloudManager;
