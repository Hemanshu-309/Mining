import Joi from "joi";

const createValidateRole = (create_data) =>{
    const JoiSchema = Joi.object({
        role_name :Joi.string().trim().min(1).max(255).required()
        .messages({
          "string.empty": `"Role Name" is a required field.`,
          "string.length": `"Role Name" must contain 255 characters`
          }),
    }).options({abortEarly:false})

    return JoiSchema.validate(create_data)
}

const deleteValidateRole = (delete_data) =>{
    const JoiSchema = Joi.object({
        id :Joi.number().integer().min(1).required()
        .messages({
          "number.empty": `"id" is a required field.`
          }),
    }).options({abortEarly:false})

    return JoiSchema.validate(delete_data)
}

const updateValidateRole = (update_data) =>{
    const JoiSchema = Joi.object({
        id :Joi.number().integer().min(1).required()
        .messages({
          "number.empty": `"id" is a required field.`
          }),
        role_name :Joi.string().trim().min(1).max(255).required()
        .messages({
            "string.empty": `"Role Name" is a required field.`,
            "string.length": `"Role Name" must contain 255 characters`
        }), 
    }).options({abortEarly:false})

    return JoiSchema.validate(update_data)
}

export default {
    createValidateRole,
    deleteValidateRole,
    updateValidateRole
}