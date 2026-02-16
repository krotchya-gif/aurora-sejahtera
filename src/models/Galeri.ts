import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGaleri extends Document {
  _id: mongoose.Types.ObjectId;
  judul: string;
  deskripsi?: string;
  gambar: string;
  kategori: string;
  tags: string[];
  isActive: boolean;
  urutan: number;
  createdAt: Date;
  updatedAt: Date;
}

const GaleriSchema = new Schema<IGaleri>(
  {
    judul: {
      type: String,
      required: [true, "Judul galeri harus diisi"],
    },
    deskripsi: {
      type: String,
    },
    gambar: {
      type: String,
      required: [true, "Gambar harus diisi"],
    },
    kategori: {
      type: String,
      required: true,
      default: "Wisata",
    },
    tags: [{
      type: String,
    }],
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

const Galeri: Model<IGaleri> = mongoose.models.Galeri || mongoose.model<IGaleri>("Galeri", GaleriSchema);

export default Galeri;
