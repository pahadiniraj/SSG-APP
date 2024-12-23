import HeroSection from "@/components/HeroSection";
import { useSearchParams } from "next/navigation";
import { GetStaticProps } from "next";

import { Job, JobPageProps } from "../../utils/types/jobTypes";
import Pegination from "@/components/Pegination";
import AllJobs from "@/components/Job/AllJobs";

export const getStaticProps: GetStaticProps = async () => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error(
        "NEXT_PUBLIC_API_URL environment variable is not defined"
      );
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const res = await fetch(`${API_URL}/api/job`);
    if (!res.ok) {
      throw new Error("Failed to fetch job data.");
    }

    const data = await res.json();
    const jobs: Job[] = data.jobs;

    return {
      props: {
        jobs,
      },
      revalidate: 60,
    };
  } catch (error: any) {
    console.error("Error fetching jobs for SSG:", error.message);

    return {
      props: {
        jobs: [],
        error: error.message || "Failed to fetch job data.",
      },
    };
  }
};

const JobPage: React.FC<JobPageProps> = ({ jobs, error }) => {
  const searchParams = useSearchParams();

  const jobLength = jobs.length;
  const defaultPage = 1;
  const jobsPerPage = 6;

  const page = Number(searchParams.get("page")) || defaultPage;

  if (error) {
    return <p className="mt-36 text-center w-full">Error: {error}</p>;
  }

  if (page < 1 || page > Math.ceil(jobLength / jobsPerPage)) {
    return <div className="mt-36 text-center">Invalid Page</div>;
  }

  return (
    <div>
      <HeroSection />
      <div className="container mx-auto my-10 px-5">
        <h1 className="text-2xl m-4 md:m-0">
          <span className="border-b-2 pb-1 border-blue-600">Jobs</span> In Nepal
        </h1>
        <div className="flex gap-4 w-full flex-col">
          <AllJobs jobs={jobs} page={page} jobsPerPage={jobsPerPage} />
          <Pegination
            page={page}
            jobLength={jobLength}
            jobsPerPage={jobsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default JobPage;
