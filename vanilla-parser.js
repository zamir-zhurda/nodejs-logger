const fs = require('fs');
const fsPromise = require('fs/promises')
const readline = require('readline');

const [, , inputCommand, inputFile, outputCommand, outputFile] = process.argv;
console.log('command input',inputCommand)
console.log('file inputFile',inputFile)
console.log('command output',outputCommand)
console.log('file outputFile',outputFile)

readFromFile = async (path) => {
    try {
        const data = await fsPromise.readFile(path, { encoding: 'utf8' });
        console.log("\n [readFromFile] data: ",data);
        return data;
    } catch (err) {
         console.log(err);
    }
}

writeToFile = async (path, data) => {
    try {
        console.log(`\n [writeToFile] path: ${path} \n data: ${data} `);
        fsPromise.writeFile(path, data, err => {
            if(err){
                console.log('Error occurred when writing to file',err)
            }
            process.exit(0);
        });
       
    } catch (err) {
        console.log(err);
    }
}

function convertToEpoch (date) {
    return Date.parse(date)
}

parser = async () => {
    if (inputCommand && outputCommand) {
    //    const data = await readFromFile(inputFile);
    //    console.log("\n [parseInput] data: ",data);
    //    await writeToFile(outputFile, data);       

    const rl = readline.createInterface({
        input:  fs.createReadStream(inputFile),
        output: fs.createWriteStream(outputFile)
     });
   
     rl.on('line', function(line) {
       
        const loglevel = 'error'
        const delimitator = ` - ${loglevel} - `;
        let errorsToStore = []
       
        if(line.indexOf(delimitator) > -1)
        {            
            console.log("=================================");
            console.log(line);
            console.log("=================================");
            const values = line.split(delimitator);
            console.log('values: ',values);

           
            let dateToBeParsed = values[0];
            console.log('dateToBeParsed: ',dateToBeParsed);
            let date = new Date(dateToBeParsed);

            let transactionObject = JSON.parse(values[1]);
            console.log('date: ',convertToEpoch(date));
            console.log('\n transactionObject: ',transactionObject);
         
            const logToStore = {
                timestamp:convertToEpoch(date),
                loglevel,
                transactionId:transactionObject['transactionId'],
                err:transactionObject['err']
            }
            errorsToStore.push(logToStore);
             // Do any 'line' processing if you want and then write to the output file
            this.output.write(`${JSON.stringify(errorsToStore)}\n`);
        }
       
       
    });
    
    rl.on('close', function() {
        console.log(`\nCreated "${this.output.path}"`);
       
    });
  
    }
}
parser();