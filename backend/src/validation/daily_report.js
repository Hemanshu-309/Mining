import Joi from "joi";

const createValidateDailyReport = (dailyreport_data) => {
  const JoiSchema = Joi.object({
    mine_no: Joi.number().integer().required().messages({
      "number.empty": `"Mine No" is a required field.`,
      "number.base": `"Mine No" must be a number.`,
    }),
    vehicle:Joi.number().integer().required().messages({
      "number.empty": `"Vehicle" is a required field.`,
      "number.base": `"Vehicle" must be a number.`,
    }),
    trip_type:Joi.number().integer().required().messages({
      "number.empty": `"Trip Type" is a required field.`,
      "number.base": `"Trip Type" must be a number.`,
    }),
    date: Joi.string().regex(/^\d{4}\-\d{2}\-\d{2}$/).required().messages({
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

const updateValidateDailyReport = (dailyreport_data) => {
  const JoiSchema = Joi.object({
    mine_no: Joi.number().integer().required().messages({
      "number.empty": `"Mine No" is a required field.`,
      "number.base": `"Mine No" must be a number.`,
    }),
    vehicle:Joi.number().integer().required().messages({
      "number.empty": `"Vehicle" is a required field.`,
      "number.base": `"Vehicle" must be a number.`,
    }),
    trip_type:Joi.number().integer().required().messages({
      "number.empty": `"Trip Type" is a required field.`,
      "number.base": `"Trip Type" must be a number.`,
    }),
    date: Joi.string().regex(/^\d{4}\-\d{2}\-\d{2}$/).required().messages({
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

const deleteValidateDailyReport = (delete_data) =>{
  const JoiSchema = Joi.object({
    id: Joi.number().min(1).integer().required().messages({
      "number.empty": `"Id" is a required field.`,
      "number.base": `"Id" must be a number.`,
    })
  }).options({abortEarly:false})
  return JoiSchema.validate(delete_data)
};

const paginationValidateDailyReport = (data) =>{
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
    status: Joi.number().integer().valid(1,2).messages({
      "number.base":`"Status" must be either 1 or 2.`
    }),
    id: Joi.number().min(1).integer().messages({
      "number.base": `"Id" must be a number.`,
    })
  }).options({abortEarly:false})
  return JoiSchema.validate(data)
}

export default {
    createValidateDailyReport,
    deleteValidateDailyReport,
    paginationValidateDailyReport,
    updateValidateDailyReport
}