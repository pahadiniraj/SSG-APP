import axios from "axios";
import { GetStaticProps } from "next";

// Define the type for a Job
interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: number;
  description: string[];
  jobSpecification: string[];
}

// Define the props for the page component
interface JobPageProps {
  jobs: Job[];
  error?: string;
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Ensure the environment variable is set
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error(
        "NEXT_PUBLIC_API_URL environment variable is not defined"
      );
    }

    // Fetch job data from your API at build time
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/job/get-job`
    );
    const jobs: Job[] = response.data.jobs;

    return {
      props: {
        jobs,
      },
      revalidate: 60, // Revalidate the page every 10 seconds (ISR)
    };
  } catch (error: any) {
    console.error("Error fetching jobs for SSG:", error.message);

    return {
      props: {
        jobs: [], // Provide fallback empty data
        error: error.message || "Failed to fetch job data.",
      },
    };
  }
};

const JobPage: React.FC<JobPageProps> = ({ jobs, error }) => {
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Job Listings</h1>
      {jobs.length > 0 ? (
        <ul>
          {jobs.map((job) => (
            <li key={job._id}>
              <h2>{job.title}</h2>
              <p>Company: {job.company}</p>
              <p>Location: {job.location}</p>
              <p>Salary: ${job.salary}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No jobs available at the moment.</p>
      )}
    </div>
  );
};

export default JobPage;
