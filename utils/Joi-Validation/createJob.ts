import Joi from "joi";

export const jobValidationSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.base": "Title must be a string.",
    "any.required": "Title is required.",
  }),

  company: Joi.string().trim().required().messages({
    "string.base": "Company must be a string.",
    "any.required": "Company is required.",
  }),

  salary: Joi.number().positive().required().messages({
    "number.base": "Salary must be a number.",
    "number.positive": "Salary must be a positive number.",
    "any.required": "Salary is required.",
  }),

  description: Joi.array()
    .items(Joi.string().trim().required())
    .min(1)
    .required()
    .messages({
      "array.base": "Description must be an array of strings.",
      "array.min": "Description must have at least one entry.",
      "any.required": "Description is required.",
      "string.base": "Description entry must be a string.",
      "string.empty": "Description entry cannot be empty.",
    }),

  location: Joi.string().trim().required().messages({
    "string.base": "Location must be a string.",
    "any.required": "Location is required.",
  }),

  jobSpecification: Joi.array()
    .items(Joi.string().trim().required())
    .min(1)
    .required()
    .messages({
      "array.base": "Job Specification must be an array of strings.",
      "array.min": "Job Specification must have at least one entry.",
      "any.required": "Job Specification is required.",
      "string.base": "Job Specification entry must be a string.",
      "string.empty": "Job Specification entry cannot be empty.",
    }),

  companyImg: Joi.object()
    .required()
    .custom((file, helpers) => {
      if (!file || typeof file !== "object") {
        return helpers.error("any.invalid", {
          message: "Invalid file format.",
        });
      }

      const allowedMimeTypes = ["image/jpeg", "image/png"];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        return helpers.error("any.invalid", {
          message: "File must be a JPG or PNG image.",
        });
      }

      if (file.size > 5 * 1024 * 1024) {
        return helpers.error("any.invalid", {
          message: "File size must not exceed 5MB.",
        });
      }

      return file;
    })
    .messages({
      "any.required": "Company image is required.",
    }),
});
