import { ErrorMessage, Field, Form, Formik, FieldArray } from "formik";
import { MdDelete, MdLibraryAdd } from "react-icons/md";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { CreateJobFormValues } from "../../utils/types/jobTypes";
import {
  useGetJobByIdQuery,
  useUpdateJobByIdMutation,
} from "../../redux/services/job";
import { updateJobSchema } from "../../utils/Yup-Validation/UpdateJobSchema";

const FormikEditJob = ({ jobId }: { jobId: string }) => {
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobByIdMutation();
  const { data, error, isLoading, refetch } = useGetJobByIdQuery(jobId);

  // Initial values, set dynamically after the job data is fetched
  const initialValues: CreateJobFormValues = data?.job
    ? {
        title: data.job.title || "",
        company: data.job.company || "",
        salary: data.job.salary || 0,
        location: data.job.location || "",
        description: data.job.description || [""],
        jobSpecification: data.job.jobSpecification || [""],
        companyImg: "", // File input is empty initially
      }
    : {
        title: "",
        company: "",
        salary: 0,
        location: "",
        description: [""],
        jobSpecification: [""],
        companyImg: "",
      };

  const handleSubmit = async (values: CreateJobFormValues) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("company", values.company);
      formData.append("salary", String(values.salary));
      formData.append("location", values.location);
      formData.append("description", JSON.stringify(values.description));
      formData.append(
        "jobSpecification",
        JSON.stringify(values.jobSpecification)
      );
      if (values.companyImg instanceof File) {
        formData.append("companyImg", values.companyImg);
      }

      const response = await updateJob({
        jobId,
        data: formData,
      }).unwrap();
      toast.success(response.message);
      refetch();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to update Job");
    }
  };

  // Handle loading state, if data is still being fetched
  if (isLoading) {
    return <ClipLoader color="#000" size={50} />;
  }

  // Handle error state
  if (error) {
    return <div>Error fetching job details</div>;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Update Job</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={updateJobSchema}
        onSubmit={handleSubmit}
        enableReinitialize // This makes sure the form updates when the initialValues change
      >
        {({ setFieldValue, isValid }) => (
          <Form>
            <div className="space-y-4 border shadow-lg p-4 rounded-lg">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Title
                </label>
                <Field
                  type="text"
                  name="title"
                  id="title"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Name
                </label>
                <Field
                  type="text"
                  name="company"
                  id="company"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="company"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="salary"
                  className="block text-sm font-medium text-gray-700"
                >
                  Salary
                </label>
                <Field
                  type="number"
                  name="salary"
                  id="salary"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="salary"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Location
                </label>
                <Field
                  type="text"
                  name="location"
                  id="location"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Description
                </label>
                <FieldArray
                  name="description"
                  render={(arrayHelpers) => (
                    <div>
                      {arrayHelpers.form.values.description.map(
                        (_: any, index: any) => (
                          <div key={index} className="flex space-x-2 mb-2">
                            <Field
                              name={`description[${index}]`}
                              as="textarea"
                              className="w-full p-2 border border-gray-300 rounded-md"
                              placeholder="Add a description"
                            />
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <MdDelete className="text-xl" />
                            </button>
                          </div>
                        )
                      )}
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                        className="flex items-center space-x-1 text-blue-500"
                      >
                        <MdLibraryAdd />
                        <span>Add Description</span>
                      </button>
                    </div>
                  )}
                />
              </div>

              <div>
                <label
                  htmlFor="companyImg"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Image
                </label>
                <input
                  type="file"
                  name="companyImg"
                  id="companyImg"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) setFieldValue("companyImg", file);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage
                  name="companyImg"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="jobSpecification"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Specifications
                </label>
                <FieldArray
                  name="jobSpecification"
                  render={(arrayHelpers) => (
                    <div>
                      {arrayHelpers.form.values.jobSpecification.map(
                        (_: any, index: any) => (
                          <div key={index} className="flex space-x-2 mb-2">
                            <Field
                              as="textarea"
                              name={`jobSpecification[${index}]`}
                              className="w-full p-2 border border-gray-300 rounded-md"
                              placeholder="Add a specification"
                            />
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <MdDelete size={20} />
                            </button>
                          </div>
                        )
                      )}
                      <button
                        type="button"
                        onClick={() => arrayHelpers.push("")}
                        className="flex items-center space-x-1 text-blue-500"
                      >
                        <MdLibraryAdd size={20} />
                        <span>Add Job Specification</span>
                      </button>
                    </div>
                  )}
                />
              </div>

              <button
                type="submit"
                disabled={!isValid || isUpdating}
                className={`w-full flex justify-center items-center bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600 duration-200 ${
                  isUpdating ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {isUpdating ? (
                  <ClipLoader color="#fff" size={20} />
                ) : (
                  "Update Job"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikEditJob;
