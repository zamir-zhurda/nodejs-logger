import { LogType } from "../enums/LogType";
import ILog from "./ILog";

export default interface IWarnLog extends ILog { 
    loglevel: LogType.WARN;  
    code:number
}
  