import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GiMoneyStack } from "react-icons/gi";
import { MdLocationPin } from "react-icons/md";
import { GetStaticProps } from "next";
import { Job, JobPageProps } from "../../utils/types/jobTypes";

export const getStaticProps: GetStaticProps = async () => {
  try {
    // if (!process.env.NEXT_PUBLIC_API_URL) {
    //   throw new Error(
    //     "NEXT_PUBLIC_API_URL environment variable is not defined"
    //   );
    // }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/job`);
    console.log(res);
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
  const router = useRouter();
  if (error) {
    return <p className="mt-36 text-center w-full">Error: {error}</p>;
  }
  return (
    <div>
      <HeroSection />
      <div className="md:m-10">
        <h1 className="text-2xl m-4 md:m-0">
          <span className="border-b-2 pb-1 border-blue-600">Jobs</span> In Nepal
        </h1>
        <div className="flex gap-4 w-full">
          <div className="border-2 rounded-md bg-slate-200/90 shadow-lg backdrop-blur-3xl h-[500px] my-5 grid lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-2 p-4 gap-4 w-full overflow-hidden overflow-y-auto">
            {jobs.map((job) => (
              <button
                className="border border-slate-600/40 rounded-lg bg-white shadow-lg backdrop-blur-3xl h-[200px] p-2 relative hover:border-blue-600/40 hover:shadow-blue-300 hover:shadow-xl duration-200 hover:scale-105"
                key={job._id}
                onClick={() => router.push(`/job/${job._id}`)}
              >
                <div className="absolute right-1"></div>
                <div className="flex gap-4">
                  <div className="border-slate-400/40 w-[100px] p-1 flex justify-center items-center rounded-lg shadow-lg bg-slate-500/30">
                    <Image
                      src={job.companyImg}
                      alt="Company Logo"
                      className="border border-slate-400/20 rounded-lg bg-white"
                      priority
                      width={90}
                      height={90}
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{job.title}</p>
                    <p className="text-sm font-medium text-slate-800/70 text-start">
                      {job.company}
                    </p>
                  </div>
                </div>
                <div className="flex justify-start mt-2 items-center gap-2">
                  <GiMoneyStack className="text-slate-600" />
                  <p className="text-sm font-medium text-slate-800/70">
                    NPR {job.salary}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-start ml-6 text-slate-800/90">
                    {job.description[0]}
                  </p>
                </div>
                <div className="flex justify-end items-center">
                  <MdLocationPin className="text-slate-800/90" />
                  <p className="text-sm font-medium text-slate-800/70">
                    {job.location}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
