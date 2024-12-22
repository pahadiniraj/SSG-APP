import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../lib/mongoDB";
import Job from "../../../../lib/modals/job";
import {
  deleteFromCloudinary,
  extractPublicIdFromUrl,
  handleFileUpload,
} from "../../../../utils/cloudinary";
import { IncomingForm } from "formidable";
import { jobUpdateValidationSchema } from "../../../../utils/Joi-Validation/updateJob";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

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
    console.log("PUT request received with id:", id);

    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form data:", err);
        return res.status(500).json({ error: "Form parsing error" });
      }

      const {
        title,
        company,
        location,
        salary,
        description,
        jobSpecification,
      } = fields;

      console.log(fields);

      const titleValue = Array.isArray(title) ? title[0] : title;
      const companyValue = Array.isArray(company) ? company[0] : company;
      const locationValue = Array.isArray(location) ? location[0] : location;
      const salaryValue = Array.isArray(salary) ? salary[0] : salary;
      const descriptionValue = Array.isArray(description)
        ? description[0]
        : description;
      const jobSpecificationValue = Array.isArray(jobSpecification)
        ? jobSpecification[0]
        : jobSpecification;

      const companyImg = Array.isArray(files.companyImg)
        ? files.companyImg[0] // Use the first file if it's an array
        : files.companyImg;

      let parsedSalary: number | undefined;
      if (salaryValue && !isNaN(Number(salaryValue))) {
        parsedSalary = Number(salaryValue); // Only update salary if it's a valid number
      }

      let parsedDescription: string[] = [];
      if (descriptionValue) {
        try {
          parsedDescription = JSON.parse(descriptionValue);
        } catch (error) {
          console.log(error);
          return res.status(400).json({ error: "Invalid description format" });
        }
      }

      let parsedJobSpecification: string[] = [];
      if (jobSpecificationValue) {
        try {
          parsedJobSpecification = JSON.parse(jobSpecificationValue);
        } catch (error) {
          console.log(error);
          return res
            .status(400)
            .json({ error: "Invalid job specification format" });
        }
      }

      const { error } = jobUpdateValidationSchema.validate({
        title: titleValue,
        company: companyValue,
        salary: parsedSalary,
        description: parsedDescription,
        location: locationValue,
        jobSpecification: parsedJobSpecification,
        companyImg,
      });

      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      try {
        const job = await Job.findById(id);

        if (!job) {
          return res.status(404).json({ error: "Job not found" });
        }
        // Update only the provided fields
        if (titleValue !== undefined && titleValue !== "")
          job.title = titleValue;
        if (companyValue !== undefined && companyValue !== "")
          job.company = companyValue;
        if (locationValue !== undefined && locationValue !== "")
          job.location = locationValue;
        if (parsedSalary !== undefined) job.salary = parsedSalary;
        if (parsedDescription.length > 0) job.description = parsedDescription;
        if (parsedJobSpecification.length > 0)
          job.jobSpecification = parsedJobSpecification;

        // Handle company image upload if a new image is provided
        if (companyImg) {
          if (job.companyImg) {
            const publicId = extractPublicIdFromUrl(job.companyImg);
            if (publicId) {
              await deleteFromCloudinary(publicId);
            }
          }

          const fileBuffer = fs.readFileSync(companyImg.filepath); // Read the file buffer
          const mimeType = companyImg.mimetype || "";
          const uploadedUrl = await handleFileUpload(fileBuffer, mimeType);

          job.companyImg = uploadedUrl; // Update the company's image URL
        }

        await job.save();

        return res
          .status(200)
          .json({ message: "Job updated successfully", job });
      } catch (err: any) {
        console.error("Error updating job:", err.message);
        return res
          .status(500)
          .json({ error: "An error occurred while updating the job" });
      }
    });
  } else if (req.method === "DELETE") {
    try {
      const deletedJob = await Job.findByIdAndDelete(id);

      if (!deletedJob) {
        return res.status(404).json({
          error: "Job not found",
        });
      }

      const companyImgPublicId = extractPublicIdFromUrl(deletedJob.companyImg);

      if (companyImgPublicId) {
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
