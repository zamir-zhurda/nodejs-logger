import IInfoLog from "../interfaces/IInfoLog";
import { LogType } from "../enums/LogType";

export default class InfoLog implements IInfoLog { 

    constructor(public timestamp: number, public loglevel: LogType.INFO,  public transactionId: string, public details: string){
      
    }
}