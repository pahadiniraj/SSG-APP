// components/JobByIdComp.tsx
import React, { useState } from "react";
import Image from "next/image";
import { GiMoneyStack } from "react-icons/gi";
import { MdLocationPin } from "react-icons/md";
import { useRouter } from "next/router";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import DeleteJobButton from "./DeleteJobById";
import { JobByIdCompProps } from "../../utils/types/jobTypes";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { MdOutlineWork } from "react-icons/md";
import EditJobById from "./EditJobById";

const JobByIdComp: React.FC<JobByIdCompProps> = ({ job }) => {
  const router = useRouter();

  const [isFavorite, setIsFavorite] = useState(false);

  const handleMakeFavorite = () => {
    // Toggle the favorite state
    setIsFavorite((prev) => !prev);
    // Logic to mark the job as favorite (e.g., save to localStorage or update state globally)
    alert(
      isFavorite ? "Job removed from favorites!" : "Job added to favorites!"
    );
  };

  const handleApply = () => {
    // Redirect user to the application page or form (can be a modal, another page, etc.)
    alert("Redirecting to apply...");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg relative ">
      <button
        onClick={() => router.push("/")}
        className="flex absolute right-2 top-3 text-3xl hover:text-red-900 duration-200 hover:scale-105"
      >
        <IoArrowBackCircleSharp />
      </button>
      <div className="flex flex-col sm:flex-row gap-6">
        <Image
          src={job.companyImg}
          alt="Company Logo"
          className="border border-gray-200 rounded-lg"
          priority
          width={120}
          height={120}
        />
        <div className="sm:flex-1">
          <div className="flex justify-start items-center gap-3">
            <h1 className="text-3xl font-semibold text-gray-800">
              {job.title}
            </h1>
            <div className="flex gap-3">
              <button
                onClick={handleMakeFavorite}
                className={` text-white h-8 w-8 flex justify-center items-center transform hover:scale-105  transition duration-300 ease-in-out focus:outline-none rounded-full shadow-2xl border-black/50 border`}
              >
                {isFavorite ? (
                  <FaHeart className="text-red-600" />
                ) : (
                  <FaRegHeart className="text-black/70" />
                )}
              </button>

              <DeleteJobButton jobId={job._id} />
            </div>
          </div>
          <h2 className="text-xl font-medium text-gray-600 mt-2">
            {job.company}
          </h2>
          <div className="flex gap-2 items-center mt-3">
            <MdLocationPin className="text-gray-500" />
            <p className="text-gray-700">{job.location}</p>
          </div>
          <div className="flex gap-2 items-center mt-2">
            <GiMoneyStack className="text-green-600" />
            <p className="text-gray-700">NPR {job.salary.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Description and Specifications */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">Description:</h3>
        <ul className="list-disc pl-6 text-gray-700">
          {job.description.map((desc, index) => (
            <li key={index}>{desc}</li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Job Specifications:
        </h3>
        <ul className="list-disc pl-6 text-gray-700">
          {job.jobSpecification.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
      </div>

      {/* Buttons Section */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <EditJobById jobId={job._id} />
        <button
          onClick={handleApply}
          className="bg-gradient-to-r from-green-500 via-green-600 to-teal-500 text-white py-3 px-6 rounded-lg transform hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out focus:outline-none flex justify-center items-center gap-2 "
        >
          <MdOutlineWork className="text-xl " /> Apply
        </button>
      </div>
    </div>
  );
};

export default JobByIdComp;
