import { IncomingForm } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../lib/mongoDB";
import { uploadOnCloudinary } from "../../../../utils/cloudinary";
import Application from "../../../../lib/modals/application";
import fs from "fs";
import { applicationValidationSchema } from "../../../../utils/Joi-Validation/createApplication";

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parser for file handling
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form data:", err);
        return res.status(500).json({ error: "Form parsing error" });
      }

      try {
        const jobId = Array.isArray(fields.jobId)
          ? fields.jobId[0]
          : fields.jobId;
        const fullname = Array.isArray(fields.fullname)
          ? fields.fullname[0]
          : fields.fullname;
        const email = Array.isArray(fields.email)
          ? fields.email[0]
          : fields.email;

        console.log(jobId, fullname, email);

        const resumeFile = files.resume ? files.resume[0] : null;
        const coverLetterFile = files.coverLetter ? files.coverLetter[0] : null;

        let uploadedResumeUrl = null;
        let uploadedCoverLetterUrl = null;

        // Upload resume if provided
        if (resumeFile) {
          const resumePath = resumeFile.filepath;
          const resumeBuffer = await fs.promises.readFile(resumePath);
          uploadedResumeUrl = await uploadOnCloudinary(
            resumeBuffer,
            "pdf",
            true
          );
        }

        // Upload cover letter if provided
        if (coverLetterFile) {
          const coverLetterPath = coverLetterFile.filepath;
          const coverLetterBuffer = await fs.promises.readFile(coverLetterPath);
          uploadedCoverLetterUrl = await uploadOnCloudinary(
            coverLetterBuffer,
            "pdf",
            true
          );
        }

        // Validate the input data
        const { error } = applicationValidationSchema.validate({
          jobId,
          fullname,
          email,
          resume: uploadedResumeUrl,
          coverLetter: uploadedCoverLetterUrl,
        });

        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }

        // Connect to the database
        await connect();

        // Check if the user has already applied for this job
        const existingApplication = await Application.findOne({
          jobId,
          email, // Or use fullname and email combination for stricter check
        });

        if (existingApplication) {
          return res.status(409).json({
            message: "You have already applied for this job.",
            success: false,
          });
        }

        // Save the application in the database
        const application = await Application.create({
          jobId,
          fullname,
          email,
          resume: uploadedResumeUrl,
          coverLetter: uploadedCoverLetterUrl,
        });

        return res.status(201).json({
          message: "Application submitted successfully",
          application,
          success: true,
        });
      } catch (error) {
        console.error("Error submitting application:", error);
        return res.status(500).json({
          error: "Something went wrong. Please try again later.",
        });
      }
    });
  } else if (req.method === "GET") {
    try {
      await connect();

      const applications = await Application.find().populate("jobId").exec();

      return res.status(200).json({
        message: "Applications retrieved successfully",
        applications,
        success: true,
      });
    } catch (error) {
      console.error("Error retrieving applications:", error);
      return res.status(500).json({
        error: "Something went wrong. Please try again later.",
      });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
