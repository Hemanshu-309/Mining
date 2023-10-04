import Joi from "joi";

const createValidateTripType = (create_data) =>{
    const JoiSchema = Joi.object({
        type :Joi.string().trim().min(1).max(255).required()
        .messages({
          "string.empty": `"Trip Type" is a required field.`,
          "string.length": `"Trip Type" must contain 255 characters`
          }),
    }).options({abortEarly:false})

    return JoiSchema.validate(create_data)
}

const deleteValidateTripType = (delete_data) =>{
    const JoiSchema = Joi.object({
        id :Joi.number().integer().min(1).required()
        .messages({
          "number.empty": `"id" is a required field.`
          }),
    }).options({abortEarly:false})

    return JoiSchema.validate(delete_data)
}

const deleteValidateMultipleTripType = (delete_data)=>{
    const JoiSchema = Joi.object({
        ids: Joi.array().min(1).required().messages({
            'array.empty':`"Ids" is a required field.`
        })
    }).options({abortEarly:false})
    return JoiSchema.validate(delete_data)
}

const updateValidateTripType =  (update_data) =>{
    const JoiSchema = Joi.object({
        id :Joi.number().integer().min(1).required()
        .messages({
          "number.empty": `"id" is a required field.`
          }),
        type :Joi.string().trim().min(1).max(255).required()
        .messages({
            "string.empty": `"Trip Type" is a required field.`,
            "string.length": `"Trip Type" must contain 255 characters`
        }), 
    }).options({abortEarly:false})

    return JoiSchema.validate(update_data)
}

export default {
    createValidateTripType,
    deleteValidateTripType,
    updateValidateTripType,
    deleteValidateMultipleTripType
}