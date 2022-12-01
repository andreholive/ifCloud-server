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
var infos = [{
        id: '07f9fb1d-6d61-4194-9660-5e4dfba56d61',
        task_state: null,
        vm_state: 'active',
        power_state: 4
    },
    {
        id: '07f9fb1d-6d61-4194-9660-5e4dfba56d62',
        task_state: null,
        vm_state: 'active',
        power_state: 4
    }];
var CloudManagerMock = /** @class */ (function () {
    function CloudManagerMock() {
        var _this = this;
        this.fakePromise = function (delay) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { setTimeout(resolve, delay); })];
        }); }); };
    }
    CloudManagerMock.prototype.UID = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0;
            var v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    };
    CloudManagerMock.prototype.generateMacAddr = function () {
        var hexDigits = "0123456789abcdef";
        var macAddress = "ca:fe:00:";
        for (var i = 0; i < 3; i++) {
            macAddress += hexDigits.charAt(Math.round(Math.random() * 15));
            macAddress += hexDigits.charAt(Math.round(Math.random() * 15));
            if (i != 2)
                macAddress += ":";
        }
        return macAddress;
    };
    CloudManagerMock.prototype.createSubnet = function (subnetData, user) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakePromise(1000)];
                    case 1:
                        _a.sent();
                        response = {
                            network_id: this.UID(),
                            ip_version: 4,
                            cidr: "192.168.0.0/24",
                            enable_dhcp: true,
                            gateway_ip: "192.168.0.1",
                            allocation_pools: [{ start: "192.168.0.100", end: "192.168.0.199" }],
                            dns_nameservers: ["8.8.8.8", "8.8.4.4"],
                            id: "",
                            name: "",
                            tenant_id: "",
                            subnetpool_id: null,
                            ipv6_ra_mode: null,
                            ipv6_address_mode: null,
                            host_routes: [],
                            description: "",
                            service_types: [],
                            tags: [],
                            created_at: "",
                            updated_at: "",
                            revision_number: 0,
                            project_id: ""
                        };
                        return [2 /*return*/, response];
                }
            });
        });
    };
    CloudManagerMock.prototype.connectDevice = function (serverPort, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakePromise(1000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                net_id: serverPort.networkId,
                                port_id: this.UID(),
                                mac_addr: this.generateMacAddr(),
                                port_state: 'ACTIVE',
                                fixed_ips: [{ ip_address: "192.168.0.".concat(Math.floor(254)), subnet_id: this.UID() }]
                            }];
                }
            });
        });
    };
    CloudManagerMock.prototype.disconnectDevice = function (serverPort, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakePromise(1000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CloudManagerMock.prototype.addRouterInterface = function (router, subnet_id, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakePromise(1000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                id: "123",
                                tenant_id: "123",
                                port_id: this.UID(),
                                network_id: this.UID(),
                                subnet_id: subnet_id,
                                subnet_ids: []
                            }];
                }
            });
        });
    };
    CloudManagerMock.prototype.deleteRouterInterface = function (router, subnet_id, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakePromise(1000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CloudManagerMock.prototype.enablePort = function (port, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakePromise(1000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CloudManagerMock.prototype.disablePort = function (port, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakePromise(1000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CloudManagerMock.prototype.getPortDetails = function (port, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, {
                        id: port.portId,
                        name: port.name,
                        network_id: this.UID(),
                        tenant_id: this.UID(),
                        mac_address: this.generateMacAddr(),
                        admin_state_up: true,
                        status: "ACTIVE",
                        device_id: this.UID(),
                        device_owner: "",
                        fixed_ips: [{ subnet_id: this.UID(), ip_address: "192.168.0.1" }],
                        allowed_address_pairs: [],
                        extra_dhcp_opts: [],
                        security_groups: [],
                        description: "",
                        "binding:vnic_type": "",
                        "binding:profile": undefined,
                        "binding:host_id": "",
                        "binding:vif_type": "",
                        "binding:vif_details": undefined,
                        port_security_enabled: false,
                        tags: [],
                        created_at: "",
                        updated_at: "",
                        revision_number: 0,
                        project_id: "123"
                    }];
            });
        });
    };
    CloudManagerMock.prototype.deleteSubNet = function (port, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakePromise(1000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CloudManagerMock.prototype.deleteNetwork = function (port, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakePromise(1000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CloudManagerMock.prototype.getInstanceInformations = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, infos];
            });
        });
    };
    CloudManagerMock.prototype.addInstance = function (device, user) {
        return __awaiter(this, void 0, void 0, function () {
            var id, i;
            return __generator(this, function (_a) {
                id = this.UID();
                i = infos.push({
                    id: id,
                    task_state: 'building',
                    vm_state: 'active',
                    power_state: 2
                });
                setTimeout(function () {
                    infos[i - 1].task_state = 'starting';
                    setTimeout(function () {
                        infos[i - 1].task_state = null;
                        infos[i - 1].power_state = 1;
                    }, 2000);
                }, 1500);
                return [2 /*return*/, id];
            });
        });
    };
    CloudManagerMock.prototype.removeInstance = function (device, user) {
        return __awaiter(this, void 0, void 0, function () {
            var index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fakePromise(2000)];
                    case 1:
                        _a.sent();
                        index = infos.findIndex(function (info) { return info.id === device.instanceId; });
                        infos.splice(index, 1);
                        return [2 /*return*/];
                }
            });
        });
    };
    CloudManagerMock.prototype.instancePowerOn = function (device, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                setTimeout(function () {
                    var info = infos.find(function (info) { return info.id === device.instanceId; });
                    if (info)
                        info.power_state = 1;
                }, 3000);
                return [2 /*return*/];
            });
        });
    };
    CloudManagerMock.prototype.instancePowerOff = function (device, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                setTimeout(function () {
                    var info = infos.find(function (info) { return info.id === device.instanceId; });
                    if (info)
                        info.power_state = 4;
                }, 3000);
                return [2 /*return*/];
            });
        });
    };
    CloudManagerMock.prototype.instanceReboot = function (device, user) {
        return __awaiter(this, void 0, void 0, function () {
            var info;
            return __generator(this, function (_a) {
                info = infos.find(function (info) { return info.id === device.instanceId; });
                if (info) {
                    info.task_state = 'restarting';
                    setTimeout(function () { info.task_state = null; }, 5000);
                }
                return [2 /*return*/];
            });
        });
    };
    CloudManagerMock.prototype.createRouter = function (device, user) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                id = this.UID();
                return [2 /*return*/, id];
            });
        });
    };
    CloudManagerMock.prototype.deleteRouter = function (device, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.fakePromise(1000);
                return [2 /*return*/];
            });
        });
    };
    CloudManagerMock.prototype.createNetwork = function (name, user) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                id = this.UID();
                return [2 /*return*/, id];
            });
        });
    };
    CloudManagerMock.prototype.getConsoleUrl = function (device, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, "http://www.amazon.com"];
            });
        });
    };
    return CloudManagerMock;
}());
exports.default = CloudManagerMock;
