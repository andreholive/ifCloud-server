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
var DeviceModel_1 = __importDefault(require("./DeviceModel"));
var RouterPortModel_1 = __importDefault(require("./RouterPortModel"));
var RouterModel = /** @class */ (function (_super) {
    __extends(RouterModel, _super);
    function RouterModel(device, session) {
        var _this = _super.call(this, device, session) || this;
        _this.ports = {};
        _this.registerPorts(device.ports);
        return _this;
    }
    RouterModel.prototype.registerPorts = function (ports) {
        var _this = this;
        ports.forEach(function (port) {
            var newPort = new RouterPortModel_1.default(port, _this);
            _this.ports[port.id] = newPort;
        });
    };
    RouterModel.prototype.addPort = function (port) {
        var newPort = new RouterPortModel_1.default(port, this);
        this.ports[port.id] = newPort;
    };
    return RouterModel;
}(DeviceModel_1.default));
exports.default = RouterModel;
