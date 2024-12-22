import { ErrorMessage, Field, Form, Formik } from "formik";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useCreateApplicationMutation } from "../../redux/services/application";
import { CreateApplicationFormValues } from "../../utils/types/applicationType";
import applicationValidationSchema from "../../utils/Yup-Validation/CreateApplicationSchema";

const FormikCreateApplication = ({ jobId }: { jobId: string }) => {
  const [createApplication, { isLoading: isSubmitting }] =
    useCreateApplicationMutation();

  // Initial values for the form
  const initialValues: CreateApplicationFormValues = {
    jobId: jobId, // Ensure the jobId is passed as a prop to the component
    fullname: "",
    email: "",
    resume: null,
    coverLetter: null,
  };

  const handleSubmit = async (values: CreateApplicationFormValues) => {
    try {
      const formData = new FormData();
      formData.append("jobId", values.jobId);
      formData.append("fullname", values.fullname);
      formData.append("email", values.email);

      if (values.resume) {
        formData.append("resume", values.resume);
      }

      if (values.coverLetter) {
        formData.append("coverLetter", values.coverLetter);
      }

      const response = await createApplication(
        formData as unknown as any
      ).unwrap();
      toast.success(response.message);
      console.log("response", response);
    } catch (error: any) {
      console.error(error);
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to submit application";

      toast.error(errorMessage);
    }
  };

  // Handle loading state, if data is still being fetched
  if (isSubmitting) {
    return <ClipLoader color="#000" size={50} />;
  }

  // Handle error state

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">
        Create Application
      </h2>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={applicationValidationSchema}
      >
        {({ setFieldValue, isValid }) => (
          <Form>
            <div className="space-y-4 border shadow-lg p-4 rounded-lg">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <Field
                  type="text"
                  name="fullname"
                  id="fullname"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="fullname"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Resume */}
              <div>
                <label
                  htmlFor="resume"
                  className="block text-sm font-medium text-gray-700"
                >
                  Resume (PDF, DOCX)
                </label>
                <input
                  type="file"
                  name="resume"
                  id="resume"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) setFieldValue("resume", file);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="resume"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Cover Letter */}
              <div>
                <label
                  htmlFor="coverLetter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Cover Letter (PDF, DOCX)
                </label>
                <input
                  type="file"
                  name="coverLetter"
                  id="coverLetter"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) setFieldValue("coverLetter", file);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="coverLetter"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`w-full flex justify-center items-center bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600 duration-200 ${
                  isSubmitting ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {isSubmitting ? (
                  <ClipLoader color="#fff" size={20} />
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikCreateApplication;
