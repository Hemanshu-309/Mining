//Mahima's Code

import nodemailer from "nodemailer"
import constant from "../helpers/constant.js";
import controller from "../controller/users/users.js"
const sendMail = async (email,token) => {
    try {
      //Transporter for sending mail
  
      const transporter = nodemailer.createTransport({
        service: constant.service,
  
        auth: constant.auth,
      });
  
      //Mail Content
      const resetPasswordLink = `http://localhost:8000/users/resetpass?token=${token}`;

      // console.log(token)
  
      const mailOptions = {
        from: constant.auth.user,
  
        to: email,
  
        subject:'Forget Password confirmation',
  
        text: `You are receiving this email because you (or someone else) requested to reset your password. Click on the following link to reset your password: ${resetPasswordLink}`,

        // text: `You are receiving this email because you (or someone else) requested to reset your password. Click on the following link to reset your password:`,

      };

  
      const info = await transporter.sendMail(mailOptions)

      console.log("Email sent:", info.response);
    
    return true;
    } catch (error) {
      console.log("Error sending email", error);
  
      return false;
    }
  };



  export default {sendMail}