import Joi from "joi";

const createValidateDailyReport = (dailyreport_data) => {
  const JoiSchema = Joi.object({
    role: Joi.number().integer().required().messages({
      "number.empty": `"Role" is a required field.`,
      "number.base": `"Role" must be a number.`,
    }),
    mine_no: Joi.number().integer().required().messages({
      "number.empty": `"Mine No" is a required field.`,
      "number.base": `"Mine No" must be a number.`,
    }),
    vehicle: Joi.string().trim().min(1).max(255).required().messages({
      "string.empty": `"Vehicle Name" is a required field.`,
      "string.length": `"Vehicle Name" must contain 255 characters`,
    }),
    trip_type: Joi.string().trim().min(1).max(255).required().messages({
      "string.empty": `"Trip Type" is a required field.`,
      "string.length": `"Trip Type" must contain 255 characters`,
    }),
    date: Joi.string().regex(/^\d{2}\/\d{2}\/\d{4}$/).required().messages({
      "string.empty": `"Date" is a required field.`,
    }),
    with_lead: Joi.boolean().valid('Yes','No').required().messages({
      "boolean.empty": `"With Lead" is a required field.`,
    }),
    trips: Joi.number().integer().min(1).required().messages({
      "number.empty": `"No of trips" is a required field.`,
      "number.length": `"No of trips" must contain atleast 1 digits.`,
      "number.base": `"No of trips" must be a number.`,
    }),
    quantity: Joi.number().integer().required().messages({
      "number.empty": `"Quantity" is a required field.`,
      "number.base": `"Quantity" must be a number.`,
    }),
    rate: Joi.number().integer().required().messages({
      "number.empty": `"Rate" is a required field.`,
      "number.base": `"Rate" must be a number.`,
    }),
    amount: Joi.number().integer().required().messages({
      "number.empty": `"Amount" is a required field.`,
      "number.base": `"Amount" must be a number.`,
    }),
    remarks: Joi.string()
  }).options({ abortEarly: false });

  return JoiSchema.validate(dailyreport_data);
};

export default {
    createValidateDailyReport
}