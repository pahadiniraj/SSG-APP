import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../lib/mongoDB";
import Job from "../../../../lib/modals/job";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Connect to the database
  await connect();

  if (req.method === "GET") {
    try {
      // Extract the `id` from the query parameters
      const { id } = req.query;

      console.log(id);

      // Fetch the job by ID
      const job = await Job.findById(id);

      if (!job) {
        return res.status(404).json({
          error: "Job not found",
        });
      }

      return res.status(200).json({
        message: "Job data fetched successfully",
        job,
      });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  } else {
    // Handle unsupported HTTP methods
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
