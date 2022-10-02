const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const { format } = require('date-fns');
const { v4: uuid} = require('uuid');

const logEvents = async (logData, logFile) => {
    const date = `${format(new Date(), 'HH:mm:ss\tdd/MM/yyyy')}`
    const logitems = logData;

    try{
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
           await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFile), logitems);
    }
    catch(err){
        console.log(err)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.url}\t${req.headers.origin}\r`, 'logger.txt')
    next();
};


module.exports = logger;