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
var NoGatewayError_1 = __importDefault(require("../errors/NoGatewayError"));
var DeleteLink = /** @class */ (function (_super) {
    __extends(DeleteLink, _super);
    function DeleteLink(commandData) {
        var _this = _super.call(this, commandData) || this;
        _this.response = new ResponseCommand_1.default(commandData);
        _this.function = function () { return __awaiter(_this, void 0, void 0, function () {
            var link, link_1, _a, sourcePort, targetPort, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        link = this.diagram.getLink(this.data);
                        if (!link) return [3 /*break*/, 5];
                        link_1 = this.diagram.getLink(this.data);
                        link_1.prepareToUnlink();
                        return [4 /*yield*/, this.makeNetworkStuffs(link_1)];
                    case 1:
                        _b.sent();
                        link_1.unlink();
                        _a = link_1.getLinkModels(), sourcePort = _a.sourcePort, targetPort = _a.targetPort;
                        return [4 /*yield*/, this.engine._databaseMngr.deleteLink(this.data.id)];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, this.engine._databaseMngr.updatePortState(sourcePort.getPortData())];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.engine._databaseMngr.updatePortState(targetPort.getPortData())];
                    case 4:
                        _b.sent();
                        this.response.send(this.data);
                        _b.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _b.sent();
                        return [2 /*return*/];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    DeleteLink.prototype.makeNetworkStuffs = function (link) {
        return __awaiter(this, void 0, void 0, function () {
            var sourcePort, gateway, standByPorts_1, disconnect_1, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        sourcePort = link.getLinkModels().sourcePort;
                        gateway = sourcePort.getGateway();
                        standByPorts_1 = gateway.getServerPortsWithState(ServerPortModel_1.PortState.disconnecting);
                        standByPorts_1.forEach(function (port) { return port.state = ServerPortModel_1.PortState.standBy; });
                        console.log("CALLLLLL DISCONNECT", standByPorts_1.length);
                        disconnect_1 = function (i) {
                            if (i === void 0) { i = 0; }
                            return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(i < standByPorts_1.length)) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.response.sendCommand(CommandManager_1.DiagramFunction.disconnectPort, standByPorts_1[i])];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, disconnect_1(i + 1)];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            });
                        };
                        return [4 /*yield*/, disconnect_1()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        if (error_2 instanceof NoGatewayError_1.default) {
                            console.log("no gateway");
                            return [2 /*return*/];
                        }
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return DeleteLink;
}(Command_1.default));
exports.default = DeleteLink;
