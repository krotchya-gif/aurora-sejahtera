import mongoose, { Schema, Document } from "mongoose";

export interface IPromo extends Document {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  urutan: number;
  createdAt: Date;
  updatedAt: Date;
}

const PromoSchema = new Schema<IPromo>(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    backgroundImage: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    buttonLink: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    urutan: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index untuk sorting
PromoSchema.index({ urutan: 1 });

const Promo = mongoose.models.Promo || mongoose.model<IPromo>("Promo", PromoSchema);

export default Promo;
