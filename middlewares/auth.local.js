const appConstant = require('../shared/helpers/constant.helper');
const localesUtils = require('../shared/helpers/locales_utils');


async function verifyAuth(req, res, next) {
    let lang = req.header(appConstant.HEADER.LOCALE_HEADER);
    if (!lang) {
        lang = appConstant.HEADER.LOCALE_DEFAULT;
    }
    const auth = req.header(appConstant.HEADER.AUTH);
    try {
        if (!auth) {
            throw new Error(localesUtils.userMessage(lang).AUTH.AUTHENTICATION_TOKEN_NOT_FOUND);
        } else {
            res.locals.auth = auth
            next();
        }
    } catch (err) {
        next(105);
    }
}

module.exports = {
    verifyAuth
}
