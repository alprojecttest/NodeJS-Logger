const logEvents = require('./logEvents');
const EventEmitter = require('events');
class MyEmitter extends EventEmitter { }
const myEmitter = new MyEmitter();
const http = require('http');
const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const PORT = process.env.PORT || 7200;

let filePath;

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    if(req.url == '/' || req.url == 'index.html'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        filePath = path.join(__dirname, 'views', 'index.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            res.end(data);
        });
    }
});

server.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})

/*

myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
    myEmitter.emit('log', 'Log emitted!')
}, 3000)*/


