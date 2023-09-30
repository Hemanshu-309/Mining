import nodemailer from 'nodemailer'
import dotenv from "dotenv";
dotenv.config()

const PORT = 8000

const mailConfig = {
    mail: process.env.EMAIL,
    password: process.env.EMAIL_PASSWORD,
  };

  const jwtConfig = {
    secret : "02c79048bc7e055385655953f5aa6e109ee92ebd15f683ca7fd9cfc6fed5985b",
    refreshSecret : "731e4b0af71aa1583d6dbf369171dbb729a6488da346ed17d63a6984a904971a",
    expireTime :1 * 60000,
    refreshTokenExpireTime: 1 * 90000,
  }
  
const transporter = nodemailer.createTransport({
    service:process.env.EMAIL_HOST,
    auth:{
        user:mailConfig.mail,
        pass:mailConfig.password
    },
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
    dbconfig,
    jwtConfig,
    transporter,
    mailConfig
}