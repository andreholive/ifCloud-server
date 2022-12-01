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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortState = void 0;
var NoGatewayError_1 = __importDefault(require("../errors/NoGatewayError"));
var PortModel_1 = __importDefault(require("./PortModel"));
var PortState;
(function (PortState) {
    PortState["connected"] = "connected";
    PortState["disconnected"] = "disconnected";
    PortState["disconnecting"] = "disconnecting";
    PortState["connecting"] = "connecting";
    PortState["standBy"] = "standBy";
})(PortState = exports.PortState || (exports.PortState = {}));
var ServerPortModel = /** @class */ (function (_super) {
    __extends(ServerPortModel, _super);
    function ServerPortModel(portData, server) {
        var _this = _super.call(this, portData, server) || this;
        _this.gatewayPort = null;
        _this.gateway = null;
        return _this;
    }
    ServerPortModel.prototype.startLink = function (port) {
        var portState = this.state;
        this.makeLink(port);
        this.state = portState;
    };
    ServerPortModel.prototype.makeLink = function (port) {
        this.connectedPort = port;
        ;
        this.state = PortState.standBy;
        this.enabled = true;
    };
    ServerPortModel.prototype.prepareToUnlink = function () {
        this.state = PortState.disconnecting;
    };
    ServerPortModel.prototype.unlink = function () {
        this.connectedPort = null;
        this.link = null;
        this.state = PortState.disconnected;
    };
    ServerPortModel.prototype.disconnect = function () {
        this.state = PortState.disconnecting;
    };
    ServerPortModel.prototype.setGateway = function (gatewayPort) {
        this.gateway = gatewayPort.gateway;
        this.gatewayPort = gatewayPort;
    };
    ServerPortModel.prototype.getGateway = function () {
        if (this.gateway) {
            return this.gateway;
        }
        else {
            throw new NoGatewayError_1.default();
        }
    };
    ServerPortModel.prototype.removeGateway = function () {
        this.gatewayPort = null;
        this.gateway = null;
        this.cleanNetworkData();
        this.state = PortState.standBy;
    };
    return ServerPortModel;
}(PortModel_1.default));
exports.default = ServerPortModel;
