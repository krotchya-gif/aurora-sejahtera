import mongoose, { Schema, Document } from "mongoose";

export interface IHeroSlide extends Document {
  title: string;
  subtitle: string;
  image: string;
  urutan: number;
  isActive: boolean;
  buttonText?: string;
  buttonLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

const HeroSlideSchema = new Schema<IHeroSlide>(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    urutan: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    buttonText: {
      type: String,
      required: false,
    },
    buttonLink: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index untuk sorting
HeroSlideSchema.index({ urutan: 1 });

const HeroSlide =
  mongoose.models.HeroSlide || mongoose.model<IHeroSlide>("HeroSlide", HeroSlideSchema);

export default HeroSlide;
