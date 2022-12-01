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
exports.DiagramFunction = void 0;
var AddRouterPort_1 = __importDefault(require("../Commands/AddRouterPort"));
var ConnectPort_1 = __importDefault(require("../Commands/ConnectPort"));
var CreateDevice_1 = __importDefault(require("../Commands/CreateDevice"));
var CreateLink_1 = __importDefault(require("../Commands/CreateLink"));
var DeleteInstance_1 = __importDefault(require("../Commands/DeleteInstance"));
var DiagramLoad_1 = __importDefault(require("../Commands/DiagramLoad"));
var GetInstanceStatus_1 = __importDefault(require("../Commands/GetInstanceStatus"));
var CommandNull_1 = __importDefault(require("../Commands/CommandNull"));
var ChangeDevicePosition_1 = __importDefault(require("../Commands/ChangeDevicePosition"));
var AccessVncUrl_1 = __importDefault(require("../Commands/AccessVncUrl"));
var PowerOff_1 = __importDefault(require("../Commands/PowerOff"));
var PowerOn_1 = __importDefault(require("../Commands/PowerOn"));
var Reboot_1 = __importDefault(require("../Commands/Reboot"));
var DisconnectPort_1 = __importDefault(require("../Commands/DisconnectPort"));
var DeleteLink_1 = __importDefault(require("../Commands/DeleteLink"));
var DeletePort_ts_1 = __importDefault(require("../Commands/DeletePort.ts"));
var RemoveRouterPort_1 = __importDefault(require("../Commands/RemoveRouterPort"));
var updateInstanceStatus_1 = __importDefault(require("../Commands/updateInstanceStatus"));
var EnableLink_1 = __importDefault(require("../Commands/EnableLink"));
var DisableLink_1 = __importDefault(require("../Commands/DisableLink"));
var GotoLogin_1 = __importDefault(require("../Commands/GotoLogin"));
var DiagramFunction;
(function (DiagramFunction) {
    DiagramFunction["portRemove"] = "portRemove";
    DiagramFunction["getInstanceStatus"] = "getInstanceStatus";
    DiagramFunction["diagramLoad"] = "diagramLoad";
    DiagramFunction["createDevice"] = "createDevice";
    DiagramFunction["changeDevicePosition"] = "changeDevicePosition";
    DiagramFunction["deleteDevice"] = "deleteDevice";
    DiagramFunction["connectPort"] = "connectPort";
    DiagramFunction["createLink"] = "createLink";
    DiagramFunction["deleteLink"] = "deleteLink";
    DiagramFunction["addRouterPort"] = "addRouterPort";
    DiagramFunction["removeDevice"] = "removeDevice";
    DiagramFunction["moveDevice"] = "moveDevice";
    DiagramFunction["disconnectPort"] = "disconnectPort";
    DiagramFunction["accessVncUrl"] = "accessVncUrl";
    DiagramFunction["instancePowerOff"] = "instancePowerOff";
    DiagramFunction["instancePowerOn"] = "instancePowerOn";
    DiagramFunction["deviceReboot"] = "deviceReboot";
    DiagramFunction["deletePort"] = "deletePort";
    DiagramFunction["removeRouterPort"] = "removeRouterPort";
    DiagramFunction["updateInstanceStatus"] = "updateInstanceStatus";
    DiagramFunction["enableLink"] = "enableLink";
    DiagramFunction["disableLink"] = "disableLink";
    DiagramFunction["gotoLogin"] = "gotoLogin";
})(DiagramFunction = exports.DiagramFunction || (exports.DiagramFunction = {}));
var CommandManager = /** @class */ (function () {
    function CommandManager() {
    }
    CommandManager.prototype.make = function (commandData) {
        switch (commandData.command) {
            case "getInstanceStatus":
                return new GetInstanceStatus_1.default(commandData);
            case "updateInstanceStatus":
                return new updateInstanceStatus_1.default(commandData);
            case "diagramLoad":
                return new DiagramLoad_1.default(commandData);
            case "createDevice":
                return new CreateDevice_1.default(commandData);
            case "changeDevicePosition":
                return new ChangeDevicePosition_1.default(commandData);
            case "removeDevice":
                return new DeleteInstance_1.default(commandData);
            case "connectPort":
                return new ConnectPort_1.default(commandData);
            case "createLink":
                return new CreateLink_1.default(commandData);
            case "deleteLink":
                return new DeleteLink_1.default(commandData);
            case "gotoLogin":
                return new GotoLogin_1.default(commandData);
            case "enableLink":
                return new EnableLink_1.default(commandData);
            case "disableLink":
                return new DisableLink_1.default(commandData);
            case "addRouterPort":
                return new AddRouterPort_1.default(commandData);
            case "removeRouterPort":
                return new RemoveRouterPort_1.default(commandData);
            case "deletePort":
                return new DeletePort_ts_1.default(commandData);
            case "disconnectPort":
                return new DisconnectPort_1.default(commandData);
            case "accessVncUrl":
                return new AccessVncUrl_1.default(commandData);
            case "instancePowerOff":
                return new PowerOff_1.default(commandData);
            case "instancePowerOn":
                return new PowerOn_1.default(commandData);
            case "deviceReboot":
                return new Reboot_1.default(commandData);
            default: return new CommandNull_1.default(commandData);
        }
    };
    CommandManager.prototype.execute = function (commandData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.make(commandData).execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CommandManager;
}());
exports.default = CommandManager;
