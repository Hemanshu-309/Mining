import Joi from "joi";


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
  paginationValidateUser
};
