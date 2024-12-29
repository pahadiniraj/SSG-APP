import * as Yup from "yup";

const applicationValidationSchema = Yup.object({
  jobId: Yup.string().required("Job ID is required"),

  fullname: Yup.string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters long")
    .max(100, "Full name can't be more than 100 characters"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  resume: Yup.mixed()
    .nullable()
    .test("fileType", "Only PDF and DOCX files are allowed", (value) => {
      if (!value) return true;
      const file = value as File;
      const validTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      return validTypes.includes(file.type);
    })
    .test("fileSize", "File size must not exceed 5 MB", (value) => {
      if (!value) return true;
      const file = value as File;
      const maxSize = 5 * 1024 * 1024;
      return file.size <= maxSize;
    }),

  coverLetter: Yup.mixed()
    .required("Cover Letter is required")
    .test("fileType", "Only PDF and DOCX files are allowed", (value) => {
      if (!value) return false;
      const file = value as File;
      const validTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      return validTypes.includes(file.type);
    })
    .test("fileSize", "File size must not exceed 5 MB", (value) => {
      if (!value) return false;
      const file = value as File;
      const maxSize = 5 * 1024 * 1024;
      return file.size <= maxSize;
    }),
});

export default applicationValidationSchema;
