'use server';

import dbConnect from '@/libs/dbConnect';
import Item, { IItem } from '@/models/Item';
import { ObjectId } from 'mongodb';

export const updateItemStatus = async (
  itemId: string,
  status: IItem['status'],
) => {
  await dbConnect();

  try {
    await Item.updateOne({ _id: itemId }, { status });
  } catch (error: any) {
    throw error;
  }
};
