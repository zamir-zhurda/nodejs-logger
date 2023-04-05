import IErrorLog from "../interfaces/IErrorLog";
import { LogType } from "../enums/LogType";

export default class ErrorLog implements IErrorLog { 

    constructor(public timestamp: number, public loglevel: LogType.ERROR,  public transactionId: string, public err: string){
      
    }
}