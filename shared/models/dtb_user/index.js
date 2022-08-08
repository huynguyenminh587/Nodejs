
const objSchema = require('./dtb_user.schema')
const objMethods = require('./dtb_user.class_methods');

const hooks = require('./dtb_user.hook').getHooks()
const { FIELD_NAME, TABLE } = require('../../helpers/constant.helper');

module.exports = (sequelize, DataTypes) => {
    const schema = objSchema.getSchema(DataTypes)
    const init = objMethods.init(
        schema,
        {
            timestamps: false,
            underscored: true,
            hooks,
            sequelize,
            modelName: TABLE.DTB_USER,
            tableName: TABLE.DTB_USER,
        }
    );
    return init;
}
