import { LogType } from "../enums/LogType";
import ILog from "./ILog";
import IUserLog from "./IUserLog";

export default interface IDebugLog extends Omit<ILog, 'err'> { 
    loglevel: LogType.DEBUG; 
    userId?: number;
    user?: IUserLog 
}
  