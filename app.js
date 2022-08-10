const _ = require('lodash');
const express = require('express')
const chalk = require('chalk')

const app = express();

const i18n = require('i18n');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
// const swaggerIndex = require('./docs/index')
const db = require('./shared/models/db');
const configCommon = require('./shared/helpers/configCommon.helper')
const generalErrorHandler = require('./shared/helpers/generalErrorHandler.helper');
const dotenv = require('dotenv')



const port = process.env.PORT || 8099;
// for parsing application/json

//dotenv
dotenv.config()
// console.log(process.env.JWT_SECRET)
app.use(bodyParser.json({ limit: '50mb' }));
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/image-server', express.static(configCommon.getImageDir()));

/**
* =====================
*  Config middleware
* =====================
*/
const middlewares = require('./middlewares')(app);
// configure middlewares
middlewares.configureMiddlewares();
// const routerIndex = require('./routes')(app);

// routerIndex.registerRoutes();
/**
* =====================
*  Config Api document
* =====================
*/

// swaggerIndex(app, fs).getSwaggerTools()
/**
* =====================
*  Config Api error
* =====================
*/
app.use(generalErrorHandler.handleError);

i18n.configure({
    locales: configCommon.getLanguageSupport(),
    directory: `${__dirname}/config/locales`
});

// const router = require('./routes/index')
/**
* =====================
*  Config SocketIO
* =====================
*/
// const socketServer = require('./socket/server.socket');

// const redisAdapter = require('socket.io-redis');

// io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

/**
* ==============
* Init mysql
* ==============
*/
db.connect()
    .then(() => {
        db.initData();

        console.log('Connection has been established of database successfully');
        let server;
        if (process.env.MODE_BUILD === 'prod') {
            const options = {
                key: fs.readFileSync("/etc/letsencrypt/live/autham.jp/privkey.pem"),
                cert: fs.readFileSync("/etc/letsencrypt/live/autham.jp/fullchain.pem"),
            };
            server = https.createServer(options, app);
        } else {
            server = require('http').Server(app);
        }
        // app.get('/', (req, res) => {
        //     res.send('Hello World')
        // })

        // app.use('/api/v1', router)
        require('./routes/login_register')(app)
        server.listen(port, () => {
            console.log(chalk.red('Server api development running at'), ` http://:${port}/`);
            //    console.log(chalk.blue('Server socket development running at'), ` http://:${port}/`)
            console.log(chalk.yellow('Api doc is available on'), ` http://localhost:${port}/docs`);
        });
    }).catch((error) => {
        console.log(error);
        process.exit();
    });
// app.get('/', (req, res) => {
//     res.send('Hello World')
// })
// app.listen(3000)
module.exports = app;
