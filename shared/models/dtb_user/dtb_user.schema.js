//FILE NÀY ĐỂ DEFINE CÁC THUỘC TÍNH CỦA FIELD_NAME
const { FIELD_NAME, USER } = require('../../helpers/constant.helper');

function getSchema(DataTypes) {
    return {
        [FIELD_NAME.USER_ID]: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },


        [FIELD_NAME.FIRST_NAME]: {
            type: DataTypes.STRING
        },
        [FIELD_NAME.LAST_NAME]: {
            type: DataTypes.STRING,
        },
        [FIELD_NAME.USERNAME]: {
            type: DataTypes.STRING,
        },
        [FIELD_NAME.EMAIL]: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isEmail: true
            }
        },
        [FIELD_NAME.ADDRESS]: {
            type: DataTypes.STRING,
        },
        [FIELD_NAME.BIRTH]: {
            type: DataTypes.DATE,
        },
        [FIELD_NAME.PHONE_NUMBER]: {
            type: DataTypes.STRING,
        },
        [FIELD_NAME.PASSWORD]: {
            type: DataTypes.STRING,
        },
        [FIELD_NAME.SEX]: {
            type: DataTypes.INTEGER(2),
        },
        [FIELD_NAME.DEL_FLG]: {
            type: DataTypes.INTEGER(1),
            defaultValue: 0
        },
        [FIELD_NAME.CREATE_DATE]: {
            type: DataTypes.BIGINT
        },
        [FIELD_NAME.UPDATE_DATE]: {
            type: DataTypes.BIGINT
        },
        [FIELD_NAME.IMAGE]: {
            type: DataTypes.TEXT
        },
        [FIELD_NAME.STATUS]: {
            type: DataTypes.INTEGER(1)
        },
        [FIELD_NAME.ROLE]: {
            type: DataTypes.INTEGER(1),
            defaultValue: USER.ROLE.NORMAL
        },
        [FIELD_NAME.IS_BLOCK]: {
            type: DataTypes.INTEGER(1)
        },
    };
}

// console.log([FIELD_NAME.USER_ID])
// console.log(typeof ([FIELD_NAME.USER_ID]))
// console.log(typeof ([FIELD_NAME.FIRST_NAME]))
module.exports = {
    getSchema
}
