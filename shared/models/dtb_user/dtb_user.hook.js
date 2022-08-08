const moment = require('moment');
const { FIELD_NAME } = require('../../helpers/constant.helper');

function getHooks() {
    return {
        beforeCreate: (data) => {
            data[FIELD_NAME.CREATE_DATE] = moment().valueOf();
            data[FIELD_NAME.UPDATE_DATE] = moment().valueOf();
        },
        beforeUpdate: (data) => {
            data[FIELD_NAME.UPDATE_DATE] = moment().valueOf()
        }
    }
}
module.exports = {
    getHooks
}
