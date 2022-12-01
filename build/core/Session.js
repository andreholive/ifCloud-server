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
var CommandManager_1 = require("./managers/CommandManager");
var Diagram_1 = __importDefault(require("./diagram/Diagram"));
var UserModel_1 = __importDefault(require("./core-models/UserModel"));
var DiagramListener_1 = __importDefault(require("./diagram/DiagramListener"));
var BaseObserver_1 = __importDefault(require("./diagram/BaseObserver"));
var Session = /** @class */ (function (_super) {
    __extends(Session, _super);
    function Session(engine, id) {
        var _this = _super.call(this) || this;
        _this.engine = engine;
        _this.getUsers = function () { return _this.users; };
        _this.getUser = function (userId) { return _this.users[userId]; };
        _this.deregisterUser = function (userId) {
            delete _this.users[userId];
            if (Object.keys(_this.users).length == 0) {
                _this.engine.deregisterSession(_this.id);
                _this.monitorEnabled = false;
            }
        };
        _this.registerUser = function (userCommandData) {
            if (!_this.users[userCommandData.userId]) {
                var user = new UserModel_1.default(userCommandData);
                _this.users[userCommandData.userId] = user;
                if (!_this.monitorEnabled) {
                    _this.startMonitor();
                }
            }
        };
        _this.users = {};
        _this.id = id;
        _this.diagram = new Diagram_1.default(_this);
        _this.monitorEnabled = false;
        _this.registerListener(new DiagramListener_1.default(_this.diagram));
        return _this;
    }
    Object.defineProperty(Session.prototype, "_engine", {
        get: function () {
            return this.engine;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Session.prototype, "_diagram", {
        get: function () {
            return this.diagram;
        },
        enumerable: false,
        configurable: true
    });
    Session.prototype.getInstanceStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user, data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.monitorEnabled) return [3 /*break*/, 3];
                        user = Object.values(this.users).find(function (user) { return user.sessionId === _this.id; });
                        if (!user) return [3 /*break*/, 2];
                        data = {
                            command: CommandManager_1.DiagramFunction.getInstanceStatus,
                            data: null,
                            user: user,
                            session: this
                        };
                        return [4 /*yield*/, this.engine._cmdMngr.execute(data)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.getInstanceStatus()];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 1000);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Session.prototype.startMonitor = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.monitorEnabled = true;
                        return [4 /*yield*/, this.getInstanceStatus()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return Session;
}(BaseObserver_1.default));
exports.default = Session;
