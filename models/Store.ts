import mongoose from "mongoose";

export interface Stores extends mongoose.Document {
  name: string;
  deleted_at: Date;
  updated_at: Date;
  created_at: Date;
}

const StoreSchema = new mongoose.Schema<Stores>({
  name: {
    type: String,
    required: [true, "Please provide a name for this item."],
    maxlength: [60, "Name cannot be more than 50 characters"],
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

export default mongoose.models.Store || mongoose.model<Stores>("stores", StoreSchema);