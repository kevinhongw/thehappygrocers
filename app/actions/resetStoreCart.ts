'use server';

import dbConnect from '@/libs/dbConnect';
import Item from '@/models/Item';

export const resetStoreCart = async (storeId: string) => {
  await dbConnect();

  try {
    await Item.updateMany(
      { storeId },
      { completed: true, updatedAt: new Date() },
    );
  } catch (error: any) {
    throw error;
  }
};
