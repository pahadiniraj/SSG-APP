import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CreateJob {
  title: string;
  salary: number;
  description: string[];
  company: string;
  location: string;
  companyImg: File | string;
  jobSpecification: string[];
}

interface UpdateJobRequest {
  jobId: string; // The job ID to update
  data: FormData;
}

interface CreateResponse {
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

interface DeleteResponse {
  message: string;
  success?: boolean;
}

interface GetJobResponse {
  message: string;
  job?: Job;
  success: boolean;
}
export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createJob: builder.mutation<CreateResponse, CreateJob>({
      query: (formData) => {
        return {
          url: "job",
          method: "POST",
          body: formData, // Pass FormData directly
          credentials: "include",
        };
      },
    }),
    deleteJobById: builder.mutation<DeleteResponse, string>({
      query: (id) => ({
        url: `job/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    updateJobById: builder.mutation<CreateResponse, UpdateJobRequest>({
      query: ({ jobId, data }) => ({
        url: `job/${jobId}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
    getJobById: builder.query<GetJobResponse, string>({
      query: (jobId) => ({
        url: `job/${jobId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateJobMutation,
  useDeleteJobByIdMutation,
  useUpdateJobByIdMutation,
  useGetJobByIdQuery,
} = jobApi;
