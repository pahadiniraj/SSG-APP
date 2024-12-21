import { IncomingForm } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../../lib/mongoDB";
import { jobValidationSchema } from "../../../../utils/Joi-Validation/createJob";
import { uploadOnCloudinary } from "../../../../utils/cloudinary";
import Job from "../../../../lib/modals/job";
import fs from "fs";

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
        const {
          title,
          company,
          location,
          salary,
          description,
          jobSpecification,
        } = fields;

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

        const companyImg = files.companyImg ? files.companyImg[0] : null;

        if (!companyImg) {
          return res.status(400).json({ error: "Company image is required." });
        }

        const parsedSalary = Number(salaryValue);
        if (isNaN(parsedSalary)) {
          return res
            .status(400)
            .json({ error: "Salary must be a valid number." });
        }

        let parsedDescription: string[] = [];
        if (descriptionValue) {
          try {
            parsedDescription = JSON.parse(descriptionValue);
          } catch (error) {
            console.log(error);
            return res
              .status(400)
              .json({ error: "Invalid description format" });
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

        const { error } = jobValidationSchema.validate({
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

        const companyImgPath = companyImg.filepath;
        const fileBuffer = await fs.promises.readFile(companyImgPath);
        const uploadedImageUrl = await uploadOnCloudinary(
          fileBuffer,
          "image",
          true
        );

        await connect();

        const newJob = await Job.create({
          title: titleValue,
          company: companyValue,
          location: locationValue,
          salary: parsedSalary,
          description: parsedDescription,
          companyImg: uploadedImageUrl,
          jobSpecification: parsedJobSpecification,
        });

        return res.status(201).json({
          message: "Job created successfully",
          job: newJob,
        });
      } catch (error) {
        console.error("Error creating job:", error);
        return res.status(500).json({
          error: "Something went wrong. Please try again later.",
        });
      }
    });
  } else if (req.method === "GET") {
    try {
      await connect();

      const jobs = await Job.find();

      return res.status(200).json({
        message: "Job data fetched successfully",
        jobs,
      });
    } catch (error: any) {
      console.error("Error fetching jobs:", error);
      return res.status(500).json({
        error: error.message,
      });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
