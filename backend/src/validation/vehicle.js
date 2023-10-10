import Joi from "joi";

const createValidateVehicle = (create_data) =>{
    const JoiSchema = Joi.object({
        name :Joi.string().trim().min(1).max(255).required()
        .messages({
          "string.empty": `"Vehicle Name" is a required field.`,
          "string.length": `"Vehicle Name" must contain 255 characters`
          }),
    }).options({abortEarly:false})

    return JoiSchema.validate(create_data)
}

const deleteValidateVehicle =(delete_data) =>{
    const JoiSchema = Joi.object({
        id :Joi.number().integer().min(1).required()
        .messages({
          "number.empty": `"id" is a required field.`
          }),
    }).options({abortEarly:false})

    return JoiSchema.validate(delete_data)
}

const updateValidateVehicle = (update_data) =>{
    const JoiSchema = Joi.object({
        id :Joi.number().integer().min(1).required()
        .messages({
          "number.empty": `"id" is a required field.`
          }),
        name :Joi.string().trim().min(1).max(255).required()
        .messages({
            "string.empty": `"Vehicle Name" is a required field.`,
            "string.length": `"Vehicle Name" must contain 255 characters`
        }), 
    }).options({abortEarly:false})

    return JoiSchema.validate(update_data)
}

const deleteValidateMultipleVehicle = (delete_data)=>{
    const JoiSchema = Joi.object({
        ids: Joi.array().min(1).required().messages({
            'array.empty':`"Ids" is a required field.`
        })
    }).options({abortEarly:false})
    return JoiSchema.validate(delete_data)
}

const paginationValidateVehicle = (data) =>{
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
    createValidateVehicle,
    deleteValidateVehicle,
    updateValidateVehicle,
    deleteValidateMultipleVehicle,
    paginationValidateVehicle
}