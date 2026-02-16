import mongoose, { Schema, Document, Model } from "mongoose";
import { generateSlug } from "@/lib/utils";

export interface IKotaHarga {
  kota: string;
  harga: number;
}

export interface IItinerary {
  hari: number;
  judul: string;
  aktivitas: string[];
}

export interface IPaket extends Document {
  _id: mongoose.Types.ObjectId;
  slug: string;
  nama: string;
  destinasi: string;
  kategori: "domestik" | "internasional" | "umroh";
  tipe: "open-trip" | "private-trip";
  harga: number;
  hargaCoret?: number;
  durasi: string;
  tanggalKeberangkatan: string[];
  kuota: number;
  sisaKuota: number;
  gambar: string;
  gambarGaleri: string[];
  deskripsi: string;
  itinerary: IItinerary[];
  fasilitas: string[];
  tidakTermasuk: string[];
  kotaKeberangkatan: IKotaHarga[];
  rating: number;
  jumlahReview: number;
  isPromo: boolean;
  isActive: boolean;
  season: "normal" | "high";
  createdAt: Date;
  updatedAt: Date;
}

const ItinerarySchema = new Schema<IItinerary>({
  hari: { type: Number, required: true },
  judul: { type: String, required: true },
  aktivitas: [{ type: String }],
});

const KotaHargaSchema = new Schema<IKotaHarga>({
  kota: { type: String, required: true },
  harga: { type: Number, required: true },
});

const PaketSchema = new Schema<IPaket>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    nama: {
      type: String,
      required: [true, "Nama paket harus diisi"],
    },
    destinasi: {
      type: String,
      required: [true, "Destinasi harus diisi"],
    },
    kategori: {
      type: String,
      enum: ["domestik", "internasional", "umroh"],
      required: true,
    },
    tipe: {
      type: String,
      enum: ["open-trip", "private-trip"],
      required: true,
    },
    harga: {
      type: Number,
      required: [true, "Harga harus diisi"],
    },
    hargaCoret: {
      type: Number,
    },
    durasi: {
      type: String,
      required: true,
    },
    tanggalKeberangkatan: [{
      type: String,
    }],
    kuota: {
      type: Number,
      default: 20,
    },
    sisaKuota: {
      type: Number,
      default: 20,
    },
    gambar: {
      type: String,
      default: "/images/placeholder.jpg",
    },
    gambarGaleri: [{
      type: String,
    }],
    deskripsi: {
      type: String,
      required: true,
    },
    itinerary: [ItinerarySchema],
    fasilitas: [{
      type: String,
    }],
    tidakTermasuk: [{
      type: String,
    }],
    kotaKeberangkatan: [KotaHargaSchema],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    jumlahReview: {
      type: Number,
      default: 0,
    },
    isPromo: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    season: {
      type: String,
      enum: ["normal", "high"],
      default: "normal",
    },
  },
  {
    timestamps: true,
  }
);

// Export generateSlug dari utils untuk backward compatibility
export { generateSlug as generatePaketSlug } from "@/lib/utils";

const Paket: Model<IPaket> = mongoose.models.Paket || mongoose.model<IPaket>("Paket", PaketSchema);

export default Paket;
