export interface JobByIdCompProps {
  job: {
    _id: string;
    title: string;
    company: string;
    companyImg: string;
    location: string;
    salary: number;
    description: string[];
    jobSpecification: string[];
  };
}

export interface Job {
  _id: string;
  title: string;
  company: string;
  companyImg: string;
  location: string;
  salary: number;
  description: string[];
  jobSpecification: string[];
}
// utils/types/jobTypes.ts
export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export interface Job {
  _id: string;
  title: string;
  company: string;
  salary: number;
  location: string;
  description: string[];
  companyImg: string;
}

export interface JobPageProps {
  jobs: Job[];
  error?: string;
  searchParams?: SearchParams;
  page: number;
  jobLength?: number;
  jobsPerPage: number;
}

export interface JobById {
  _id: string;
  title: string;
  company: string;
  companyImg: string;
  location: string;
  salary: number;
  description: string[];
  jobSpecification: string[];
}

export interface JobByIdPageProps {
  job: JobById | null;
  error?: string;
}

export interface CreateResponse {
  message: string;
  success?: boolean;
  job?: Job;
}

export interface Job {
  _id: string;
  title: string;
  salary: number;
  description: string[];
  company: string;
  location: string;
  companyImg: string;
  jobSpecification: string[];
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface JobIdButtonProps {
  jobId: string;
}

export interface CreateJobFormValues {
  title: string;
  company: string;
  salary: number;
  description: string[];
  location: string;
  jobSpecification: string[];
  companyImg: File | string;
}
