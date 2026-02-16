import mongoose, { Schema, Document } from "mongoose";

export interface ITeam extends Document {
  nama: string;
  posisi: string;
  foto: string;
  bio?: string;
  email?: string;
  telepon?: string;
  urutan: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TeamSchema = new Schema<ITeam>(
  {
    nama: {
      type: String,
      required: true,
    },
    posisi: {
      type: String,
      required: true,
    },
    foto: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    telepon: {
      type: String,
      required: false,
    },
    urutan: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index untuk sorting
TeamSchema.index({ urutan: 1 });

const Team = mongoose.models.Team || mongoose.model<ITeam>("Team", TeamSchema);

export default Team;
