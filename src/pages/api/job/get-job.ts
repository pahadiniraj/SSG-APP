import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../lib/mongoDB";
import Job from "../../../../lib/modals/job";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // Connect to the database
      await connect();

      // Fetch all jobs from the database
      const jobs = await Job.find();

      return res.status(200).json({
        message: "Job data fetched successfully",
        jobs,
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
