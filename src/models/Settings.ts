import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISettings extends Document {
  _id: mongoose.Types.ObjectId;
  companyName: string;
  tagline: string;
  alamat: string;
  telepon: string;
  whatsapp: string;
  email: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  logoUrl: string;
  googleMapsEmbed: string;
  aboutImage: string;
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    companyName: {
      type: String,
      default: "Aurora Sejahtera Tour & Travel",
    },
    tagline: {
      type: String,
      default: "Wujudkan Liburan Impian Anda",
    },
    alamat: {
      type: String,
      default: "Jl. Contoh Alamat No. 123, Jakarta Selatan",
    },
    telepon: {
      type: String,
      default: "+62 812 3456 7890",
    },
    whatsapp: {
      type: String,
      default: "6281234567890",
    },
    email: {
      type: String,
      default: "info@aurorasejahteratour.travel",
    },
    instagram: {
      type: String,
      default: "https://instagram.com/aurorasejahteratour",
    },
    facebook: {
      type: String,
      default: "https://facebook.com/aurorasejahteratour",
    },
    tiktok: {
      type: String,
      default: "https://tiktok.com/@aurorasejahteratour",
    },
    logoUrl: {
      type: String,
      default: "/logo.png",
    },
    googleMapsEmbed: {
      type: String,
      default: "",
    },
    aboutImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Settings: Model<ISettings> = mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);

export default Settings;
