import Joi from "joi";

const createValidateRole = (create_data) =>{
    const JoiSchema = Joi.object({
        role_name :Joi.string().trim().min(3).max(255).required()
        .messages({
          "string.empty": `"Role Name" is a required field.`,
          "string.length": `"Role Name" must contain 3 to 255 characters`
          }),
          code :Joi.string().trim().min(3).max(255).required()
        .messages({
          "string.empty": `"Code" is a required field.`,
          "string.length": `"Code" must contain 3 to 255 characters`
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
        code :Joi.string().trim().min(3).max(255).required()
        .messages({
          "string.empty": `"Code" is a required field.`,
          "string.length": `"Code" must contain 3 to 255 characters`
          }),
          status :Joi.number().integer().valid(1,2).required()
    }).options({abortEarly:false})

    return JoiSchema.validate(update_data)
}

const deleteValidateMultipleRole = (delete_data)=>{
    const JoiSchema = Joi.object({
        ids: Joi.array().min(1).required().messages({
            'array.empty':`"Ids" is a required field.`
        })
    }).options({abortEarly:false})
    return JoiSchema.validate(delete_data)
}

const paginationValidateRole = (data) =>{
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

export default {
    createValidateRole,
    deleteValidateRole,
    updateValidateRole,
    deleteValidateMultipleRole,
    paginationValidateRole
}