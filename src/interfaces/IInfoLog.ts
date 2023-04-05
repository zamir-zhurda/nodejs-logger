import { LogType } from "../enums/LogType";
import ILog from "./ILog";

export default interface IInfoLog extends Omit<ILog, 'err' > { 
    loglevel: LogType.INFO;  
}