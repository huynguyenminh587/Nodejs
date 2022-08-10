/**FILE NÀY ĐỂ TẠO  CREATE_DATE VÀ UPDATE_DATE */

const moment = require('moment');
const { FIELD_NAME } = require('../../helpers/constant.helper');

function getHooks() {
    return {
        beforeCreate: (data) => {
            data[FIELD_NAME.CREATE_DATE] = moment().valueOf();
            //console.log(typeof (data[FIELD_NAME.CREATE_DATE]))
            data[FIELD_NAME.UPDATE_DATE] = moment().valueOf();
        },
        beforeUpdate: (data) => {
            data[FIELD_NAME.UPDATE_DATE] = moment().valueOf()
        }
    }
}

// console.log(getHooks());
getHooks()
module.exports = {
    getHooks
}



