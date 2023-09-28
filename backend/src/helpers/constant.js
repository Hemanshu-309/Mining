import nodemailer from 'nodemailer'
import dotenv from "dotenv";
dotenv.config()

const PORT = 8000

const mailConfig = {
    mail: process.env.EMAIL,
    password: process.env.EMAIL_PASSWORD,
  };
  
const transpoter = nodemailer.createTransport({
    service:process.env.EMAIL_HOST,
    auth:{
        user:mailConfig.mail,
        pass:mailConfig.password
    },
    secure :true,
})

let dbconfig = {
    host: "localhost",
    user: "root",
    port: "3306",
    password: "",
    database: "mines",
  };

export default {
    PORT,
    dbconfig
}