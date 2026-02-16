import mongoose, { Schema, Document, Model } from "mongoose";
import { generateSlug } from "@/lib/utils";

export interface IArtikel extends Document {
  _id: mongoose.Types.ObjectId;
  slug: string;
  judul: string;
  excerpt: string;
  konten: string;
  gambar: string;
  kategori: string;
  tags: string[];
  penulis: string;
  isPublished: boolean;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ArtikelSchema = new Schema<IArtikel>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    judul: {
      type: String,
      required: [true, "Judul artikel harus diisi"],
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt harus diisi"],
      maxlength: [300, "Excerpt maksimal 300 karakter"],
    },
    konten: {
      type: String,
      required: [true, "Konten artikel harus diisi"],
    },
    gambar: {
      type: String,
      default: "/images/placeholder-blog.jpg",
    },
    kategori: {
      type: String,
      required: true,
      default: "Tips Wisata",
    },
    tags: [{
      type: String,
    }],
    penulis: {
      type: String,
      default: "Admin",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Export generateSlug dari utils
export { generateSlug } from "@/lib/utils";

const Artikel: Model<IArtikel> = mongoose.models.Artikel || mongoose.model<IArtikel>("Artikel", ArtikelSchema);

export default Artikel;
