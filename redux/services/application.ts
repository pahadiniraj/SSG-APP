import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface CreateApplication {
  jobId: string;
  fullname: string;
  email: string;
  resume: File | null;
  coverLetter: File | null;
}

interface CreateResponse {
  message: string;
  success?: boolean;
  application?: Application;
}

interface Application {
  _id: string;
  jobId: string;
  fullname: string;
  email: number;
  resume: File | string;
  coverLetter: File | string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

interface GetJobResponse {
  message: string;
  applications?: Application[];
  success: boolean;
}
export const applicationApi = createApi({
  reducerPath: "applicationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api/`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createApplication: builder.mutation<CreateResponse, CreateApplication>({
      query: (formData) => {
        return {
          url: "application",
          method: "POST",
          body: formData, // Pass FormData directly
          credentials: "include",
        };
      },
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

export const { useCreateApplicationMutation, useGetJobByIdQuery } =
  applicationApi;
