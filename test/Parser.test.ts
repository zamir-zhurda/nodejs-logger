import LogParser from "../classes/LogParser";
import  { beforeAll,describe, expect, it } from "vitest";
import { LogType } from "../enums/LogType";

const inputCommand =  "--input";
const inputFile = "./app.log";
const outputCommand =  "--output";
const outputFile =  "./test-errors.json";

beforeAll(() => {
   
    //const errorLogParser = new LogParser(inputCommand, inputFile, outputCommand, outputFile, LogType.ERROR );
    expect(() =>  new LogParser(inputCommand, inputFile, outputCommand, outputFile, LogType.ERROR ))
})

describe("Log parser", () => {


    it("should generate a test-errors.json file", async () => {
        // const errorLogParser = new LogParser(inputCommand, inputFile, outputCommand, outputFile, LogType.ERROR );
        expect(() =>  new LogParser(inputCommand, inputFile, outputCommand, outputFile, LogType.ERROR ))
    });
    it("should throw an error when a valid input file is missing", async () => {
        expect(() => new LogParser(inputCommand, null, outputCommand, outputFile, LogType.ERROR )).toThrow(new Error(`file does not exist at path inserted`))
    })

    it("should throw an error when a valid input command is missing", async () => {
        expect(() => new LogParser(null, inputFile, outputCommand, outputFile, LogType.ERROR )).toThrow(new Error(`You did't enter a valid '--input' command`))
    })

    it("should throw an error when a valid output command is missing", async () => {
        expect(() => new LogParser(inputCommand, inputFile, null, outputFile, LogType.ERROR )).toThrow(new Error(`You did't enter a valid '--output' command`))
    })

    it("should throw error when a valid output file is missing", async () => {
        expect(() => new LogParser(inputCommand, inputFile, outputCommand, null, LogType.ERROR )).toThrow(new Error(`You did't enter a valid output file path`))
    })
});