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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var NoGatewayError_1 = __importDefault(require("../errors/NoGatewayError"));
var PortModel_1 = __importDefault(require("./PortModel"));
var RouterPortModel_1 = __importDefault(require("./RouterPortModel"));
var ServerPortModel_1 = __importStar(require("./ServerPortModel"));
var SwitchPortModel = /** @class */ (function (_super) {
    __extends(SwitchPortModel, _super);
    function SwitchPortModel(portData, sw) {
        var _this = _super.call(this, portData, sw) || this;
        _this.gatewayPort = null;
        _this.gateway = null;
        return _this;
    }
    SwitchPortModel.prototype.startLink = function (port) {
        var portState = this.state;
        this.makeLink(port);
        this.state = portState;
    };
    SwitchPortModel.prototype.makeLink = function (port) {
        this.connectedPort = port;
        this.state = ServerPortModel_1.PortState.connected;
        this.enabled = true;
        if (this.connectedPort instanceof ServerPortModel_1.default
            || this.connectedPort instanceof SwitchPortModel) {
            if (this.gatewayPort) {
                this.connectedPort.setGateway(this);
            }
        }
    };
    SwitchPortModel.prototype.prepareToUnlink = function () {
        this.state = ServerPortModel_1.PortState.disconnected;
        this.link = null;
        if (this.connectedPort) {
            if (this.connectedPort === this.gatewayPort) {
                this.disconnect();
                return;
            }
        }
        if (this.gatewayPort) {
            if (this.connectedPort instanceof ServerPortModel_1.default) {
                this.connectedPort.disconnect();
            }
        }
    };
    SwitchPortModel.prototype.unlink = function () {
        if (this.connectedPort) {
            if (this.connectedPort === this.gatewayPort) {
                this.gatewayPort = null;
                this.gateway = null;
            }
            this.connectedPort = null;
        }
    };
    SwitchPortModel.prototype.removeLinkedDevice = function () {
    };
    SwitchPortModel.prototype.setGateway = function (gatewayPort) {
        var _this = this;
        if (this.gatewayPort) {
            throw new Error("");
        }
        this.gatewayPort = gatewayPort;
        if (gatewayPort instanceof RouterPortModel_1.default) {
            this.gateway = gatewayPort;
        }
        else {
            this.gateway = gatewayPort.gateway;
        }
        this.state = ServerPortModel_1.PortState.connected;
        this.parent.getPorts().forEach(function (port) {
            if (port.gatewayPort)
                return;
            port.gatewayPort = _this;
            port.gateway = _this.gateway;
            if (port.connectedPort) {
                port.connectedPort.setGateway(port);
            }
        });
    };
    SwitchPortModel.prototype.getGateway = function () {
        if (this.gateway) {
            return this.gateway;
        }
        else {
            throw new NoGatewayError_1.default();
        }
    };
    SwitchPortModel.prototype.disconnect = function () {
        var _this = this;
        console.log('DISCONNECT SWITCH');
        this.parent.getPorts().forEach(function (port) {
            if (port.connectedPort && port !== _this) {
                if (port.connectedPort instanceof SwitchPortModel) {
                    port.connectedPort.disconnect();
                }
                if (port.connectedPort instanceof ServerPortModel_1.default) {
                    if (port.connectedPort.state === ServerPortModel_1.PortState.connected) {
                        port.connectedPort.disconnect();
                    }
                }
            }
            port.gatewayPort = null;
        });
    };
    SwitchPortModel.prototype.getServerPortsWithState = function (state) {
        var _this = this;
        var portsArray = [];
        this.parent.getPorts().forEach(function (port) {
            if (port.connectedPort && port !== _this) {
                if (port.connectedPort instanceof SwitchPortModel) {
                    portsArray.push.apply(portsArray, port.connectedPort.getServerPortsWithState(state));
                }
                if (port.connectedPort instanceof ServerPortModel_1.default) {
                    console.log(port.connectedPort.state);
                    if (port.connectedPort.state === state) {
                        portsArray.push(port.connectedPort);
                    }
                }
            }
        });
        return portsArray;
    };
    return SwitchPortModel;
}(PortModel_1.default));
exports.default = SwitchPortModel;
