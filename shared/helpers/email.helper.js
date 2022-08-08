const nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');
const configCommon = require('./configCommon.helper')
const appConstant = require('./constant.helper');

const configEmail = configCommon.getEmail()
const emailAddress = configEmail.emailAddress;
const emailName = configEmail.emailName;
const accessKeyId = configEmail.accessKeyId;
const secretAccessKey = configEmail.secretAccessKey;
const region = configEmail.region;

const smtpConfig = {
    accessKeyId,
    secretAccessKey,
    region,
    sendmail: true
    // host,
    // port,
    // secure: true, // use SSL
    // auth: { user, pass },
    // tls: { rejectUnauthorized: false }
};

const sendEmail = (subject, emailReceiver, cc, bcc, data, fromMail, lang = appConstant.LOCALE_DEFAULT, path) => {
    const transporter = nodemailer.createTransport(sesTransport(smtpConfig));
    // setup e-mail data with unicode symbols
    const name = fromMail ? `From ${fromMail}` : emailName;
    const mailOptions = {
        from: `"${name}" <${emailAddress}>`, // sender address
        to: emailReceiver,
        cc,
        bcc, // list of receivers
        subject, // Subject line
        html: data
    };
    if (path) {
        const arr = path.split('/');
        const filename = arr[arr.length - 1];
        mailOptions.attachments = [{
            filename: filename,
            path: path
        }]
    }
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject()
            }
            if (info) {
                resolve()
            }
        });
    })
}

module.exports = {
    sendEmail
}
