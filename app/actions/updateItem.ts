'use server';

import dbConnect from '@/libs/dbConnect';
import Item from '@/models/Item';
import { ObjectId } from 'mongodb';

export const updateItem = async (itemId: string, completed: boolean) => {
  await dbConnect();

  try {
    await Item.updateOne({ _id: itemId }, { completed });
  } catch (error: any) {
    throw error;
  }
};
