import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimonial extends Document {
  _id: mongoose.Types.ObjectId;
  nama: string;
  whatsapp?: string;
  foto?: string;
  destinasi: string;
  rating: number;
  komentar: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    nama: {
      type: String,
      required: [true, "Nama harus diisi"],
    },
    whatsapp: {
      type: String,
      required: false,
    },
    foto: {
      type: String,
      required: false,
      default: "/images/avatar-placeholder.jpg",
    },
    destinasi: {
      type: String,
      required: [true, "Destinasi harus diisi"],
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
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

const Testimonial: Model<ITestimonial> = mongoose.models.Testimonial || mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);

export default Testimonial;
