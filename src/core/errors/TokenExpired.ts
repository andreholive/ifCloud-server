export default class TokenExpired implements Error{
    constructor(msg:string){
        this.name = 'error';
        this.message = msg;
    }
    name: string;
    message: string;
    stack?: string | undefined;
}