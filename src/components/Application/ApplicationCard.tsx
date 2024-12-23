export const ApplicationCard = ({ application }: { application: any }) => {
  const { jobId, fullname, email, resume, coverLetter, createdAt } =
    application;
  const { title, location, salary, description } = jobId || {};

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
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
        {description && (
          <div className="mt-2">
            <strong>Description:</strong>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {description.map((desc: string, index: number) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Applicant Details */}
      <div>
        <h3 className="text-lg font-bold mb-2">Applicant Details</h3>
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
          <strong>Submitted At:</strong> {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};
