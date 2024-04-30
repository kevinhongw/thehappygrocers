import mongoose from "mongoose";

export interface Items extends mongoose.Document {
  name: string;
  image_url: string;
  store_id: mongoose.Types.ObjectId;
  status: 'incomplete' | 'completed';
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

const ItemSchema = new mongoose.Schema<Items>({
  name: {
    type: String,
    required: [true, "Please provide a name for this item."],
    maxlength: [60, "Name cannot be more than 50 characters"],
  },
  image_url: {
    required: false,
    type: String,
  },
  store_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  },
  status: {
    type: String,
    required: [true, 'Please provide a status for this item']
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

export default mongoose.models.Item || mongoose.model<Items>("Item", ItemSchema);