import Joi from 'joi'

const addValidateMine = (add_data) =>{
    const JoiSchema = Joi.object({
        id : Joi.string().trim().min(1).max(255).required().messages({
            "string.empty":`"Id" is a required field.`,
            "string.length": `"Id" must contain 255 characters`
        }),
        code: Joi.string().trim().min(1).required().messages({
            "string.empty":`"Code" is a required field.`,
            "string.length": `"Code" must contain atleast 1 character.`
        }),
       mine_name: Joi.string().trim().min(1).max(255).required().messages({
            "string.empty":`"Name" is a required field.`,
            "string.length": `"Name" must contain 255 characters`
        }),
    }).options({abortEarly:false})

    return JoiSchema.validate(add_data)
}

const deleteValidateMine =(delete_data) =>{
    const JoiSchema = Joi.object({
        id :Joi.number().integer().min(1).required()
        .messages({
          "number.empty": `"id" is a required field.`
          }),
    }).options({abortEarly:false})

    return JoiSchema.validate(delete_data)
}

const deleteValidateMultipleMines = (delete_data)=>{
    const JoiSchema = Joi.object({
        ids: Joi.array().min(1).required().messages({
            'array.empty':`"Ids" is a required field.`
        })
    }).options({abortEarly:false})
    return JoiSchema.validate(delete_data)
}

const paginationValidateMine = (data) =>{
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
    addValidateMine,
    deleteValidateMine,
    deleteValidateMultipleMines,
    paginationValidateMine
}