export interface JobCardProps {
  job: {
    _id: string;
    companyImg: string;
    title: string;
    company: string;
    location: string;
    salary: number;
    description: string[];
    jobSpecification: string[];
  };
  onDelete: (jobId: string) => void;
}