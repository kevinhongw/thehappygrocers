import mongoose, { Schema, Types } from "mongoose";

export interface IItem {
  _id: Types.ObjectId;
  name: string;
  imageUrl: string;
  storeId: string;
  completed: boolean;
  // status: 'incomplete' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const ItemSchema = new Schema<IItem>({
  name: {
    type: String,
    required: [true, "Please provide a name for this item."],
    maxlength: [60, "Name cannot be more than 50 characters"],
  },
  imageUrl: {
    required: false,
    type: String,
  },
  storeId: {
    type: String,
    required: [true, "Please provide a store id for this item"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  // status: {
  //   type: String,
  //   default: 'incomplete',
  //   required: [true, 'Please provide a status for this item']
  // },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

export default mongoose.models.items ||
  mongoose.model<IItem>("items", ItemSchema);
