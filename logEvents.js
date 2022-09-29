const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const { format } = require('date-fns');
const { v4: uuid} = require('uuid');

const logEvents = async (message) => {
    const date = `${format(new Date(), 'HH:mm:ss\tdd/MM/yyyy')}`
    const logitems = `${date}\t${uuid()}\t${(message)}\r`;
    console.log(logitems)

    try{
        if(!fs.existsSync(path.join(__dirname, 'logs'))){
           await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'logger.txt'), logitems);
    }
    catch(err){
        console.log(err)
    }
}

module.exports = logEvents;