import Joi from "joi";

//Rahul's Code
const createValidateUser = (create_data) => {
  const JoiSchema = Joi.object({
    firstname: Joi.string().trim().min(1).max(255).required().messages({
      "string.empty": `"firstname" is a required field.`,
      "string.length": `"firstname" must contain 255 characters`,
    }),
    lastname: Joi.string().trim().min(1).max(255).required().messages({
      "string.empty": `"lastname" is a required field.`,
      "string.length": `"lastname" must contain 255 characters`,
    }),
    email: Joi.string().email().trim().required().messages({
      "string.empty": `"email" is a required field.`,
      "email.base": `enter valid "email"`,
    }),
    password: Joi.string()
      .trim()
      .min(8)
      .max(32)
      .regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,35}$/)
      .required()
      .messages({
        "string.empty": `"password" is a required field.`,
        "string.length": `"password" must contain 35 characters`,
        "string.pattern.base":
          "Password must contain 1 Uppercase , 1 Lowercase , 1 Special character and between 8 to 32 characters long.",
      }),
    username: Joi.string().min(4).max(20).required().messages({
      "string.empty": `"Username" is a required field.`,
      "string.length": `"Username" must be between 4 to 20 character long.`,
    }),
    mobile: Joi.string().min(13).max(14).required().messages({
      "string.empty": `"Mobile Number" is a required field.`,
      "string.length": `"Mobile Number" must contain 10 digits.`,
    }),
    role: Joi.number().required().messages({
      "number.empty": `"Role" is a required field.`,
      "number.base": `"Role" must be a number.`,
    }),
    code: Joi.number().required().messages({
      "number.empty": `"Code" is a required field.`,
      "number.base": `"Code" must be a number.`,
    }),
    status: Joi.number().required().messages({
      "number.empty": `"Status" is a required field.`,
      "number.base": `"Status" must be a number.`,
    }),
  }).options({ abortEarly: false });

  return JoiSchema.validate(create_data);
};

const loginValidateUser = (login_data) => {
  const JoiSchema = Joi.object({
    email: Joi.string().email().trim().required().messages({
      "string.empty": `"email" is a required field.`,
      "email.base": `enter valid "email"`,
    }),
    password: Joi.string()
      .trim()
      .min(8)
      .max(32)
      .regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,35}$/)
      .required()
      .messages({
        "string.empty": `"password" is a required field.`,
        "string.length": `"password" must contain 35 characters`,
        "string.pattern.base":
          "Password must contain 1 Uppercase , 1 Lowercase , 1 Special character and between 8 to 32 characters long.",
      }),
  }).options({ abortEarly: false });
  return JoiSchema.validate(login_data);
};

const deleteValidateUser = (delete_data) =>{
  const JoiSchema = Joi.object({
    password: Joi.string()
    .trim()
    .min(8)
    .max(32)
    .regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,35}$/)
    .required()
    .messages({
      "string.empty": `"password" is a required field.`,
      "string.length": `"password" must contain 35 characters`,
      "string.pattern.base":
        "Password must contain 1 Uppercase , 1 Lowercase , 1 Special character and between 8 to 32 characters long.",
    }),
  }).options({abortEarly:false})
  return JoiSchema.validate(delete_data)
}


//Mahima's Code
const login = (data) => {
  const JoiSchema = Joi.object({
      email: Joi.string().min(4).trim().required().messages({
          "string.empty": `"Email" is a required field.`,
          "string.length": `"Email" must be between 4 to 20 character long.`,
      }),
      password: Joi.string().trim().min(8).max(35).required().messages({
          "string.empty": `"Password" is a required field.`,
          "string.length": `"Password" must contain 8 to 35 characteers.`
      })
  })

  const validation = JoiSchema.validate(data);
  return validation
}

const passwordResetEmail = (data) => {
  const JoiSchema = Joi.object({
      email: Joi.string().min(8).max(255).email().trim().required().messages({
        "string.empty": `"Email" is a required field.`,
        "string.length": `"Email" must be between 4 to 20 character long.`,    })
    })
    
    const validation = JoiSchema.validate(data);
  return validation
}

const resetpass =(data)=>{
  const JoiSchema = Joi.object({

      // email: Joi.string().min(8).max(255).email().trim().required().messages({
      //     "string.empty": `"Email" is a required field.`,
      //     "string.length": `"Email" must be between 4 to 20 character long.`,})
      // ,
      newpass: Joi.string().trim().min(8).max(35).required().messages({
          "string.empty": `"newpass" is a required field.`,
          "string.length": `"newpass" must contain 8 to 35 characteers.`
      }),
      confirmePass :Joi.string().trim().min(8).max(35).required().messages({
          "string.empty": `"enterednewpass" is a required field.`,
          "string.length": `"enterednewpass" must contain 8 to 35 characteers.`
      })
  })
  const validation = JoiSchema.validate(data);
  return validation
}

export default {
  createValidateUser,
  loginValidateUser,
  deleteValidateUser,
  passwordResetEmail,
  resetpass,
  login
};
