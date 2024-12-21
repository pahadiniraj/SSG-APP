import Joi from "joi";

export const jobUpdateValidationSchema = Joi.object({
  title: Joi.string().trim().allow("").optional(),
  company: Joi.string().trim().allow("").optional(),
  location: Joi.string().trim().allow("").optional(),
  salary: Joi.number().optional().allow(null),
  description: Joi.array().items(Joi.string()).optional().allow(null),
  jobSpecification: Joi.array().items(Joi.string()).optional().allow(null),
  companyImg: Joi.any().optional(),
});
