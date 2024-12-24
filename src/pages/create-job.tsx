import { Form, Formik } from "formik";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { createJobSchema } from "../../utils/Yup-Validation/CreateJobSchema";
import { toast } from "react-toastify";
import { useCreateJobMutation } from "../../redux/services/job";
import { ClipLoader } from "react-spinners";
import { CreateJobFormValues } from "../../utils/types/jobTypes";
import {
  ArrayField,
  FileInputField,
  InputField,
} from "@/components/Layout/InputFieldsFormik";
import { createJobInitialValues } from "../../utils/initialValues";

const CreateJob = () => {
  const [createJob, { isLoading }] = useCreateJobMutation();
  const router = useRouter();

  const handleSubmit = async (values: CreateJobFormValues) => {
    const isConfirmed = window.confirm(
      "Do you confirm the details before submitting?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("company", values.company);
      formData.append("salary", String(values.salary));
      formData.append("description", JSON.stringify(values.description));
      formData.append("location", values.location);
      formData.append(
        "jobSpecification",
        JSON.stringify(values.jobSpecification)
      );
      if (values.companyImg instanceof File) {
        formData.append("companyImg", values.companyImg);
      }

      const response = await createJob(formData as unknown as any).unwrap();
      toast.success(response.message);
      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Failed to create Job");
    }
  };

  return (
    <div className="w-full mt-32 p-6">
      <button
        className="flex justify-center items-center gap-1 my-2 hover:text-blue-500 duration-200"
        onClick={() => router.push("/")}
      >
        <IoMdArrowRoundBack />
        back
      </button>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Create New Job</h2>
      <Formik
        initialValues={createJobInitialValues}
        validationSchema={createJobSchema}
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
                existingUrl={createJobInitialValues.companyImg}
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
                  isLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {isLoading ? (
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

export default CreateJob;
