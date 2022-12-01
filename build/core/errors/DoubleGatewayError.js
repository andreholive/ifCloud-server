"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DoubleGatewayError = /** @class */ (function () {
    function DoubleGatewayError() {
        this.name = 'erro ao fazer o link';
        this.message = 'Não é permitido 2 roteadores na mesma rede';
    }
    return DoubleGatewayError;
}());
exports.default = DoubleGatewayError;
