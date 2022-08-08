

const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const configCommon = require('../shared/helpers/configCommon.helper')

class MiddlewareIndex {
    constructor(app) {
        this.app = app;
    }

    configureMiddlewares() {
        // Middlewares
        this.app.use((req, res, next) => {
            // console.log('ip', req.ip, req.headers.host, req.get('host'), req.get('origin'));
            let whiteList = configCommon.getWhiteList();
            if (whiteList !== '*') {
                const org = req.get('origin');
                const ip = req.ip.replace('::ffff:', '');
                const host = req.headers.host;
                if (!(whiteList.includes(org) || whiteList.includes(ip) || whiteList.includes(host))) {
                    next(100);
                    return;
                }
            }
            next();
        }).options('*', cors())
        // show console
        this.app.use(morgan('combined'));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(cors({
            origin: configCommon.getWhiteList(),
            // origin: /\.muv-x\.com$/,
            methods: ['GET', 'PUT', 'POST', 'DELETE'],
            // allowedHeaders: [],
            preflightContinue: true
        }))
        // this.app.use(tctTimeAccess.verifyTimeAccess);
    }
}

module.exports = (app) => { return new MiddlewareIndex(app); }
