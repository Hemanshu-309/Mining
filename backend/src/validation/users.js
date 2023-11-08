import Joi from "joi";

const createValidateUser = (create_data) => {
  const JoiSchema = Joi.object({
    firstname: Joi.string().trim().regex(/^[A-Za-z]+(?: [A-Za-z]+)?$/).min(1).max(255).required().messages({
      "string.empty": `"firstname" is a required field.`,
      "string.length": `"firstname" must contain 255 characters`,
      "string.pattern.base":
          "Special character and numbers is not allowed.",
    }),
    lastname: Joi.string().regex(/^[A-Za-z]+(?: [A-Za-z]+)?$/).trim().min(1).max(255).required().messages({
      "string.empty": `"lastname" is a required field.`,
      "string.length": `"lastname" must contain 255 characters`,
      "string.pattern.base":
          "Special character and numbers is not allowed.",
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
    username: Joi.string().min(3).regex(/^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/).max(20).required().messages({
      "string.empty": `"Username" is a required field.`,
      "string.length": `"Username" must be between 4 to 20 character long.`,
      "string.pattern.base":"Username must start with a letter and can contain letters, digits, hyphens, and underscores. It must be between 3 and 20 characters long."
    }),
    mobile: Joi.string().min(13).max(14).regex(/^\+\d{1,3}\d{10}$/).required().messages({
      "string.empty": `"Mobile Number" is a required field.`,
      "string.length": `"Mobile Number" must contain 10 digits.`,
      "string.pattern.base":
      `"Mobile Number" should have country code with + and follow up by 10 digit mobile number.`
    }),
    role: Joi.number().required().messages({
      "number.empty": `"Role" is a required field.`,
      "number.base": `"Role" must be a number.`,
    }),
    code: Joi.number().required().messages({
      "number.empty": `"Code" is a required field.`,
      "number.base": `"Code" must be a number.`,
    }),
    status: Joi.number().valid(1,2).required().messages({
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
        "string.length": `"password" must contain 8 to 35 characters`,
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

const resetPasswordEmail = (data) =>{
  const JoiSchema = Joi.object({
    email: Joi.string().email().trim().required().messages({
      "string.empty": `"email" is a required field.`,
      "email.base": `enter valid "email"`,
    })
  }).options({abortEarly:false})
  return JoiSchema.validate(data)
}

const resetPassword = (data)=>{
  const JoiSchema = Joi.object({
  token:Joi.string().required(),
  newPassword: Joi.string().trim().min(8).max(35).regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,35}$/).required().messages({
    "string.empty": `"Password" is a required field.`,
    "string.length": `"Password" must contain 8 to 35 characters.`,
  })
  }).options({abortEarly:false})

  return JoiSchema.validate(data)
}
const paginationValidateUser = (data) =>{
  const JoiSchema = Joi.object({
    offset : Joi.number().integer().required().messages({
      "number.empty": `"offset" is a required field.`,
      "number.base": `"offset" must be a number.`,
    }),
    limit : Joi.number().min(1).integer().required().messages({
      "number.empty": `"limit" is a required field.`,
      "number.base": `"limit" must be a number.`,
    }),
    order : Joi.string().valid('asc','desc').required().messages({
      "string.empty":`"order" is a required field.`
    }),
    sort : Joi.string().required().messages({
      "string.empty":`"sort" is a required field.`
    }),
    status: Joi.number().integer().valid(1,2)
  }).options({abortEarly:false})
  return JoiSchema.validate(data)
}

//Tanvi's Code
const passwordValidate = (data) => {
  //added vaalidation for current Password
  const JoiSchema = Joi.object({
    newPassword: Joi.string()
      .trim()
      .min(8)
      .max(35)
      .regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,35}$/)
      .required()
      .messages({
        "string.empty": `"New password" is a required field.`,
        "string.length": `"New password" must contain 35 characters`,
      }),
      currentPassword: Joi.string()
      .trim()
      .min(8)
      .max(35)
      .regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,35}$/)
      .required()
      .messages({
        "string.empty": `"Current password" is a required field.`,
        "string.length": `"Current password" must contain 35 characters`,
      }),
  }).options({abortEarly:false})

  const validation = JoiSchema.validate(data);
  return validation;
};

export default {
  createValidateUser,
  loginValidateUser,
  deleteValidateUser,
  passwordValidate,
  paginationValidateUser,
  resetPasswordEmail,
  resetPassword
};
