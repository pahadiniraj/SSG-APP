import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../lib/mongoDB";
import Job from "../../../../lib/modals/job";
import {
  deleteFromCloudinary,
  extractPublicIdFromUrl,
} from "../../../../utils/cloudinary";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
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
  } else if (req.method === "PUT") {
    try {
      // Handle updating the job
      const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
        new: true, // Return the updated job
        runValidators: true, // Ensure validators are applied
      });

      if (!updatedJob) {
        return res.status(404).json({
          error: "Job not found",
        });
      }

      return res.status(200).json({
        message: "Job updated successfully",
        job: updatedJob,
      });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedJob = await Job.findByIdAndDelete(id);

      if (!deletedJob) {
        return res.status(404).json({
          error: "Job not found",
        });
      }

      // Extract the public ID of the company image from the URL
      const companyImgPublicId = extractPublicIdFromUrl(deletedJob.companyImg);

      if (companyImgPublicId) {
        // If there is a company image, delete it from Cloudinary
        await deleteFromCloudinary(companyImgPublicId);
      }

      return res.status(200).json({
        message: ` ${deletedJob.title} Job from  ${deletedJob.company} company has been deleted `,
        success: true,
      });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
