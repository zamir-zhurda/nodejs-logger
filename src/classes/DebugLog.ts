import IDebugLog from "../interfaces/IDebugLog";
import { LogType } from "../enums/LogType";
import IUserLog from "../interfaces/IUserLog";


export default class DebugLog implements IDebugLog { 

    constructor(public timestamp: number, public loglevel: LogType.DEBUG,  public transactionId: string, public details: string, public userId?: number, public user?: IUserLog){
      
    }
}