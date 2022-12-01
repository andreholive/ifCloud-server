"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(userCommandData) {
        this.id = userCommandData.userId;
        this.token = userCommandData.token;
        this.sessionId = userCommandData.sessionId;
        this.sendData = function (msg) { return userCommandData.sendAction(msg); };
    }
    User.prototype.sendMsgToUser = function (msg) {
        this.sendData(msg);
    };
    return User;
}());
exports.default = User;
