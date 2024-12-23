import React from "react";
import { useGetApplicationsQuery } from "../../redux/services/application";
import Image from "next/image";
import { ClipLoader } from "react-spinners";

const Application = ({ applicationId }: { applicationId: string }) => {
  const { data, error, isLoading } = useGetApplicationsQuery(applicationId, {
    pollingInterval: 10000,
  });

  if (isLoading) {
    return (
      <div className="h-screen p-5 flex justify-center items-center">
        <ClipLoader color="#000" size={35} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-32 h-screen text-center p-5 text-red-500">
        Error fetching application data.
      </div>
    );
  }

  if (!data?.applications || data.applications.length === 0) {
    return (
      <div className="mt-32 h-screen text-center p-5 text-gray-500">
        No application data available.
      </div>
    );
  }

  // Group applications by company name
  const groupedApplications = data.applications.reduce((acc: any, app: any) => {
    const companyName = app.jobId?.company || "Unknown Company"; // Fallback for undefined company
    if (!acc[companyName]) acc[companyName] = [];
    acc[companyName].push(app);
    return acc;
  }, {});

  return (
    <div className="mt-32 p-5">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Applications</h1>
      </div>

      {Object.keys(groupedApplications).map((companyName) => (
        <div
          key={companyName}
          className="mb-12 border border-gray-300 rounded-lg bg-gray-50 p-6 shadow-md"
        >
          {/* Company Header */}
          <div className="flex items-center gap-4 border-b border-gray-200 pb-4 mb-4 bg-white p-4 rounded-t-lg">
            <Image
              src={
                groupedApplications[companyName][0]?.jobId?.companyImg ||
                "/placeholder-image.png"
              }
              alt={`${companyName} Logo`}
              className="rounded-full"
              width={64}
              height={64}
            />
            <h2 className="text-2xl font-semibold">{companyName}</h2>
          </div>

          {/* Applications for this company */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedApplications[companyName].map((application: any) => {
              const { jobId, fullname, email, resume, coverLetter, createdAt } =
                application;
              const { title, location, salary, description } = jobId || {};

              return (
                <div
                  key={application._id}
                  className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Job Details */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold mb-2">Job Details</h3>
                    <p>
                      <strong>Title:</strong> {title || "N/A"}
                    </p>
                    <p>
                      <strong>Location:</strong> {location || "N/A"}
                    </p>
                    <p>
                      <strong>Salary:</strong> NPR {salary || "N/A"}
                    </p>
                    <div className="mt-2">
                      <strong>Description:</strong>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {description &&
                          description.map((desc: string, index: number) => (
                            <li key={index}>{desc}</li>
                          ))}
                      </ul>
                    </div>
                  </div>

                  {/* Applicant Details */}
                  <div>
                    <h3 className="text-lg font-bold mb-2">
                      Applicant Details
                    </h3>
                    <p>
                      <strong>Full Name:</strong> {fullname}
                    </p>
                    <p>
                      <strong>Email:</strong> {email}
                    </p>
                    {resume && (
                      <p>
                        <strong>Resume:</strong>{" "}
                        <a
                          href={resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View Resume
                        </a>
                      </p>
                    )}
                    {coverLetter && (
                      <p>
                        <strong>Cover Letter:</strong>{" "}
                        <a
                          href={coverLetter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View Cover Letter
                        </a>
                      </p>
                    )}
                    <p>
                      <strong>Submitted At:</strong>{" "}
                      {new Date(createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Application;
