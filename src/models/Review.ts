import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview extends Document {
  _id: mongoose.Types.ObjectId;
  paketId: mongoose.Types.ObjectId;
  nama: string;
  whatsapp?: string;
  rating: number;
  komentar: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    paketId: {
      type: Schema.Types.ObjectId,
      ref: "Paket",
      required: true,
      index: true,
    },
    nama: {
      type: String,
      required: [true, "Nama harus diisi"],
    },
    whatsapp: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    komentar: {
      type: String,
      required: [true, "Komentar harus diisi"],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default Review;
