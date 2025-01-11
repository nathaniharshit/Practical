const { log } = require('console');
var os = require('os')
var fs = require('fs');
const path = require('path');

const SystemInfo = {
    osType: os.type(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    cpus: os.cpus()
}; 

const cpuInfo = SystemInfo.cpus.map((cpu, index) => {
    return `CPU ${index + 1}: ${cpu.model} - ${cpu.speed} MHz`;
}).join('\n'); //We make it more readable the cpu details

const logData = `System Information:
---------------------------------------
OS Type: ${SystemInfo.osType}
Total Memory: ${SystemInfo.totalMemory} GB
Free Memory: ${SystemInfo.freeMemory} GB

CPU Details: ${cpuInfo}
`; //We store all the data in logData naam ke variable mein ya fir array mein

const logFile = path.join(__dirname,'logs','SystemInfo.txt')

fs.mkdir(path.dirname(logFile),{recursive:true},(err) =>{ //
    if(err){
        console.log("Error in making Directory");
        return;
    }
    else{
        console.log("System Information Stored to log file");
        
    }

fs.writeFile(logFile,logData,(err) =>{
    if(err){
        console.log("Error writing in file");
        return;
    }
    else{
        console.log("Content written in lof file Check it!!!!");
    }
});
});

