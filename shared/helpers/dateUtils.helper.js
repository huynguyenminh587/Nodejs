const moment = require('moment');
const configCommon = require('./configCommon.helper')

const { options } = configCommon.getDb();
const FOMAT_DATE = "YYYY-MM-DD HH:mm:ss";


const convertTimeStampToString = (timeStamp, format = 'YYYY-MM-DD', timeZone = options.timezone) => {
    const startDate = moment.unix(timeStamp).utcOffset(timeZone).startOf('date').format(format);
    const endDate = moment.unix(timeStamp).utcOffset(timeZone).endOf('date').format(format);
    return { date, startDate, endDate };
}

/**
 *
 * @param {*} timeServer
 * @param {*} timeZone
 */
const convertTimeClient = (timeServer, format = FOMAT_DATE, timeZone = options.timezone) => {
    const timeStamp = moment(timeServer, format).unix();
    const val = moment.unix(timeStamp).utcOffset(timeZone).format(format);
    return val;
}

const convertTimeZoneToString = (timezone) => {
    if (!timezone) {
        return options.timezone;
    }
    if (timezone > 0) {
        return timezone < 10 ? `+0${timezone}:00` : `+${timezone}:00`;
    }
    return timezone > -10 ? `-0${-timezone}:00` : `-${-timezone}:00`;
}

const convertStringToDate = (time, format = FOMAT_DATE, timezone = options.timezone) => {
    let date = moment(time, format).utcOffset(timezone);
    return date.format(format);
}

const getCurentTime = (timezone = options.timezone, format = FOMAT_DATE) => {
    return moment().utcOffset(timezone).format(format).valueOf();
}

const convertDateSearch = (date, timezone = options.timezone) => {
    return moment(date).utcOffset(timezone).startOf('d').valueOf();
}

const getCurrentDate = (timezone = options.timezone) => {
    return moment().utcOffset(timezone).valueOf();
}

module.exports = {
    convertTimeStampToString,
    convertTimeClient,
    convertTimeZoneToString,
    convertStringToDate,
    getCurentTime,
    FOMAT_DATE,
    convertDateSearch,
    getCurrentDate
}
