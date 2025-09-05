const nodemailer = require("nodemailer")

const sendEmail = async (subject, message, sendTo, sentFrom, replyTo) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: "5173",
        auth: {
            user: "daobrendan7@gmail.com",
            pass: "123456",
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const options = {
        from: sentFrom,
        to: sendTo,
        replyingTo: replyTo,
        subject: subject,
        html: message
    }

    // Send Email
    transporter.sendMail(options, function(err, info) {
        if (err) {
            console.log("Error Occured")
            console.log(err)
        } else {
            console.log("Email Sent Success")
            console.log(info)
        }
    })
}

module.exports = sendEmail;