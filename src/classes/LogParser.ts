import IErrorLog from '../interfaces/IErrorLog';
import { LogType } from '../enums/LogType';
import ErrorLog from './ErrorLog';
import ILog from '../interfaces/ILog';
import IDebugLog from '../interfaces/IDebugLog';
import DebugLog from './DebugLog';
import IInfoLog from '../interfaces/IInfoLog';
import InfoLog from './InfoLog';
import WarnLog from './WarnLog';
import convertToEpoch from '../utils';
import IWarnLog from '../interfaces/IWarnLog';

const fs = require('fs');
const readline = require('readline');

export default class LogParser
{ 
    constructor( public inputCommand: string, public inputFilePath: string, public outputCommand: string, public outputFilePath: string, public loglevel?: LogType ) {
        
        if (!fs.existsSync(inputFilePath)){
           console.log(`file does not exist at path ${inputFilePath}`);
           throw new Error(`file does not exist at path inserted`)
          //  return;
        }

        if (!outputFilePath){
          console.log(`You did't enter a valid output file path`);
          throw new Error(`You did't enter a valid output file path`)
          // return;
        }

        const isValidInputCommand = inputCommand && (inputCommand === "--input" || inputCommand === '-i');

        if (!isValidInputCommand) {
          console.log(`You did't enter a valid '--input' command`);
          throw new Error(`You did't enter a valid '--input' command`)
          return;
        }

        const isValidOutputCommand = outputCommand && (outputCommand === "--output" || outputCommand === '-o');

        if (!isValidOutputCommand) {
          console.log(`You did't enter a valid '--output' command`);
          throw new Error(`You did't enter a valid '--output' command`)
          // return;
        }

        var inputStream = fs.createReadStream(inputFilePath);
        var outputStream = fs.createWriteStream(outputFilePath);
        var readInterface = readline.createInterface({ input: inputStream, output: outputStream });
        
        let lineNumber = 0;
        
        readInterface.on('line', (line : any ) => {
            // when new lines arrive we can publish an event to listeners
            const logType = this.loglevel ? this.loglevel.toString() : LogType.ERROR;
               
            const splitter = ` - ${logType} - `;

            if(line.indexOf(splitter) > -1){            
              const values = line.split(splitter);
              let dateToBeParsed = values[0];   

              const [, ...messageParts] = values;
              const message = messageParts.join(splitter);   
            //#region using if statements
            //   if(logType == LogType.ERROR)
            //  {
            //   let transactionObject: IErrorLog = values[1] && JSON.parse(values[1]);
            //   let errorLog: IErrorLog;
            //   errorLog = new ErrorLog(convertToEpoch(dateToBeParsed), LogType.ERROR, transactionObject.transactionId, transactionObject.err)
            //  
            //   if(lineNumber == 0) {
            //     readInterface.output.write(`[`); //opening the array
            //     readInterface.output.write(`${JSON.stringify(errorLog)}`);
            //   } else if( lineNumber > 0 ){
            //     let separator = ",";
            //     readInterface.output.write(`${separator}${JSON.stringify(errorLog)}`);               
            //   }           
                            
            //   lineNumber++

            //  } else if (logType == LogType.DEBUG) {
            //   let transactionObject: IDebugLog = values[1] && JSON.parse(values[1]);
            //   let debugLog: IDebugLog;
            //   debugLog = new DebugLog(convertToEpoch(dateToBeParsed), LogType.DEBUG, transactionObject.transactionId, transactionObject.details, transactionObject.userId, transactionObject.user)
            //   if(lineNumber == 0) {
            //     readInterface.output.write(`[`); //opening the array
            //     readInterface.output.write(`${JSON.stringify(debugLog)}`);
            //   } else if( lineNumber > 0 ){
            //     let separator = ",";
            //     readInterface.output.write(`${separator}${JSON.stringify(debugLog)}`);               
            //   }           
                            
            //   lineNumber++

            //  } else if (logType == LogType.INFO) {
            //   let transactionObject: IInfoLog = values[1] && JSON.parse(values[1]);
            //   let infoLog: IInfoLog;
            //   infoLog = new InfoLog(convertToEpoch(dateToBeParsed), LogType.INFO, transactionObject.transactionId, transactionObject.details)
            //   if(lineNumber == 0) {
            //     readInterface.output.write(`[`); //opening the array
            //     readInterface.output.write(`${JSON.stringify(infoLog)}`);
            //   } else if( lineNumber > 0 ){
            //     let separator = ",";
            //     readInterface.output.write(`${separator}${JSON.stringify(infoLog)}`);               
            //   }           
                            
            //   lineNumber++
            //  } else if (logType == LogType.WARN ) {
            //   let transactionObject: WarnLog = values[1] && JSON.parse(values[1]);
            //   let warnLog: WarnLog;
            //   warnLog = new WarnLog(convertToEpoch(dateToBeParsed), LogType.WARN, transactionObject.transactionId, transactionObject.details,transactionObject.code,transactionObject.err)
             
            //   if(lineNumber == 0) {
            //     readInterface.output.write(`[`); //opening the array
            //     readInterface.output.write(`${JSON.stringify(warnLog)}`);
            //   } else if( lineNumber > 0 ){
            //     let separator = ",";
            //     readInterface.output.write(`${separator}${JSON.stringify(warnLog)}`);               
            //   }           
                            
            //   lineNumber++
            //  }
            //#endregion

             switch (logType) {
              case LogType.ERROR:
                let iErrorLog: IErrorLog = message && JSON.parse(message);
                let errorLog: ErrorLog;
                errorLog = new ErrorLog(convertToEpoch(dateToBeParsed), LogType.ERROR, iErrorLog.transactionId, iErrorLog.err)
                if(lineNumber == 0) {
                  readInterface.output.write(`[`); //opening the array
                  readInterface.output.write(`${JSON.stringify(errorLog)}`);
                } else if( lineNumber > 0 ){
                  let separator = ",";
                  readInterface.output.write(`${separator}${JSON.stringify(errorLog)}`);               
                }           
                              
                lineNumber++
                break;

              case LogType.DEBUG:
                let iDebugLog: IDebugLog = message && JSON.parse(message);
                let debugLog: DebugLog;
                debugLog = new DebugLog(convertToEpoch(dateToBeParsed), LogType.DEBUG, iDebugLog.transactionId, iDebugLog.details, iDebugLog.userId, iDebugLog.user)
                if(lineNumber == 0) {
                  readInterface.output.write(`[`); //opening the array
                  readInterface.output.write(`${JSON.stringify(debugLog)}`);
                } else if( lineNumber > 0 ){
                  let separator = ",";
                  readInterface.output.write(`${separator}${JSON.stringify(debugLog)}`);               
                }           
                              
                lineNumber++
                break;

              case LogType.INFO:
                  let iInfoLog: IInfoLog = message && JSON.parse(message);
                  let infoLog: InfoLog;
                  infoLog = new InfoLog(convertToEpoch(dateToBeParsed), LogType.INFO, iInfoLog.transactionId, iInfoLog.details)
                  if(lineNumber == 0) {
                    readInterface.output.write(`[`); //opening the array
                    readInterface.output.write(`${JSON.stringify(infoLog)}`);
                  } else if( lineNumber > 0 ){
                    let separator = ",";
                    readInterface.output.write(`${separator}${JSON.stringify(infoLog)}`);               
                  }           
                                
                  lineNumber++
                 break;

              case LogType.WARN:
              let iWarnLog: IWarnLog = message && JSON.parse(message);
              let warnLog: WarnLog;
              warnLog = new WarnLog(convertToEpoch(dateToBeParsed), LogType.WARN, iWarnLog.transactionId, iWarnLog.details, iWarnLog.code, iWarnLog.err)
             
              if(lineNumber == 0) {
                readInterface.output.write(`[`); //opening the array
                readInterface.output.write(`${JSON.stringify(warnLog)}`);
              } else if( lineNumber > 0 ){
                let separator = ",";
                readInterface.output.write(`${separator}${JSON.stringify(warnLog)}`);               
              }           
                            
              lineNumber++
                 break;
              default:
                break;
             }
            }
            
        });
        
        readInterface.on('close', async () => {
          readInterface.output.write(`]`); //closing the array
          console.log(`\nCreated "${readInterface.output.path}"`);         
        });
    }

}