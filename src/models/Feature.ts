import mongoose, { Schema, Document } from "mongoose";

export interface IFeature extends Document {
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
  urutan: number;
  createdAt: Date;
  updatedAt: Date;
}

const FeatureSchema = new Schema<IFeature>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
      default: "star", // default icon name
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
FeatureSchema.index({ urutan: 1 });

const Feature = mongoose.models.Feature || mongoose.model<IFeature>("Feature", FeatureSchema);

export default Feature;
