/* eslint-disable */
class ConfigCommon {
    getConfig() {
        switch (process.env.MODE_BUILD) {
            case 'dev':
                return require('../../config/development');
            case 'prod':
                return require('../../config/production');
            default:
                return require('../../config/development');
        }
    }

    getHost() {
        return this.getConfig().host;
    }

    getHostWeb() {
        return this.getConfig().host_web;
    }

    getEmail() {
        return this.getConfig().email;
    }

    getEncodeDecode() {
        return this.getConfig().encode_decode;
    }

    getWhiteList() {
        return this.getConfig().white_list;
    }

    getDb() {
        return this.getConfig().db;
    }

    getKey() {
        return this.getConfig().jwt.key;
    }

    getImageLink() {
        return this.getConfig().image_link;
    }

    getImageDir() {
        return this.getConfig().image_dir;
    }

    getDocumentLink() {
        return this.getConfig().document_link;
    }

    getDocumentDir() {
        return this.getConfig().document_dir;
    }

    getLanguageSupport() {
        return this.getConfig().locales
    }

    getDataMaster() {
        return this.getConfig().data_master
    }

    getTwitter() {
        return this.getConfig().twitter
    }

    getBotAI() {
        return this.getConfig().bot_ai
    }

    getRedisConfig() {
        return this.getConfig().redis;
    }

    getHostWebAiBot() {
        return this.getConfig().host_web_ai_bot;
    }
}
module.exports = new ConfigCommon();
