export default class PortLimiterror implements Error{
    constructor(){
        this.name = 'Port Limit Error'
        this.message = 'Port Limit Error';
    }
    name: string;
    message: string;
    stack?: string | undefined;
}