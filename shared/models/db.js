
const Sequelize = require('sequelize');
const configCommon = require('../helpers/configCommon.helper')
const appConstant = require('../helpers/constant.helper')

const {
    database, username, password, options
} = configCommon.getDb();
const dataMaster = configCommon.getDataMaster();

const { TABLE } = require('../helpers/constant.helper')
const models = {};
const sequelize = new Sequelize(database, username, password, options);

function connect() {
    console.log('connect start');
    initModels();
    return sequelize.authenticate()
        .then(() => {
            return sequelize.sync() //dong bo hoa database
        }).then(() => {

        }).catch((error) => {
            console.log(error);
            throw error;
        })
}

// merge the properties from models into this Db object
function initModels() {
    models[TABLE.DTB_USER] = sequelize.import('./dtb_user');

    Object.values(models)
        .filter(model => typeof model.associate === 'function')
        .forEach(model => model.associate(models));
}


function rawQuery(sql, whereClause) {
    return sequelize.query(sql, whereClause).then(result => {
        return result;
    })
}

function initData() {
    if (options.sync.force && options.sync.alter) {
        // set data master when created db
    }
    // models[TABLE.DTB_CUSTOMER].findOne({ where: { email: dataMaster.member.email } }).then((user => {
    //     if (!user) {
    //         dataMaster.member.password = passwordManagement.hashPasswordMd5(dataMaster.member.password)
    //         return models[TABLE.DTB_CUSTOMER].createUser(dataMaster.member)
    //     }
    // }))
}

module.exports = {
    connect,
    initData,
    rawQuery,
    sequelize,
    Sequelize,
    models
}
