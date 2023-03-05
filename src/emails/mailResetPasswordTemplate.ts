import { EmailTemplate } from "./template";

export const mailResetPasswordTemplate = (secret: string): EmailTemplate => ({
  from:  `"${process.env.MAIL_AUTH_FROM_NAME}" <${process.env.MAIL_AUTH_FROM_EMAIL}>`,
  subject: process.env.MAIL_AUTH_FROM_SUBJECT,
  html: `
    <h1>Recover your password</h1>
    <p>Click on the link below to recover your password</p>
    <a href="${process.env.WEB_APP_URL}/recover-password?secret=${secret}">Recover password</a>
  `
})
