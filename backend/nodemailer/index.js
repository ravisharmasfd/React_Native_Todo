import nodemailer from 'nodemailer'

  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'vito52@ethereal.email',
        pass: 'ctFms6hNBefp6G7dAA'
    }
});
export default transporter