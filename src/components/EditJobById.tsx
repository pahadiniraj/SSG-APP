import React, { useState } from "react";
import { MdOutlineEditNote } from "react-icons/md";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { JobIdButtonProps } from "../../utils/types/jobTypes";
import FormikEditJob from "./FormikEditJob";

const EditJobById: React.FC<JobIdButtonProps> = ({ jobId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    console.log(jobId);
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Edit Job Button */}
      <button
        className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 text-white py-3 px-6 rounded-lg transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out focus:outline-none flex justify-center items-center gap-2 w-full max-w-sm"
        onClick={handleClick}
      >
        <MdOutlineEditNote className="text-2xl" />
        Edit Job Details
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md bg-white p-6 md:h-[700px] h-screen overflow-y-auto md:rounded-lg shadow-lg md:w-[600px] ">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-200"
              onClick={() => setIsOpen(false)}
            >
              <IoArrowBackCircleSharp className="text-3xl" />
            </button>

            {/* Modal Content */}
            <div className="">
              <FormikEditJob jobId={jobId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditJobById;
