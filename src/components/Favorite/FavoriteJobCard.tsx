import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { MdLocationPin } from "react-icons/md";
import { JobCardProps } from "../../../utils/types/favoriteType";

export const JobCard: React.FC<JobCardProps> = ({ job, onDelete }) => {
  return (
    <div className="bg-white border rounded-lg shadow-lg overflow-hidden">
      <div className="flex flex-col sm:flex-row items-center p-4">
        <Image
          src={job.companyImg}
          alt="Company Logo"
          width={100}
          height={100}
          className="rounded-full border"
        />
        <div className="sm:ml-4 mt-4 sm:mt-0">
          <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
          <p className="text-lg text-gray-600 text-center md:text-start">
            {job.company}
          </p>
          <div className="flex items-center gap-2 text-gray-600 mt-2">
            <MdLocationPin />
            <p>{job.location}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <GiMoneyStack className="text-green-600" />
            <p className="font-semibold">NPR {job.salary.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-3">
        <h3 className="text-lg font-medium text-gray-800">Description:</h3>
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

      <div className="flex justify-end p-3">
        <button
          className="text-gray-600 hover:text-red-500 transition duration-300"
          onClick={() => onDelete(job._id)}
        >
          <FaTrashAlt className="text-2xl" />
        </button>
      </div>
    </div>
  );
};
