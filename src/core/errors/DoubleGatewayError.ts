export default class DoubleGatewayError implements Error{
    constructor(){
        this.name = 'erro ao fazer o link';
        this.message = 'Não é permitido 2 roteadores na mesma rede';
    }
    name: string;
    message: string;
    stack?: string | undefined;
}