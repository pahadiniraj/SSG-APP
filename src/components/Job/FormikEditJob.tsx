import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { CreateJobFormValues } from "../../../utils/types/jobTypes";
import {
  useGetJobByIdQuery,
  useUpdateJobByIdMutation,
} from "../../../redux/services/job";
import { updateJobSchema } from "../../../utils/Yup-Validation/UpdateJobSchema";
import { ArrayField, FileInputField, InputField } from "../InputFieldsFormik";

const FormikEditJob = ({
  jobId,
  setIsOpen,
}: {
  jobId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobByIdMutation();
  const { data, error, isLoading, refetch } = useGetJobByIdQuery(jobId);

  const initialValues: CreateJobFormValues = data?.job
    ? {
        title: data.job.title || "",
        company: data.job.company || "",
        salary: data.job.salary || 0,
        location: data.job.location || "",
        description: data.job.description || [""],
        jobSpecification: data.job.jobSpecification || [""],
        companyImg: "",
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
      setIsOpen(false);
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
      >
        {({ setFieldValue, isValid }) => (
          <Form>
            <div className="space-y-4 border shadow-lg p-4 rounded-lg">
              <InputField label="Job Title" name="title" />
              <InputField
                label="Salary"
                name="salary"
                type="number"
                placeholder="Enter Salary"
              />
              <InputField
                label="Company Name"
                name="company"
                placeholder="Enter Company Name"
              />
              <InputField
                label="Job Location"
                name="location"
                placeholder="Enter Job Location"
              />
              <ArrayField
                label="Job Description"
                name="description"
                placeholder="Add a description"
              />
              <FileInputField
                label="Company Image"
                name="companyImg"
                existingUrl={initialValues.companyImg}
                setFieldValue={setFieldValue}
              />
              <ArrayField
                label="Job Specifications"
                name="jobSpecification"
                placeholder="Add a specification"
              />
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className={`w-full flex justify-center items-center bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600 duration-200 ${
                  isUpdating ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {isUpdating ? (
                  <ClipLoader color="#fff" size={20} />
                ) : (
                  "Create Job"
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
