import React, { useState } from "react";
import { MdOutlineWork } from "react-icons/md";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { JobIdButtonProps } from "../../utils/types/jobTypes";
import FormikCreatApplication from "./FormikCreateApplication";

const ApplyJob: React.FC<JobIdButtonProps> = ({ jobId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    console.log(jobId);
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Edit Job Button */}
      <button
        onClick={handleApply}
        className="bg-gradient-to-r from-green-500 via-green-600 to-teal-500 text-white py-3 px-6 rounded-lg transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out focus:outline-none flex justify-center items-center w-full gap-2 "
      >
        <MdOutlineWork className="text-xl " /> Apply
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md bg-white p-6 md:h-[500px] h-screen overflow-y-auto md:rounded-lg shadow-lg md:w-[600px] ">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-200"
              onClick={() => setIsOpen(false)}
            >
              <IoArrowBackCircleSharp className="text-3xl" />
            </button>

            {/* Modal Content */}
            <div className="">
              <FormikCreatApplication jobId={jobId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyJob;
