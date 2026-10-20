import * as nodemailer from 'nodemailer';

const transporter = process.env.MAIL_SERVER_HOST
    ? nodemailer.createTransport({
        host: process.env.MAIL_SERVER_HOST,
        port: parseInt(process.env.MAIL_SERVER_PORT),
        secure: false,
        auth: {
            user: process.env.MAIL_SERVER_USER,
            pass: process.env.MAIL_SERVER_PASSWORD
        }
    })
    : nodemailer.createTransport({
        sendmail: true,
        path: '/usr/sbin/sendmail',
        newline: 'unix',
    });

export {
    transporter
};
