import { Schema, Document, models, model } from "mongoose";

interface IJob extends Document {
  _id: string;
  title: string;
  description: string[];
  company: string;
  location: string;
  companyImg: string;
  salary: number;
  jobSpecification: string[];
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    description: {
      type: [String],
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    companyImg: {
      type: String,
      required: true,
    },
    jobSpecification: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = models.Job || model<IJob>("Job", JobSchema);

export default Job;
