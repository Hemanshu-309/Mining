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
        name: Joi.string().trim().min(1).max(255).required().messages({
            "string.empty":`"Name" is a required field.`,
            "string.length": `"Name" must contain 255 characters`
        }),
    }).options({abortEarly:false})

    return JoiSchema.validate(add_data)
}