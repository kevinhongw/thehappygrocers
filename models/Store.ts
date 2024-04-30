import mongoose, { Schema, Types } from 'mongoose';

export interface IStore {
  _id: Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const StoreSchema = new Schema<IStore>({
  name: {
    type: String,
    required: [true, 'Please provide a name for this item.'],
    maxlength: [60, 'Name cannot be more than 50 characters'],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

export default mongoose.models.stores<IStore> ||
  mongoose.model<IStore>('stores', StoreSchema);
