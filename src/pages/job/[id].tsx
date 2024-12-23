import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import JobByIdComp from "@/components/JobByIdComp";
import { Job, JobByIdPageProps } from "../../../utils/types/jobTypes";

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error(
        "NEXT_PUBLIC_API_URL environment variable is not defined"
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}/api/job`
    );
    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to fetch job paths: ${response.statusText}`);
    }

    const data = await response.json();
    const jobs: Job[] = data.jobs;

    const paths = jobs.map((job) => ({
      params: { id: job._id },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error fetching job paths:", error);
    return { paths: [], fallback: "blocking" };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string };
  console.log("id in client", id);

  try {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error(
        "NEXT_PUBLIC_API_URL environment variable is not defined"
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}/api/job/${id}`
    );

    console.log(response);

    if (!response.ok) {
      throw new Error(`Failed to fetch job data: ${response.statusText}`);
    }

    const data = await response.json();
    const job: Job = data.job;

    return {
      props: {
        job,
      },
      revalidate: 60,
    };
  } catch (error: any) {
    console.error("Error fetching job data for SSG:", error.message);

    return {
      props: {
        job: null,
        error: error.message || "Failed to fetch job data.",
      },
    };
  }
};

const JobById: React.FC<JobByIdPageProps> = ({ job, error }) => {
  if (error || !job) {
    return (
      <p className="mt-36 text-center w-full">
        Error: {error || "Job not found"}
      </p>
    );
  }

  return (
    <div className="mt-32 p-5 sm:p-10">
      <JobByIdComp job={job} />
    </div>
  );
};

export default JobById;
