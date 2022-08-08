
const _ = require('lodash')
const { models } = require('../shared/models/db');
const userAuthentication = require('../shared/security/user_authentication')

const { TABLE, FIELD_NAME, BOOLEAN_VALUE } = require('../shared/helpers/constant.helper');
const appConstant = require('../shared/helpers/constant.helper')

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const verifyToken = async (req, res, next) => {
    try {
        let reqToken = req.header('token');
        let lang = req.header('locale');
        if (reqToken) {
            const token = await userAuthentication.verifyToken(reqToken, lang)
            const userOauth = await models[TABLE.DTB_OAUTH].getData({
                [FIELD_NAME.USER_ID]: token.dataValues.dtb_user.user_id,
                [FIELD_NAME.DEL_FLG]: BOOLEAN_VALUE.FALSE
            })
            if (userOauth) {
                res.locals.social_id = userOauth[FIELD_NAME.SOCIAL_ID];
            }
            res.locals.tid = token.id;
            res.locals.uid = token.dataValues.dtb_user.user_id;
            res.locals.lang = lang;
            next();
        } else {
            next(102)
        }
    }
    catch (err) {
        console.log(err)
        next(102)
    }
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const verifyTokenAdmin = async (req, res, next) => {
    try {
        let reqToken = req.header('token');
        let lang = req.header('locale');
        if (reqToken) {
            const token = await userAuthentication.verifyToken(reqToken, lang)
            res.locals.tid = token.id;
            res.locals.lang = lang;
            next();
        } else {
            next(102)
        }
    }
    catch (err) {
        console.log(err)
        next(102)
    }
}

/**
 *
 * @param {*} token
 */
const getDataByToken = async (token) => {
    try {
        return models[TABLE.TOKEN].getByToken(token).then((item) => {
            return item.member
        })
    } catch (err) {
        throw (err)
    }
}

module.exports = {
    verifyToken,
    verifyTokenAdmin,
    getDataByToken
}
