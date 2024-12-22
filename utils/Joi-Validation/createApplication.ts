import Joi from "joi";

export const applicationValidationSchema = Joi.object({
  jobId: Joi.string()
    .required()
    .messages({
      "string.base": "Job ID must be a string.",
      "any.required": "Job ID is required.",
    }),
  
  fullname: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.base": "Full name must be a string.",
      "string.min": "Full name must be at least 3 characters long.",
      "string.max": "Full name must not exceed 100 characters.",
      "any.required": "Full name is required.",
    }),
  
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.base": "Email must be a string.",
      "string.email": "Email must be a valid email address.",
      "any.required": "Email is required.",
    }),

  resume: Joi.string()
    .uri()
    .optional()
    .messages({
      "string.base": "Resume URL must be a string.",
      "string.uri": "Resume must be a valid URL.",
    }),

  coverLetter: Joi.string()
    .uri()
    .optional()
    .messages({
      "string.base": "Cover letter URL must be a string.",
      "string.uri": "Cover letter must be a valid URL.",
    }),
});
