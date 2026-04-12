import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from "path";

export async function sendContactFormEmail(data) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });

        transporter.use(
            "compile",
            hbs({
                viewEngine: {
                    partialsDir: path.resolve("./src/templates"),
                    defaultLayout: false,
                },
                viewPath: path.resolve("./src/templates"),
                extName: ".hbs",
            })
        );

        const mailOptions = {
            from: '"Website Contactformulier" <no-reply@vqnderklein.nl>',
            replyTo: data.email,
            to: "hallo@vqnderklein.nl",
            subject: `New contact form message from ${data.firstName} ${data.lastName}`,
            template: "contact-form",
            context: {
                firstName: data.firstName,
                lastName: data.lastName,
                title: data.aanhef,
                subject: data.subject,
                email: data.email,
                message: data.message
            }
        }

        await transporter.sendMail(mailOptions);
    }
    catch(err)
    {
        console.error(err);
        throw new Error('Failed to send contact form email');
    }
}