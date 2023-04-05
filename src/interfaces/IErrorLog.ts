import { LogType } from "../enums/LogType";
import ILog from "./ILog";

export default interface IErrorLog extends Omit<ILog, 'details'> { 
    loglevel: LogType.ERROR;  
  }
  