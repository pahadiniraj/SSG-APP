import React from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks"; // Adjust based on your state
import { RootState } from "../../redux/store";
import Image from "next/image";
import { GiMoneyStack } from "react-icons/gi";
import { MdLocationPin } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { removeFavorite } from "../../redux/slice/favoriteSlice";

const FavoriteJob = () => {
  const dispatch = useAppDispatch();
  // Assuming favorites are stored in the Redux store
  const favorites = useAppSelector(
    (state: RootState) => state.favorites.favorites
  );

  // Function to handle deleting a job from favorites
  const handleDelete = (jobId: string) => {
    dispatch(removeFavorite(jobId));
  };

  return (
    <div className="container mx-auto p-5 mt-32">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        Favorite Jobs
      </h1>

      {favorites.length === 0 ? (
        <p className="text-xl text-gray-600 h-screen">No favorite jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((job) => (
            <div
              key={job._id}
              className="bg-white border rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-center p-4">
                {/* Company Logo */}
                <Image
                  src={job.companyImg}
                  alt="Company Logo"
                  width={100}
                  height={100}
                  className="rounded-full border"
                />

                <div className="sm:ml-4 mt-4 sm:mt-0">
                  <h2 className="text-xl font-semibold text-gray-800 ">
                    {job.title}
                  </h2>
                  <p className="text-lg text-gray-600 text-center md:text-start">
                    {job.company}
                  </p>
                  <div className="flex items-center gap-2 text-gray-600 mt-2">
                    <MdLocationPin />
                    <p>{job.location}</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mt-1">
                    <GiMoneyStack className="text-green-600" />
                    <p className="font-semibold">
                      NPR {job.salary.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description and Specification */}
              <div className="px-4 py-3">
                <h3 className="text-lg font-medium text-gray-800">
                  Description:
                </h3>
                <ul className="list-disc pl-6 text-gray-700">
                  {job.description.map((desc, index) => (
                    <li key={index} className="text-sm">
                      {desc}
                    </li>
                  ))}
                </ul>
                <h3 className="text-lg font-medium text-gray-800 mt-4">
                  Job Specifications:
                </h3>
                <ul className="list-disc pl-6 text-gray-700">
                  {job.jobSpecification.map((spec, index) => (
                    <li key={index} className="text-sm">
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Favorite Icon & Delete Button */}
              <div className="flex justify-end p-3">
                <button
                  className="text-gray-600 hover:text-red-500 transition duration-300"
                  onClick={() => handleDelete(job._id)}
                >
                  <FaTrashAlt className="text-2xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteJob;
