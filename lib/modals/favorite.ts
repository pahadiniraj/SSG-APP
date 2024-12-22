import { Schema, Document, models, model } from "mongoose";

interface IFavorite extends Document {
  jobId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  addedAt: Date;
}

const FavoriteSchema: Schema = new Schema(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Favorite =
  models.Favorite || model<IFavorite>("Favorite", FavoriteSchema);

export default Favorite;
