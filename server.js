const path = require('path');
const express = require('express');
const app = express();
const {codes, date} = require('./date');
const logger = require('./middleware/logEvents')
const cors = require('cors')

const PORT = process.env.PORT || 7200;

const whitelist = ['https://yourwebsite.com', 'https://www.youtube.com', 'https://www.google.com', undefined]
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1){
            callback(null, true)
        }
        else{
            callback(new Error('Blocked By CORS'), false)
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(logger)
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/subdir', express.static(path.join(__dirname, 'public')))

app.use('/', require('./router/mainRouer'));
app.use('/subdir', require('./router/subRouter'));

app.use((req, res, next, err) => {
    console.error(err.stack);
    res.statusCode = 500;
})

app.all('*', (req, res) => {
    res.statusCode = 404;
    res.sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)});
