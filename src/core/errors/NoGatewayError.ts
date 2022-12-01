export default class NoGatewayError implements Error{
    constructor(){
        this.name = 'No gateway Error';
        this.message = 'sem roteador para desconectar';
    }
    name: string;
    message: string;
    stack?: string | undefined;
}