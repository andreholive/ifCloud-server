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
var ServerPortModel_1 = require("../core-models/ServerPortModel");
var CreateLink = /** @class */ (function (_super) {
    __extends(CreateLink, _super);
    function CreateLink(commandData) {
        var _this = _super.call(this, commandData) || this;
        _this.response = new ResponseCommand_1.default(commandData);
        _this.function = function () { return __awaiter(_this, void 0, void 0, function () {
            var link, _a, sourcePort, targetPort, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 7]);
                        return [4 /*yield*/, this.engine._databaseMngr.createLink(this.data)];
                    case 1:
                        _b.sent();
                        this.response.send(this.data);
                        link = this.diagram.getLink(this.data);
                        link.makeLink();
                        return [4 /*yield*/, this.makeNetworkStuffs(link)];
                    case 2:
                        _b.sent();
                        _a = link.getLinkModels(), sourcePort = _a.sourcePort, targetPort = _a.targetPort;
                        return [4 /*yield*/, this.engine._databaseMngr.updatePortState(sourcePort.getPortData())];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.engine._databaseMngr.updatePortState(targetPort.getPortData())];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5:
                        error_1 = _b.sent();
                        return [4 /*yield*/, this.response.sendCommand(CommandManager_1.DiagramFunction.deleteLink, this.data)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    CreateLink.prototype.connectServers = function (gatewayPort) {
        return __awaiter(this, void 0, void 0, function () {
            var standByPorts, connect;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        standByPorts = gatewayPort.getServerPortsWithState(ServerPortModel_1.PortState.standBy);
                        console.log("CALLLLLL CONNECT", standByPorts.length);
                        standByPorts.forEach(function (port) { return port.state = ServerPortModel_1.PortState.connected; });
                        connect = function (i) {
                            if (i === void 0) { i = 0; }
                            return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(i < standByPorts.length)) return [3 /*break*/, 3];
                                            standByPorts[i].networkId = gatewayPort.networkId;
                                            return [4 /*yield*/, this.response.sendCommand(CommandManager_1.DiagramFunction.connectPort, standByPorts[i])];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, connect(i + 1)];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            });
                        };
                        return [4 /*yield*/, connect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateLink.prototype.makeNetworkStuffs = function (link) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, sourcePort, targetPort, gateway, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = link.getLinkModels(), sourcePort = _a.sourcePort, targetPort = _a.targetPort;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        gateway = sourcePort.getGateway();
                        return [4 /*yield*/, this.connectServers(gateway)];
                    case 2:
                        _b.sent();
                        sourcePort.state = ServerPortModel_1.PortState.connected;
                        targetPort.state = ServerPortModel_1.PortState.connected;
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _b.sent();
                        return [2 /*return*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return CreateLink;
}(Command_1.default));
exports.default = CreateLink;
