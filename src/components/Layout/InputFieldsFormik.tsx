import { ErrorMessage, Field, FieldArray } from "formik";
import Image from "next/image";
import { MdDelete, MdLibraryAdd } from "react-icons/md";

export const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
}: any) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <Field
      type={type}
      name={name}
      id={name}
      className="w-full p-2 border border-gray-300 rounded-md"
      placeholder={placeholder}
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm"
    />
  </div>
);

export const FileInputField = ({
  label,
  name,
  setFieldValue,
  existingUrl,
}: any) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    {existingUrl && (
      <Image
        src={existingUrl}
        alt="Company Image"
        className="mb-2 w-32 h-32 object-cover rounded"
      />
    )}
    <input
      type="file"
      name={name}
      id={name}
      onChange={(event) => {
        const file = event.target.files?.[0];
        if (file) setFieldValue(name, file);
      }}
      className="w-full p-2 border border-gray-300 rounded-md"
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm"
    />
  </div>
);

export const ArrayField = ({ label, name, placeholder }: any) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <div>
          {arrayHelpers.form.values[name].map((_: any, index: number) => (
            <div key={index} className="flex space-x-2 mb-2">
              <Field
                name={`${name}[${index}]`}
                as="textarea"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder={placeholder}
              />
              <button
                type="button"
                onClick={() => arrayHelpers.remove(index)}
                className="text-red-500 hover:text-red-600"
              >
                <MdDelete className="text-xl" />
              </button>
              <ErrorMessage
                name={`${name}[${index}]`}
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => arrayHelpers.push("")}
            className="flex items-center space-x-1 text-blue-500 hover:text-blue-700"
          >
            <MdLibraryAdd size={20} />
            <span>Add {label}</span>
          </button>
        </div>
      )}
    />
  </div>
);
