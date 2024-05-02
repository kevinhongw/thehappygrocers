'use server';

import dbConnect from '@/libs/dbConnect';
import Item from '@/models/Item';

export const deleteItem = async (itemId: string) => {
  await dbConnect();

  console.log('delete', itemId);
  try {
    // TODO: change into soft delete
    await Item.deleteOne({ _id: itemId });
  } catch (error: any) {
    throw error;
  }
};
