import { LogType } from "../enums/LogType";
import IWarnLog from "../interfaces/IWarnLog";

export default class WarnLog implements IWarnLog { 

    constructor(public timestamp: number, public loglevel: LogType.WARN,  public transactionId: string, public details: string, public code: number, public err: string){
      
    }
}