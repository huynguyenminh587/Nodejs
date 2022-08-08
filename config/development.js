module.exports = Object.freeze({
    white_list: '*',
    jwt: {
        key: 'SGF2ZSB0byBkZWFsIHdpdGggQmFzZTY0IGZvcm1hdD8gVGhlbiB0aGlzIHNpdGUgaXMgbWFkZSBmb3IgeW91ISBVc2UgdGhlIHN1cGVyIHNpbXBsZSBvbmxpbmUgZm9ybSBiZWxvdyB0byBkZWNvZGUgb3IgZW5jb2RlIHlvdXIgZGF0YS4gSWYgeW91J3JlIGludGVyZXN0ZWQgYWJvdXQgdGhlIGlubmVyIHdvcmtpbmdzIG9mIHRoZSBCYXNlNjQgZm9ybWF0LCBqdXN0IHJlYWQgdGhlIGRldGFpbGVkIGRlc2NyaXB0aW9uIGF0IHRoZSBib3R0b20gb2YgdGhlIHBhZ2UuIFdlbGNvbWUh'
    },
    host_web: 'https://twitter.rionlab.com',
    email: {
        emailName: 'Twitter',
        emailAddress: 'noreply-test@rionlab.com',
        accessKeyId: 'AKIA4EOACRY7EI2XMXNG',
        secretAccessKey: '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',
        emailReceive: 'receive.dev@rionlab.com'
    },
    locales: ['en', 'ja'],
    db: {
        recreateDB: false,
        database: 'nodejswebsach',
        username: 'root',
        password: '0981733007',
        options: {
            host: '127.0.0.1',
            port: 3306,
            dialect: 'mysql',
            define: {
                charset: 'utf8',
                collate: 'utf8_general_ci',
                underscored: true,
            },
            sync: { force: false, alter: false },
            timestamps: true,
            timezone: '+09:00',
            logging: false
        },
        auth_magic: 'daiweaneatisubaejodaepiomaiprejacliastou',
        password_hash_algos: 'SHA-256'
    },
    encode_decode: {
        client_key: 'Sa5Juy4Gag14OTAIgG9RYTN21g1swQA0VVYY2o3nHtdZIQ4FKePZMufE5WEVVlO3YKyJxBe0TRywoAt8IjfNquqgaVYGzMlfYHpTwbyy2z2XeYfJ4s1560516420025CCHp6Wj0zBVqrndEimuk4XoN5wCRAyQeDG9v3S8fJZPc7F2TIhLstagYUx1OKlMbE',
        server_key: 'S8IVDaO7kSIFyx62CNXjcS06eoaWVgWrYhDXdUjc4hsGKQGPjCTAKhdTCGHifb0WxPJibfymfvwqGq06weHvV81849KvPh3jLzLEU1pw0jttgcM6Hh5MyLdaa8cJecoSdQSYSbB4nWDtwMEK1560575871729CC4fgBP1WyITUF8ElbcJXQ6kvxpneu3isjZKDq5A927RGwaHhm0NotdMLOzrVCYSE',
    },
    image_link: 'https://twitter.rionlab.com/image-server',
    image_dir: '/var/www/twitter/image-server',
    document_link: 'https://twitter.rionlab.com/document',
    document_dir: '/var/www/twitter/document',
    data_master: {
        member: {
            email: 'admin@gmail.com',
            password: 'admin123',
            role: 2
        }
    },
    twitter: {
        bearerToken: 'AAAAAAAAAAAAAAAAAAAAABJrZAEAAAAAB8STCMZLmo7wbh1ZvIl9CsIetrE%3DVAwM5KAU234wHfE2ujeNwCE3LTpCVwv59qdXEaujwYNRcTgmcM',
        appKey: 'VCLO5oCdWtVOUSW16nhHGWvtZ',
        appSecret: 'ERVIXvuwjBloLHn8uHWQqX4gbzcB6t6zVFZRE9qlQDNmUV6UrD'
    },
    bot_ai: {
        host_bot_ai: 'http://daiko-chatbot-lb-668023435.ap-northeast-1.elb.amazonaws.com/chat',
        message_reject: 'http://daiko-chatbot-lb-668023435.ap-northeast-1.elb.amazonaws.com/filter_notify_sent',
        dict_add: 'http://daiko-chatbot-lb-668023435.ap-northeast-1.elb.amazonaws.com/dict_add',
        dict_del: 'http://daiko-chatbot-lb-668023435.ap-northeast-1.elb.amazonaws.com/dict_del',
        cid: 1
    },
    redis: {
        host: 'localhost',
        port: 6379,
        auth: '',
    },
    host_web_ai_bot: 'https://ai-boot.rion-lab.com/api/ai-bot/get-list-comment'
});
