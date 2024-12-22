import { Schema, Document, model, models } from "mongoose";

interface IApplication extends Document {
  jobId: Schema.Types.ObjectId;
  email: string;
  resumeUrl?: string;
  coverLetter: string;
  createdAt: Date;
}

const ApplicationSchema: Schema = new Schema(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
    },
    coverLetter: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Application =
  models.Application || model<IApplication>("Application", ApplicationSchema);

export default Application;
