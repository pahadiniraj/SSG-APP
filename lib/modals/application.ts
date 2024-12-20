import mongoose, { Schema, Document } from "mongoose";

interface IApplication extends Document {
  jobId: mongoose.Schema.Types.ObjectId;
  email: string;
  resumeUrl?: string;
  coverLetter: string;
  createdAt: Date;
}

const ApplicationSchema: Schema = new Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.models.Application ||
  mongoose.model<IApplication>("Application", ApplicationSchema);
