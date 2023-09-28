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

export default {
    createValidateTripType
}