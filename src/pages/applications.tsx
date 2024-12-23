import React from "react";
import { useGetApplicationsQuery } from "../../redux/services/application";
import { ClipLoader } from "react-spinners";
import { CompanyHeader } from "@/components/Application/CompanyHeader";
import { ApplicationCard } from "@/components/Application/ApplicationCard";

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

  const groupedApplications = data.applications.reduce((acc: any, app: any) => {
    const companyName = app.jobId?.company || "Unknown Company";
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
          <CompanyHeader
            companyName={companyName}
            companyImg={
              groupedApplications[companyName][0]?.jobId?.companyImg ||
              "/placeholder-image.png"
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedApplications[companyName].map((application: any) => (
              <ApplicationCard
                key={application._id}
                application={application}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Application;
