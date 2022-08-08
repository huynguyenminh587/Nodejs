const moment = require('moment');
const _ = require('lodash');
const shajs = require('jssha')
const sha256 = require('js-sha256');
const Sequelize = require('sequelize');
const db = require('../models/db');
const dateUtils = require('./dateUtils.helper');
const Constant = require('./constant.helper');
const uniqid = require('uniqid');
const configCommon = require('../helpers/configCommon.helper');
const dbConfig = configCommon.getDb()
const uploadFileHandle = require('../../shared/helpers/uploadFile.helper');
const IMAGE_LINK = configCommon.getImageLink();
const IMAGE_DIR = configCommon.getImageDir();
const Op = Sequelize.Op
const FIELD_NAME = Constant.FIELD_NAME;

/**
 * @description push multi field into query object
 * @param {*} text
 * @param  {...any} fields
 */
const pushQueryObject = (text, ...fields) => {
    const queryObject = [];
    if (!text || !fields || fields.length === 0) {
        return queryObject;
    }
    if (isNaN(text)) {
        const time = dateUtils.convertTimeStampToString(text);
        // queryObject.push([
        //     Sequelize.where(
        //         Sequelize.fn('DATE_FORMAT', Sequelize.col(FIELD_NAME.CREATED_AT), '%Y-%m-%d'),
        //         { [Op.eq]: Sequelize.fn('DATE_FORMAT', date, '%Y-%m-%d') })
        // ])
        queryObject.push({ [FIELD_NAME.CREATED_AT]: { [Sequelize.Op.between]: [time.startDate, time.endDate] } });
        return queryObject;
    }
    for (let i = 0; i < fields.length; i++) {
        queryObject.push({ [fields[i]]: { [Op.like]: `%${text}%` } });
    }
    return queryObject;
}

/**
 * @description random string or number
 * @param {*} length length of string random
 * @param {*} isNumber
 */
function getRandomNumberOrString(length, isNumber) {
    let text = '';
    let possible;
    if (isNumber) {
        possible = '0123456789'
    } else {
        possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    }
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

const checkInputJapanese = (input) => {
    const regex = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
    if (regex.test(input)) {
        return true
    }
    return false;
}

const pushIncludeObject = (tableName, values, colum, conditionSquelize) => {
    const includeObj = {
        model: db.models[tableName],
        require: false,
        through: {
            attributes: [],
        }
    }
    if (values) {
        includeObj.where = {
            [colum]: { [conditionSquelize]: values }
        }
    }
    return includeObj;
}

const getSecretkey = (head = '') => {
    const random = getRandomNumberOrString(8);
    const id = uniqid(head);
    return `${id}${random}`;
}

const matchHashPassword = (pass, hashpass, salt) => {
    let res = false;
    if (hashpass) {
        let hash;
        if (!salt) {
            // 旧バージョン(2.11未満)からの移行を考慮
            hash = shajs.sha1(`${pass}:${dbConfig.auth_magic}`);
        } else {
            hash = getHashString(pass, salt);
        }
        if (hash == hashpass) {
            res = true;
        }
    }
    return res;
}

const getHashString = (str, salt) => {
    if (salt == '') {
        salt = dbConfig.auth_magic;
    }
    const shaObj = new shajs(dbConfig.password_hash_algos, 'TEXT', {
        hmacKey: { value: salt, format: 'TEXT' },
    });
    shaObj.update(`${str}:${dbConfig.auth_magic}`);
    const res = shaObj.getHash('HEX');
    return res;
}

const createPronounceable = (length) => {

    let retVal = '';

    /**
     * List of vowels and vowel sounds
     */
    const v = ['a', 'e', 'i', 'o', 'u', 'ae', 'ou', 'io',
        'ea', 'ou', 'ia', 'ai'
    ];

    /**
     * List of consonants and consonant sounds
     */
    const c = ['b', 'c', 'd', 'g', 'h', 'j', 'k', 'l', 'm',
        'n', 'p', 'r', 's', 't', 'u', 'v', 'w',
        'tr', 'cr', 'fr', 'dr', 'wr', 'pr', 'th',
        'ch', 'ph', 'st', 'sl', 'cl'
    ];

    const v_count = 12;
    const c_count = 29;

    for (let i = 0; i < length; i++) {
        retVal = retVal.concat(c[randomIntFromInterval(0, c_count - 1)].concat(v[randomIntFromInterval(0, v_count - 1)]));
    }

    return retVal.substring(0, length);
}

const getRandomString = (length = 1) => {
    return createPronounceable(length);
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const uploadFileToDisk = async (dataImage, objId) => {
    const { name, extension, base64 } = dataImage
    const fileName = `${name}_${objId}_${moment().valueOf()}`;
    // add image to disk
    await uploadFileHandle.uploadToDisk(IMAGE_DIR, fileName, extension, base64);
    return `${IMAGE_LINK}/${fileName}.${extension}`;
}

module.exports = {
    pushQueryObject,
    getRandomNumberOrString,
    checkInputJapanese,
    pushIncludeObject,
    getSecretkey,
    matchHashPassword,
    getRandomString,
    getHashString,
    uploadFileToDisk
}
