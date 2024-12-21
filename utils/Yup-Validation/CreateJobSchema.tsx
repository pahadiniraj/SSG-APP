import * as Yup from "yup";

export const createJobSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  company: Yup.string().required("Company name is required"),
  salary: Yup.number()
    .required("Salary is required")
    .min(0, "Salary must be greater than or equal to 0"),
  location: Yup.string().required("Location is required"),
  description: Yup.array()
    .of(Yup.string().required("Description is required"))
    .required("Description is required"),
  companyImg: Yup.mixed()
    .required("Company image is required")
    .test("fileType", "Invalid file type", (value) => {
      if (!value) return false; // Required field
      if (typeof value === "string") return true; // Existing file path is valid
      if (value instanceof File) {
        return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
      }
      return false;
    }),
  jobSpecification: Yup.array()
    .of(Yup.string().required("Job specification is required"))
    .required("Job specification is required"),
});
