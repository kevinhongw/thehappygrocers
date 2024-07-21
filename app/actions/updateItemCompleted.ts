'use server';

import dbConnect from '@/libs/dbConnect';
import Item from '@/models/Item';

export const updateItemCompleted = async (
  itemId: string,
  completed: boolean,
) => {
  await dbConnect();

  try {
    await Item.updateOne({ _id: itemId }, { completed, updatedAt: new Date() });
  } catch (error: any) {
    throw error;
  }
};
