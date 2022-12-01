export default class Error404 implements Error{
    constructor(msg:string){
        this.name = 'Error404';
        this.message = msg;
    }
    name: string;
    message: string;
    stack?: string | undefined;
}