import Joi from "joi";

export const applicationValidationSchema = Joi.object({
  jobId: Joi.string().required().messages({
    "string.base": "Job ID must be a string.",
    "any.required": "Job ID is required.",
  }),

  fullname: Joi.string().min(3).max(100).required().messages({
    "string.base": "Full name must be a string.",
    "string.min": "Full name must be at least 3 characters long.",
    "string.max": "Full name must not exceed 100 characters.",
    "any.required": "Full name is required.",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string.",
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required.",
  }),

  // Resume: Can be null or a string (URL or file URL)
  resume: Joi.alternatives()
    .try(
      Joi.string().uri().optional(), // URL or string
      Joi.valid(null).optional() // null
    )
    .messages({
      "string.base": "Resume must be a string or null.",
      "string.uri": "Resume must be a valid URL.",
    }),

  // Cover letter: Must be a string (URL)
  coverLetter: Joi.string().uri().required().messages({
    "string.base": "Cover letter must be a string.",
    "string.uri": "Cover letter must be a valid URL.",
    "any.required": "Cover letter is required.",
  }),
});
