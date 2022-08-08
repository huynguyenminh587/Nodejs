const fs = require('fs');
const moment = require('moment')
const localeUtils = require('../../shared/helpers/localesUtils.helper');
const encodeDecode = require('../security/encode_decode');
const templateEmail = require('../../shared/mail_templates/template');
const { FIELD_NAME, TABLE, EMAIL_ORDER } = require('../helpers/constant.helper');
const configCommon = require('../helpers/configCommon.helper');

const HOST_WEB = configCommon.getHostWeb();

const naturalPath = __dirname.split("/")
const mailPath = `${naturalPath.slice(0, naturalPath.length - 2).join("/")}/shared/mail_templates`
// const mailPath = 'D:/project_rionlab/source_git/twitter/api/shared/mail_templates'

const sendMailRegister = async (lang, data, password) => {
    const codeEncoded = encodeDecode.encode(`${data[FIELD_NAME.EMAIL]}`)
    let bodyEmail = fs.readFileSync(lang == 'en' ? `${mailPath}/authentication/register_en.html` : `${mailPath}/authentication/register_ja.html`, "utf8")
    bodyEmail = bodyEmail.replace(/##EMAIL##/g, data[FIELD_NAME.EMAIL])
    bodyEmail = bodyEmail.replace(/##PASSWORD##/g, password)
    bodyEmail = bodyEmail.replace(/##ACTIVE_CODE##/g, codeEncoded)
    bodyEmail = bodyEmail.replace(/##HOST_WEB##/g, HOST_WEB)
    templateEmail.sendEmail(localeUtils.mailMessage(lang).TITLE.ACCOUNT_ACTIVATION, bodyEmail, data[FIELD_NAME.EMAIL], lang)
}

const sendMailForgotPassword = async (lang, data, user) => {
    let bodyEmail = fs.readFileSync(lang == 'en' ? `${mailPath}/authentication/forgot_password_en.html` : `${mailPath}/authentication/forgot_password_ja.html`, "utf8")
    bodyEmail = bodyEmail.replace(/##RESET_CODE##/g, data[FIELD_NAME.CODE_RESET_PASSWORD]);
    bodyEmail = bodyEmail.replace(/##HOST_WEB##/g, HOST_WEB)
    templateEmail.sendEmail(localeUtils.mailMessage(lang).TITLE.RESET_PASSWORD, bodyEmail, user[FIELD_NAME.EMAIL], lang)
}

const sendContactMail = async (email, lang, content) => {
    let bodyEmail = fs.readFileSync(`${mailPath}/contact/reply.html`, "utf8")
    bodyEmail = bodyEmail.replace(/##CONTENT##/g, content)
    templateEmail.sendEmail(localeUtils.mailMessage(lang).TITLE.REPLY_CONTACT, bodyEmail, email, lang)
}

const sendEmailConfirmContract = async (email, code, documentId, userId, hash, lang, documentUrl) => {
    let bodyEmail = fs.readFileSync(lang == 'en' ? `${mailPath}/document/confirm_contract_en.html` : `${mailPath}/document/confirm_contract_ja.html`, "utf8");
    bodyEmail = bodyEmail.replace(/##ACTIVE_CODE##/g, encodeDecode.encode(code));
    bodyEmail = bodyEmail.replace(/##DOCUMENT_ID##/g, encodeDecode.encode(String(documentId)));
    bodyEmail = bodyEmail.replace(/##USER_ID##/g, encodeDecode.encode(String(userId)));
    bodyEmail = bodyEmail.replace(/##HOST_WEB##/g, HOST_WEB);
    bodyEmail = bodyEmail.replace(/##HASH##/g, hash);

    templateEmail.sendEmail(localeUtils.mailMessage(lang).TITLE.CONFIRM_CONTRACT, bodyEmail, email, lang, documentUrl)
}

const sendEmailCompleteContract = async (email, lang) => {
    let bodyEmail = fs.readFileSync(lang == 'en' ? `${mailPath}/document/complete_contract_en.html` : `${mailPath}/document/complete_contract_ja.html`, "utf8")

    templateEmail.sendEmail(localeUtils.mailMessage(lang).TITLE.COMPLETE_CONTRACT, bodyEmail, email, lang)
}

const sendEmailDocumentRequest = async (email, body, lang) => {
    let documentRequestHTML = '';
    if (body.document_request && lang == 'en') {
        documentRequestHTML = 'Document: '
        for (let i = 0; i < body.document_request.length; i++) {
            documentRequestHTML += `${body.document_request[i][FIELD_NAME.CONTENT]}<br>`
        }
    } else {
        for (let i = 0; i < body.document_request.length; i++) {
            documentRequestHTML = '資料: '
            for (let i = 0; i < body.document_request.length; i++) {
                documentRequestHTML += `${body.document_request[i][FIELD_NAME.CONTENT]}<br>`
            }
        }
    }

    let bodyEmail = fs.readFileSync(lang == 'en' ? `${mailPath}/contact/document_request.en.html` : `${mailPath}/contact/document_request.ja.html`, 'utf8');
    bodyEmail = bodyEmail.replace(/##FIRST_NAME##/g, body[FIELD_NAME.FIRST_NAME]);
    bodyEmail = bodyEmail.replace(/##LAST_NAME##/g, body[FIELD_NAME.LAST_NAME]);
    bodyEmail = bodyEmail.replace(/##FIRST_NAME_KANA##/g, body[FIELD_NAME.FIRST_NAME_KANA]);
    bodyEmail = bodyEmail.replace(/##LAST_NAME_KANA##/g, body[FIELD_NAME.LAST_NAME_KANA]);
    bodyEmail = bodyEmail.replace(/##ZIPCODE##/g, body[FIELD_NAME.ZIPCODE]);
    bodyEmail = bodyEmail.replace(/##PREF##/g, body[FIELD_NAME.PREF]);
    bodyEmail = bodyEmail.replace(/##ADRESS##/g, body[FIELD_NAME.ADDRESS]);
    bodyEmail = bodyEmail.replace(/##STREET_AND_APARTMENT##/g, body[FIELD_NAME.STREET_AND_APARTMENT]);
    bodyEmail = bodyEmail.replace(/##TEL01##/g, body[FIELD_NAME.TEL01]);
    bodyEmail = bodyEmail.replace(/##TEL02##/g, body[FIELD_NAME.TEL02]);
    bodyEmail = bodyEmail.replace(/##TEL03##/g, body[FIELD_NAME.TEL03]);
    bodyEmail = bodyEmail.replace(/##EMAIL##/g, body[FIELD_NAME.EMAIL]);
    bodyEmail = bodyEmail.replace(/##EMAIL2##/g, body[FIELD_NAME.EMAIL2]);
    bodyEmail = bodyEmail.replace(/##SEX##/g, body[FIELD_NAME.SEX]);
    bodyEmail = bodyEmail.replace(/##DOCUMENT##/g, documentRequestHTML);
    bodyEmail = bodyEmail.replace(/##CONTENT##/g, body[FIELD_NAME.CONTENT]);

    templateEmail.sendEmail(localeUtils.mailMessage(lang).TITLE.DOCUMENT_REQUEST, bodyEmail, email, lang)
}

module.exports = {
    sendMailRegister,
    sendMailForgotPassword,
    sendContactMail,
    sendEmailConfirmContract,
    sendEmailCompleteContract,
    sendEmailDocumentRequest
}
