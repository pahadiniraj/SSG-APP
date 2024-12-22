import * as Yup from "yup";

export const updateJobSchema = Yup.object({
  title: Yup.string().optional(), // Optional field
  company: Yup.string().optional(), // Optional field
  salary: Yup.number()
    .optional()
    .min(0, "Salary must be greater than or equal to 0"), // Optional field with a validation rule
  location: Yup.string().optional(), // Optional field
  description: Yup.array()
    .of(Yup.string().required("Description is required"))
    .optional(), // Optional field
  companyImg: Yup.mixed()
    .optional()
    .test("fileType", "Invalid file type", (value) => {
      if (!value) return true; // Optional field
      if (typeof value === "string") return true; // Existing file path is valid
      if (value instanceof File) {
        return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
      }
      return false;
    }),
  jobSpecification: Yup.array()
    .of(Yup.string().required("Job specification is required"))
    .optional(), // Optional field
});
