const logger = require('./logger');
const { userMessage } = require('./localesUtils.helper')

const errorMapping = {
    100: 'INVALID_KEY',
    101: 'INVALID_TIME_ACCESS',
    102: 'INVALID_TOKEN',
    105: 'INVALID_AUTH',
    106: 'INVALID_ACCESS_TOKEN',
    107: 'BLOCK_ACCOUNT'
}
class GeneralErrorHandler {
    handleError(code, req, res, next) {
        if (code) {
            if (code instanceof Error) {
                // logger(`unhandled Error ${code}`);
                res.status(400).send({ code: 400, message: code.message });
            } else if (code === 107) {
                // logger(`handError ${code}`);
                res.status(403).send({ code, message: userMessage().LOGIN.THIS_ACCOUNT_IS_CURRENTLY_UNAVAILABLE });
            } else if (code !== undefined) {
                // logger(`handError ${code}`);
                res.status(401).send({ code, message: errorMapping[code] });
            } else {
                // logger(`unhandle error`);
                res.status(500).send({ code: 500, message: 'UNHANDLED_ERROR' });
            }
        } else {
            // logger(`unhandle error`);
            res.status(500).send({ code: 500, message: 'UNHANDLED_ERROR' });
        }
    }
}

module.exports = new GeneralErrorHandler();
