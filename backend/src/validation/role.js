import Joi from "joi";

const createValidateRole = async(create_data) =>{
    const JoiSchema = Joi.object({
        role_name :Joi.string().trim().min(1).max(255).required()
        .messages({
          "string.empty": `"Role" is a required field.`,
          "string.length": `"Role" must contain 255 characters`
          }),
    }).options({abortEarly:false})

    return JoiSchema.validate(create_data)
}

export default {
    createValidateRole
}