const redis = require('redis')
const asyncRedis = require('async-redis')
const moment = require('moment')
const appConstant = require('./constant.helper')
const configCommon = require('./configCommon.helper')
let subscribeRedisClient;
let asyncRedisClient;

const keys = {
    synchronizedList: `${appConstant.REDIS.PREFIX}_synchronized_list`,
    isCheckingDeposit: `is_checking_deposit`,
    isCheckingCreateAddress: `is_checking_create_address`,
    depositComming: "deposit_comming",
    createAddress: "create_address",
}

const createClient = () => {
    return subscribeRedisClient;
}

const initRedis = async () => {
    let client = redis.createClient(configCommon.getRedisConfig().port);
    client.auth(configCommon.getRedisConfig().auth, function (err, reply) { });
    return asyncRedis.decorate(client);
}

const init = async () => {
    subscribeRedisClient = await initRedis();
    asyncRedisClient = await initRedis();
    console.log('reset redis...')
    const keys = await asyncRedisClient.keys(`${appConstant.REDIS.PREFIX}_*`);
    for (let key of keys) {
        await asyncRedisClient.del(key);
    }
    console.log('redis done');
}
const setSynchronize = async (key, value = true) => {
    await hset(keys.synchronizedList, key, value);
}
const getSynchronize = async (key) => {
    let result = await hget(keys.synchronizedList, key);
    return !(result == null || result == "false");
}

const startSynchronize = async (key) => {
    await setSynchronize(key, true);
}

const endSynchronize = async (key) => {
    await setSynchronize(key, false);
}

const set = async (key, value) => {
    await asyncRedisClient.set(key, value);
}
const get = async (key) => {
    return await asyncRedisClient.get(key);
}

const hset = async (key, field, value) => {
    await asyncRedisClient.hset(key, field, value);
}
const hget = async (key, field) => {
    return await asyncRedisClient.hget(key, field);
}
const hkeys = async (key) => {
    return await asyncRedisClient.hkeys(key);
}
const hdel = async (key, field) => {
    return await asyncRedisClient.hdel(key, field);
}

const pushStack = async (key, member) => {
    await asyncRedisClient.rpush(key, member);
}
const popStack = async (key) => {
    return await asyncRedisClient.lpop(key);
}

const handleAwait = async (key, member) => {
    const time = moment().valueOf()
    while (true) {
        if (time + 30 * 1000 <= moment().valueOf()) {
            await asyncRedisClient.lpop(key)
        }
        let uuid = await asyncRedisClient.lindex(key, 0)
        if (!uuid || uuid === member) {
            break
        }
    }
}
const handleEnd = async (key) => {
    await asyncRedisClient.lpop(key)
    await asyncRedisClient.quit()
}

const CheckPriority = async (id_type) => {
    let stackLen = await asyncRedisClient.llen(`${appConstant.REDIS.PREFIX}_${id_type}`)
    if (stackLen) {
        return true
    }
    return false
}

module.exports = {
    createClient,
    init,
    pushStack,
    popStack,
    handleAwait,
    handleEnd,
    CheckPriority,
    hset,
    hget,
    hkeys,
    hdel,
    get,
    set,
    startSynchronize,
    endSynchronize,
    getSynchronize,
    keys,
}
