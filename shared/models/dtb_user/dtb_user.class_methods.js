const Sequelize = require('sequelize');
const db = require('../db')
const { TABLE, FIELD_NAME, BOOLEAN_VALUE, PARAM, USER } = require('../../helpers/constant.helper');

class User extends Sequelize.Model {
    static associate(models) {
        this.models = models
    }

    static createUser(data, t) {
        return User.create(data, {
            transaction: t
        });
    }

    /**
     * @description get user by email
     * @param {*} email 
     * @param {*} option 
     * @returns 
     */
    static getUserByEmail(email, option) {
        return User.findOne({
            where: {
                email,
                [FIELD_NAME.DEL_FLG]: BOOLEAN_VALUE.FALSE,
                [FIELD_NAME.ROLE]: USER.ROLE.NORMAL
            },
            ...option
        })
    }

    /**
     *
     * @param {*} bodyQuery
     * @param {*} option
     */
    static getUser(bodyQuery, option) {
        return User.findOne({
            where: bodyQuery,
            ...option
        })
    }

    /**
     * @description get users list by email
     * @param {*} query
     * @returns
     */
    static getUsersListByEmail(query) {
        return User.findAll({
            where: query,
            order: [[FIELD_NAME.CREATE_DATE, 'DESC']]
        })
    }

    /**
     * @description get user by id
     * @param {*} id 
     * @param {*} option
     * @returns
     */
    static getProfileUserById(id, option) {
        return User.findOne({
            where: {
                [FIELD_NAME.USER_ID]: id,
                [FIELD_NAME.DEL_FLG]: BOOLEAN_VALUE.FALSE
            },
            include: [
                {
                    model: db.models[TABLE.DTB_OAUTH],
                    as: 'userOauth'
                },
                {
                    model: db.models[TABLE.DTB_SETTING],
                    as: 'userSetting'
                }
            ],
            ...option
        })
    }


    /**
     *
     * @param {*} id
     * @param {*} body
     * @param {*} t
     */
    static updateData(userId, body, t) {
        return User.update(
            body,
            {
                where: {
                    [FIELD_NAME.USER_ID]: userId
                },
                transaction: t
            }
        )
    }

    /**
     * @description get user by id
     * @param {*} id
     * @returns
     */
    static getDataById(id) {
        return User.findByPk(id);
    }

    /**
     * @description get users list
     * @param {*} query
     * @param {*} option
     * @returns
     */
    static getAllData(query, option) {
        const sql = { [FIELD_NAME.DEL_FLG]: BOOLEAN_VALUE.FALSE };
        if (query[PARAM.TEXT]) {
            sql[Sequelize.Op.and] = {
                [Sequelize.Op.or]: [
                    Sequelize.where(Sequelize.fn('concat', Sequelize.col(FIELD_NAME.FIRST_NAME), ' ', Sequelize.col(FIELD_NAME.LAST_NAME)), { [Sequelize.Op.like]: `%${query[PARAM.TEXT]}%` }),
                    { [FIELD_NAME.USERNAME]: { [Sequelize.Op.like]: `%${query[PARAM.TEXT]}%` } },
                    { [FIELD_NAME.EMAIL]: { [Sequelize.Op.like]: `%${query[PARAM.TEXT]}%` } },
                    { [FIELD_NAME.PHONE_NUMBER]: { [Sequelize.Op.like]: `%${query[PARAM.TEXT]}%` } }
                ]
            }
        }

        return User.findAndCountAll({
            distinct: true,
            where: sql,
            ...option,
            logging: console.log
        })
    }

    /**
     * @description get admin by email
     * @param {*} email
     * @param {*} option
     * @returns
     */
    static getAdminByEmail(email, option) {
        return User.findOne({
            where: {
                email,
                [FIELD_NAME.DEL_FLG]: BOOLEAN_VALUE.FALSE,
                [FIELD_NAME.ROLE]: USER.ROLE.ADMIN
            },
            ...option
        })
    }
}

module.exports = User;
