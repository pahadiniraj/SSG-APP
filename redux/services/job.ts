import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CreateJob {
  title: string;
  salary: number;
  description: string[];
  company: string;
  location: string;
  companyImg: string;
  jobSpecification: string[];
}

interface Response {
  message: string;
  success?: boolean;
  job?: Job;
}

interface Job {
  _id: string;
  title: string;
  salary: number;
  description: string[];
  company: string;
  location: string;
  companyImg: File | string;
  jobSpecification: string[];
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export const jobApi = createApi({
  reducerPath: "jobApi", // Correct the name if necessary
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/job`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createJob: builder.mutation<Response, CreateJob>({
      query: (formData) => {
        return {
          url: "create-job",
          method: "POST",
          body: formData, // Pass FormData directly
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useCreateJobMutation } = jobApi;
