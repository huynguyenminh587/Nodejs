module.exports = Object.freeze({
    TIME_EXP_TOKEN: 30 * 24 * 60 * 60,
    TIME_EXP_RESET_CODE: 30 * 60,
    CRON_CONFIG: {
        TIME_EXP_CHECK_CONFRIM: '0 */1 * * * *'
    },
    HEADER: {
        LOCALE_DEFAULT: 'ja',
        LOCALE_HEADER: 'locale',
        AUTH: 'auth',
        TOKEN: 'token',
        LOCALE_ENGLISH: 'en',
        AUTH_TOKEN_SECRET: 'auth_token_secret',
        TOKEN_ID: 'token_id',
        DEVICE_ID: 'device_id',
        USER_ID: 'user_id',
        TIME_ZONE: 'time_zone'
    },
    PARAM: {
        TYPE: 'type',
        CODE: 'code',
        ID: 'id',
        PAGE: 'page',
        LIMIT: 'limit',
        LANGUAGE: 'lang',
        PARENT_CATEGORY: 'parent_category',
        ORDER_BY: 'order_by',
        SORT: 'sort',
        TEXT: 'text'
    },
    TABLE: {
        DTB_USER: 'dtb_users',
        DTB_OAUTH: 'dtb_oauths',
        TOKEN: 'tokens',
        DTB_SETTING: 'dtb_settings',
        DTB_NOTIFICATION: 'dtb_notifications',
        DTB_BLACKWORDLIST: 'dtb_blackwordlists',
        DTB_FAVORITE: 'dtb_favorites',
        DTB_COMMENT: 'dtb_comments'
    },
    FIELD_NAME: {
        USER_ID: 'user_id',
        FIRST_NAME: 'first_name',
        LAST_NAME: 'last_name',
        USERNAME: 'username',
        EMAIL: 'email',
        ADDRESS: 'address',
        BIRTH: 'birth',
        PHONE_NUMBER: 'phone_number',
        PASSWORD: 'password',
        SEX: 'sex',
        ID: 'id',
        UID: 'uid',
        IMAGE: 'image',
        TYPE: 'type',
        DEL_FLG: 'del_flg',
        CREATE_DATE_TSP: 'create_date_timestamp',
        UPDATE_DATE_TSP: 'update_date_timestamp',
        CREATE_DATE: 'create_date',
        UPDATE_DATE: 'update_date',
        ID_STR: 'id_str',
        SALT: 'salt',
        SECRET_KEY: 'secret_key',
        STATUS: 'status',
        SOCIAL_ID: 'social_id',
        TITLE: 'title',
        CONTENT: 'content',
        NOTIFICATION_ID: 'notification_id',
        KEYWORD: 'keyword',
        BLACKWORDLIST_ID: 'black_word_list_id',
        ROLE: 'role',
        AUTHOR_ID: 'author_id',
        TWEET_ID: 'tweet_id',
        CONVERSATION_ID: 'conversation_id',
        TEXT: 'text',
        CREATED_AT: 'created_at',
        FAVORITE_ID: 'favorite_id',
        NAME: 'name',
        IS_BLOCK: 'is_block',
        CID: 'cid',
        NG_WORDS: 'ngwords',
        ACCESS_TOKEN: 'access_token',
        ACCESS_SECRET: 'access_secret',
        DISPLAY_NAME: 'display_name',
        PHOTO_URL: 'photo_url',
        OAUTH_ID: 'oauth_id'
    },
    DATABASE_DEFAULT: {
        START_DATE: '2011-11-05',
        LANGUAGE: 'en',
        LIMIT: 20,
        PAGE: 1,
        ACCOUNT_BALANCE: 0
    },
    BOOLEAN_VALUE: {
        TRUE: 1,
        FALSE: 0
    },
    OAUTH: {
        STATUS: {
            TWITTER: 1,
        }
    },
    USER: {
        REGISTER_TYPE: {
            DEFAULT: 1,
            TWITER: 2,
            FACEBOOK: 3
        },
        ROLE: {
            NORMAL: 1,
            ADMIN: 2
        },
        STATUS: {
            NEW: 0,
            ACTIVED: 1
        },
        SEX: {
            MALE: 1,
            FEMALE: 2
        }
    },
    TWITTER: {
        NUMBER_POST: 50,
        MAX_RESULT: 100,
        TEN_MINUTES: 600000
    },
    ORDER: {
        ASC: 'ASC',
        DESC: 'DESC'
    },
    SETTING: {
        TYPE: {
            NORMAL: 1,
            AUTO: 2,
        }
    },
    TWEET: {
        TYPE: {
            REPLY: 1,
            RETWEET: 2,
            QUOTE_TWEET: 3
        }
    },
    REDIS: {
        PREFIX: 'ai_bot',
        QUEUE: {
            LOW: 'low',
            NORMAL: 'normal',
            MEDIUM: 'medium',
            HIGH: 'high',
            CRITICAL: 'critical'
        }
    },
});
