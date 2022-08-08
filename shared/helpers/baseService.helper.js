const _ = require('lodash');
const axios = require('axios');
const appConstant = require('./constant.helper')

const DEFAULT = appConstant.DATABASE_DEFAULT

async function postData(url, header, data) {
    const result = await axios({
        method: 'POST', // you can set what request you want to be
        url,
        data,
        headers: _.merge({
            'Content-Type': 'application/json',
        }, header),
    })
    return result;
}

async function postDataFormUrlEncode(url, header, data) {
    const result = await axios({
        method: 'POST', // you can set what request you want to be
        url,
        data,
        headers: _.merge({
            'Content-Type': 'application/x-www-form-urlencoded',
        }, header),
    })
    return result;
}

async function getData(url, header, params = null) {
    const result = await axios({
        method: 'GET', // you can set what request you want to be
        url,
        params,
        headers: _.merge({
            'Content-Type': 'application/json',
        }, header),
    })
    return result;
}

const checkPagination = (page = 1, limit = DEFAULT.LIMIT) => {
    page = parseNumber(page, DEFAULT.PAGE);
    limit = parseNumber(limit, DEFAULT.LIMIT);
    const offset = page > 0 ? (page - 1) * limit : page;
    return {
        offset,
        limit
    }
}

const parseNumber = (value, defaultValue = 0) => {
    value = parseInt(value, 10);
    return Number.isNaN(value) || value < 0 ? defaultValue : value;
}

module.exports = {
    postData,
    getData,
    postDataFormUrlEncode,
    checkPagination
}
