import { EmailTemplate } from "emails/template"
import nodemailer from "nodemailer"

export interface MailService {
  send: (email: string, template: EmailTemplate) => Promise<boolean>
}

export default (): MailService => {

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: process.env.MAIL_SECURE === "true",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  })

  async function send (email: string, template: EmailTemplate) {
    return new Promise<boolean>((resolve, reject) => {
      transporter.sendMail({
        from: template.from,
        to: email,
        subject: template.subject,
        html: template.html,
      }, (error) => {
        if (error) {
          console.log(error)
          reject(false)
        } else {
          resolve(true)
        }
      })
    })
  }

  return Object.freeze({
    send
  })
}