import { LogType } from "../enums/LogType";

export default interface ILog {
    timestamp: number;
    loglevel: LogType;
    transactionId: string;
    err: string;
    details: string;
  }