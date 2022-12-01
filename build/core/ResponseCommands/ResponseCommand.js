"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseCommand = /** @class */ (function () {
    function ResponseCommand(commandData) {
        this.user = commandData.user;
        this.command = commandData.command;
        this.session = commandData.session;
        this.data = commandData.data;
    }
    ResponseCommand.prototype.send = function (data) {
        this.session.fireEvent(data, this.session.id, this.command);
        this.user.sendData({ action: this.command, data: data });
    };
    return ResponseCommand;
}());
exports.default = ResponseCommand;
