import constants from "./constant.js"

const sendEmail = async (subject, sendTo,html) => {
    return new Promise((resolve) => {
        const mailData = {
            from: constants.mailConfig.mail,
            to: sendTo,
            subject: subject,
            html: html
        }
        constants.transporter.sendMail(mailData, async (error, success) => {
            if (success) {
                return resolve({
                    error: false,
                    message: "mail sent",
                })
            }
            return resolve({
                error: true,
                message: error.message,
                data: error
            })

        })
    })
}

const accountCreated = async(sendTo) =>{
    const body = `<h5>Thank you for signing up! Your account has been created successfully.<h5> 
    <p>We're delighted to have you on board. <p>
    <p>Enjoy your experience and feel free to explore our platform.</p>`

    const subject = "Successful Signup !!"

    const sended = await sendEmail(subject,sendTo,body)
    if (sended.error) {
        return sended
    }
        return "Email Sent"
}

export default {
    sendEmail,
    accountCreated
}