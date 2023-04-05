import LogParser from './classes/LogParser';
import { LogType } from './enums/LogType';
const [, , inputCommand, inputFile, outputCommand, outputFile] = process.argv;
console.log("inputCommand: ",inputCommand)
console.log("inputFile: ",inputFile)
console.log("outputCommand: ",outputCommand)
console.log("outputFile: ",outputFile)
const errorParser: LogParser = new LogParser(inputCommand, inputFile, outputCommand, outputFile, LogType.ERROR);
// const debugParser: LogParser = new LogParser(inputCommand, inputFile, outputCommand, outputFile, LogType.DEBUG);
// const infoParser: LogParser = new LogParser(inputCommand, inputFile, outputCommand, outputFile, LogType.INFO);
// const warnParser: LogParser = new LogParser(inputCommand, inputFile, outputCommand, outputFile, LogType.WARN);