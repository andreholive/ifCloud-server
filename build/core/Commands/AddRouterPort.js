"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Command_1 = __importDefault(require("./Command"));
var CommandManager_1 = require("../managers/CommandManager");
var ResponseCommand_1 = __importDefault(require("./ResponseCommand"));
var TokenExpired_1 = __importDefault(require("../errors/TokenExpired"));
var PortLimit_1 = __importDefault(require("../errors/PortLimit"));
var AddRouterPort = /** @class */ (function (_super) {
    __extends(AddRouterPort, _super);
    function AddRouterPort(commandData) {
        var _this = _super.call(this, commandData) || this;
        _this.response = new ResponseCommand_1.default(commandData);
        _this.function = function () { return __awaiter(_this, void 0, void 0, function () {
            var device, subnetData, networkId, subnet, port, portDetails, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        device = this.diagram.selectDeviceById(this.data.deviceId);
                        subnetData = this.makeSubnetData(device);
                        return [4 /*yield*/, this.engine._cloudMngr.createNetwork(this.data.name, this.user)];
                    case 1:
                        networkId = _a.sent();
                        subnetData.network_id = networkId;
                        return [4 /*yield*/, this.engine._cloudMngr.createSubnet(subnetData, this.user)];
                    case 2:
                        subnet = _a.sent();
                        return [4 /*yield*/, this.engine._cloudMngr.addRouterInterface(device.getDeviceData(), subnet.id, this.user)];
                    case 3:
                        port = _a.sent();
                        this.data.networkId = networkId;
                        this.data.subnetId = subnet.id;
                        this.data.fixedIp = subnet.gateway_ip;
                        this.data.portId = port.port_id;
                        return [4 /*yield*/, this.engine._cloudMngr.getPortDetails(this.data, this.user)];
                    case 4:
                        portDetails = _a.sent();
                        this.data.macAddr = portDetails.mac_address;
                        return [4 /*yield*/, this.engine._databaseMngr.createPorts([this.data])];
                    case 5:
                        _a.sent();
                        this.response.send(this.data);
                        return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        if (error_1 instanceof TokenExpired_1.default) {
                            this.response.sendCommand(CommandManager_1.DiagramFunction.gotoLogin, this.data);
                        }
                        if (error_1 instanceof PortLimit_1.default) {
                            console.log('Port Limit');
                        }
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    AddRouterPort.prototype.makeSubnetData = function (device) {
        var subnet1 = {
            network_id: '',
            ip_version: 4,
            cidr: "192.168.0.0/24",
            enable_dhcp: true,
            gateway_ip: "192.168.0.1",
            allocation_pools: [{ start: "192.168.0.30", end: "192.168.0.50" }],
            dns_nameservers: ['8.8.8.8', '8.8.4.4']
        };
        var subnet2 = {
            network_id: '',
            ip_version: 4,
            cidr: "10.0.0.0/24",
            enable_dhcp: true,
            gateway_ip: "10.0.0.1",
            allocation_pools: [{ start: "10.0.0.100", end: "10.0.0.150" }],
            dns_nameservers: ['8.8.8.8', '8.8.4.4']
        };
        if (device.getPorts().length == 0) {
            return subnet1;
        }
        if (device.getPorts().length == 1) {
            return subnet2;
        }
        throw new PortLimit_1.default();
    };
    return AddRouterPort;
}(Command_1.default));
exports.default = AddRouterPort;
