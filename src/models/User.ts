import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "admin" | "editor";
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Nama harus diisi"],
    },
    email: {
      type: String,
      required: [true, "Email harus diisi"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password harus diisi"],
      minlength: [6, "Password minimal 6 karakter"],
    },
    role: {
      type: String,
      enum: ["admin", "editor"],
      default: "editor",
    },
  },
  {
    timestamps: true,
  }
);

// Helper function untuk hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Helper function untuk compare password
export async function comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, hashedPassword);
}

// Method untuk compare password (instance method)
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
