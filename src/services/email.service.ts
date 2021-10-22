/* eslint-disable class-methods-use-this */
import * as nodemailer from 'nodemailer';

export class EmailService {
  static initTrasport() {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_FROM,
        pass: process.env.SMTP_KEY,
      },
      debug: process.env.ENV === 'development',
    });
  }

  static sendMail(mailOptions) {
    return EmailService.initTrasport().sendMail({
      ...mailOptions,
      from: process.env.SMTP_FROM,
    });
  }
}
